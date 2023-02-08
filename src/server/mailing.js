const { posts_request, canComments, createComment, wallDeleteComment, wallDelete } = require("./requests");
const delay = require("./delay");
const wssend = require("./wsSendData");
const results = require("../client/results/Results");
class Mailing {
  constructor() {
    this.token = null;
    this.groupArrMailing = [];
    this.i = 0;
    this.messForSend = null;
    this.from = "";
    this.before = "";
    this.spamComments = false
    this.delCommentPost = false
  }
  // async while_i() {
  //     this.i++;
  //     this.group_post = await Group_post(this.post_data);
  //     await this.i_res_arr();
  //     await this.if_arr();
  // }

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
    if (this.group_post.error) {
      await wssend(ws, this.group_post.error_msg);
    } else {
      wssend(ws, this.postDataMethod().owner_id);
    }
  };

  mailingToGroups = async (data, ws) => {
    if (data && !this.token) {
      this.groupArrMailing = data.groupArrMailing; //массив групп для рассылки по ним
      this.token = data.token;
      this.messForSend = data.messForSend;
      this.from = data.from;
      this.before = data.before;
      this.spamComments = data.spamComments
      this.delCommentPost = data.delCommentPost
      console.log(data, "8MAILING");
      while (this.i < 70) {
        this.group_post = await posts_request(this.postDataMethod());
        if(this.delCommentPost){
          await this.deleteWall()
          await this.deleteWall()
        }
        if (this.group_post.response) {
          console.log(this.group_post, this.i);
          await this.isError(ws); //проверка на то есть ли ошибки в ответе
          await delay(data.from, data.before); //задержка
        } else if(this.spamComments) { //иначе если стоит галочка
          let result = await canComments(
            this.postDataMethod().owner_id,
            this.token
          ); //получаем список постов стены группы
          console.log(result);
          await this.canCommentsMethod(result);
        }
        this.i++;
      }
    } else {
      this.i = 70; //тем самым останавливаем рассылку
    }
  };

  dataFromReq = (i)=>{
    let data  = { //готовый шаблон аргументов
      post_id: this.result.response.items[i].id,
      owner_id: this.result.response.items[i].owner_id,
      message: this.messForSend,
      token: this.token,
    }
    return data
  }

  deleteComment = async (result)=>{ //удаление комментария
    await result.response.items.map(async (key, i)=>{
      if(key.can_delete){
        let result = await wallDeleteComment(this.dataFromReq(i))
      }
    })
  }

  deleteWall = async (result)=>{ //удаление записи
    await result.response.items.map(async (key, i)=>{
      if(key.can_delete){
        let result = await wallDelete(this.dataFromReq(i))
      }
    })
  }

  canCommentsMethod = async (result) => {
    this.result = result;
    for (let i = 0; i < result.response.items.length; i++) {
      if (!result.response.items[i].can_delete) {
        console.log("its found done");
        let result = await createComment(this.dataFromReq());
        console.log(result);
        break;
      }
    }
  };
}

module.exports = Mailing;
