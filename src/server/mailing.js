const {
  posts_request,
  canComments,
  createComment,
  wallDeleteComment,
  wallDelete,
  wallGetComments,
  joinGroups,
} = require("./requests");
const tryCatch = require("./logs/tryCatch");
const writeFileLog = require("./logs/writeFileLog");
const delay = require("./delay");
const wsSend = require("./wsSendData");
class Mailing {
  constructor() {
    this.token = null;
    this.groupArrMailing = [];
    this.i = 0;
    this.messForSend = null;
    this.from = "";
    this.before = "";
    this.spamComments = false;
    this.delCommentPost = false;
  }

  postDataMethod = () => {
    let postData = {
      message: this.messForSend, //сообщение для рассылки
      owner_id: this.groupArrMailing[this.i], //айди группы
      token: this.token,
      // spamComments:this.spamComments,
      // delCommentPost:this.delCommentPost
    };
    return postData;
  };

  isError = async (ws) => {
    if (this.group_post.error.error_code != 15) {
      await wsSend(ws, this.group_post.error_msg);
    } else {
      wsSend(ws, this.postDataMethod().owner_id);
    }
  };

  getPosts = async () => {
    let result = await canComments(this.postDataMethod().owner_id, this.token);
    return result;
  };

  mailingToGroups = async (data, ws) => {
    if (data && !this.token) {
      this.groupArrMailing = data.groupArrMailing; //массив групп для рассылки по ним
      this.token = data.token;
      this.messForSend = data.messForSend;
      this.from = data.from;
      this.before = data.before;
      this.spamComments = data.spamComments;
      this.delCommentPost = data.delCommentPost;
      this.joinGroups = data.joinGroups;
      while (this.i < 78) {
        if (this.delCommentPost) {
          //если стоит галочка "Удалять записи и комменты"
          let comments = await this.getComments();
          await delay(1, 1);
          await this.deleteWall(await this.getPosts()); //удаление постов
          await delay(1, 1);
          await this.deleteComment(comments); //удаелние комментов
        }

        if (this.joinGroups) {
          let result = await joinGroups(
            this.postDataMethod().owner_id,
            this.postDataMethod().token
          );
          await delay(1, 1);
          if (this.isErr(result) != "error") {
            await writeFileLog(
              `вступили в сообщество ${this.postDataMethod().owner_id}`
            );
          }
        }

        this.group_post = await posts_request(this.postDataMethod()); //постинг на стену
        if (this.group_post == undefined) {
          console.log("вероятно вк вернул ошибку и пост не выполнен");
          return;
          break;
        }
        if (this.group_post?.error) {
          wsSend(ws, "", this.group_post.error.error_msg, "");
         console.log(this.group_post.error.error_msg)
        }
        if (this.group_post?.response) {
          await writeFileLog(`пост опубликован`);
          await wsSend(ws, this.postDataMethod().owner_id, "", ""); //отправка данных клиенту
        } else {
          if (this.spamComments) {
            let result = await this.getPosts(); //получаем список постов стены группы
            try {
              if (result.error) {
                await writeFileLog(`${result.error}`);
              } else {
                await this.canCommentsMethod(result?.response?.items); //ищем пост на стене под которым можно оставить коммент и оставляем
                // await delay(12,25)
              }
            } catch (e) {
              await writeFileLog(e);
            }
          }
        }

        if (this.group_post.error) {
          await this.isError(ws); //проверка на то есть ли ошибки в ответе
        }
        await delay(data.from, data.before); //задержка
        this.i++;
      }
    } else {
      this.i = 78; //тем самым останавливаем рассылку
    }
  };

  dataFromReq = (i, result) => {
    let data = {
      //готовый шаблон аргументов
      post_id: result[i].id,
      owner_id: result[i].owner_id,
      comment_id: result[i].comment_id,
      message: this.messForSend,
      token: this.token,
    };
    return data;
  };

  getComments = async () => {
    //получение айди комментов к записи на стене//
    let i = 0;
    let arr = [];
    let comments = [];
    let posts = await this.getPosts(); //получили список постов
    if ((await this.isErr(posts)) != "error") {
      posts.response.items.map((k) =>
        k.comments?.count > 0 ? arr.push(k) : ""
      ); //фильтр постов с комменатми
    }
    while (i < arr.length) {
      let data = {
        owner_id: this.postDataMethod().owner_id,
        post_id: arr[i].id,
        token: this.token,
      };
      let getComments = await wallGetComments(data);
      if ((await this.isErr(getComments)) != "error") {
        await getComments.response.items.map((key) => comments.push(key.id));
      }
      i++;
    }
    return comments;
  };

  isErr = async (data) => {
    try {
      if (data.error) {
        return "error";
      } else {
        return data;
      }
    } catch (e) {
      console.log(e);
      await writeFileLog(e);
    }
  };

  deleteComment = async (result) => {
    let i = 0;
    //удаление комментария
    while (i <= result.length) {
      let data = {
        owner_id: this.postDataMethod().owner_id,
        comment_id: result[i],
        token: this.token,
      };
      let result2 = await wallDeleteComment(data);
      i++;
    }
  };

  deleteWall = async (result) => {
    // let resultResponse = await tryCatch(result.response.items); //удаление записи
    try {
      if (result.response?.items) {
        let resultResponse = result.response?.items;
        for (let i = 0; i < resultResponse.length; i++) {
          if (resultResponse[i].can_delete) {
            let result3 = this.dataFromReq(i, resultResponse);
            let result2 = await wallDelete(result3);
            await writeFileLog(result2);
          }
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  canCommentsMethod = async (result) => {
    let i = 0;
    while (i <= result.length) {
      if (result[i].comments.can_post) {
        let result2 = await createComment(this.dataFromReq(i, result));
        if ((await this.isErr(result2)) != "error") {
          await writeFileLog(`коммент опубликован`);
          console.log("коммент опубликован");
          return result2.response.comment_id;
        }
      } else {
        i++;
      }
    }
  };
}

module.exports = Mailing;
