const {
  posts_request,
  canComments,
  createComment,
  wallDeleteComment,
  wallDelete,
  wallGetComments,
} = require("./requests");
const delay = require("./delay");
const wssend = require("./wsSendData");
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
      await wssend(ws, this.group_post.error_msg);
    } else {
      wssend(ws, this.postDataMethod().owner_id);
    }
  };

  getPosts = async () => {
    //получение списка постов со стены группы
    let result = await canComments(this.postDataMethod().owner_id, this.token);
    return result.response.items;
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
      console.log(data, "8MAILING");
      while (this.i < 70) {
        if (this.delCommentPost) {
          //если стоит галочка "Удалять записи и комменты со стены перед публикацией поста или коммента"
          let comments = await this.getComments();
          // await this.deleteWall(await this.getPosts()); //удаление постов
          await this.deleteComment(comments); //удаелние комментов
        }
        this.group_post = await posts_request(this.postDataMethod()); //постинг на стену

        if (this.group_post.error) {
          await this.isError(ws); //проверка на то есть ли ошибки в ответе
        }
        await delay(data.from, data.before); //задержка
        if (this.spamComments) {
          //иначе если стоит галочка
          let result = await this.getPosts(); //получаем список постов стены группы
          console.log(result);
          await this.canCommentsMethod(result); //ищем пост на стене под которым можно оставить коммент и оставляем
        }
        this.i++;
      }
    } else {
      this.i = 70; //тем самым останавливаем рассылку
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
    posts.map((k) => (k.comments.count > 0 ? arr.push(k) : "")); //фильтр постов с комменатми
    while (i < arr.length) {
      let data = {
        owner_id: this.postDataMethod().owner_id,
        post_id: arr[i].id,
        token: this.token,
      };
      let getComments = await wallGetComments(data);
      await getComments.response.items.map((key) => comments.push(key.id));
      i++;
    }
    return comments;
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
    //удаление записи
    for (let i = 0; i < result.length; i++) {
      if (result[i].can_delete) {
        let result3 = this.dataFromReq(i, result);
        let result2 = await wallDelete(result3);
        console.log(result2);
        break;
      }
    }
  };

  canCommentsMethod = async (result) => {
    this.result = result;
    for (let i = 0; i < result.response.items.length; i++) {
      if (!result.response.items[i].can_delete) {
        console.log("its found done");
        let result = await createComment(this.dataFromReq(i));
        console.log(result);
        break;
      }
    }
  };
}

module.exports = Mailing;
