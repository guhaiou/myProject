<template>
  <Row class="head" id="header">
    <Col span="3"><router-link to="Index"><img style="width: 30%" class="logo"  src="../assets/head-img/logo.png"></router-link></Col>
    <Col span="5" offset="16" class="head-right">
      <Row>
          <Col span="9" class="right-one"><span>欢迎登陆，</span><span class="name">{{name}}</span></Col>
          <Col span="4">
            <Badge>
              <div href="#" class="demo-badge" @click="imageShow()">{{img}}</div>
              <div class="name-message" v-if="nameIsShow">
                    <div class="name-container" @click="turnPersonnal"><Icon type="ios-shirt-outline" size="24" />{{name}}</div>
                    <div class="name-container" @click="Install"><Icon type="ios-settings-outline" size="24" />个人设置</div>
                    <div class="name-container" @click="turnLogin()"><Icon type="ios-log-out" size="24" />退出登录</div>
              </div>
            </Badge>
          </Col>
          <Col span="3" class="icon" @click.native="toggle">
            <Badge :count="tipNum" type="error" class="dot">
              <Icon  type="ios-notifications-outline" size="26"></Icon>
            </Badge>
            <div class="notice" v-if="show">
              <span class="arrow_top"></span>
              <div class="top"><span class="left-tip">消息通知</span></div>
              <div>
                <ul class="new-container" v-for="(item,index) in data6" v-if="data6.length!=0">
                  <li><p><b style="color: #4d5669;margin-right: 5px">学生姓名:</b>{{item.studentName}}</p><p>{{item.objectionContent}}</p></li>
                </ul>
                <ul class="new-container" v-if="data6.length==0">
                  <li>暂无消息!</li>
                </ul>
              </div>
            </div>
          </Col>

      </Row>
    </Col>
  </Row>
</template>
<script>
    export default {
        name: "Header",
      data:function(){
        return {
          show:false,
          nameIsShow:false,
          name:sessionStorage.getItem('name'),
          img:'',
          currentPage:1,
          data6:[],
          tipNum:0
        }
      },
      created() {
        this.getName();
        this.getList();
      },
        methods:{
          //展开与关闭顶部消息提示框
            toggle:function () {
                if(this.show==false){
                  this.show=true
                }
                else{
                  this.show=false
                }
            },
          //展开与显示跟人信息个人中心提示框
            imageShow:function () {
              if(this.nameIsShow==false){
                this.nameIsShow=true
              }
              else{
                this.nameIsShow=false
              }
          },
          //跳转到登录页面
          turnLogin:function () {
            this.$router.push({ name: 'Login'});
          },
          //进入到个人中心
          turnPersonnal:function () {
            this.$router.push({ name: 'Personnal_center'});
            this.nameIsShow=false
          },
          //进入到个人中心
          Install:function () {
            this.$router.push({ name: 'Install'});
            this.nameIsShow=false
          },
          /*名字最后一个字*/
          getName(){
            let name=String(sessionStorage.getItem('name'));
            let lastName=name.charAt(name.length-1);
            this.img=lastName;
          },
          /*消息*/
          getList(){
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectExaminationObjections',
              data: {
                pageIndex :_this.currentPage
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'GET',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.data6=[];
                  for(var i=0;i<res.data.list.length;i++){
                    _this.data6.push(res.data.list[i]);
                  }
                  _this.tipNum=_this.data6.length;
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});
          },

      }

    }
</script>

<style scoped>
  ul{
    list-style: none;
  }
.head{
  height: 60px;
  text-align: center;
  border-bottom: 1px solid #e8eaec;
}
  .head>div{
    height: 60px;
    line-height: 60px;
  }
  .logo{
    width: 80%;
    height: 40px;
    display: inline-block;
    margin-top: 10px;
    margin-left: 10%;
  }
  .head-right{
  }
  .name{
    font-weight: bold;
    font-family: "PingFang SC";
  }
  .right-one{
    font-size: 14px;
    text-align: center;
  }
  .last-name{
    width: 40px;
    display: block;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    margin: 10px auto;
    background: bisque;
    font-size: 18px;
    color: #2b85e4;
    font-weight: bold;
  }
.ivu-badge{
  margin-top: 0px;
}
  .icon{
    line-height:28px!important;
    cursor: pointer;
  }
  .dot{
    margin-top: 19px;
  }
  .demo-badge{
    width: 40px;
    line-height: 40px;
    height: 40px;
    border-radius: 50%;
    background: #eeeeee;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b85e4;
    cursor: pointer;
  }
  .notice{
    position: absolute;
    height:auto;
    top: 132%;
    width: 400%;
    left: -290%;
    background-color:white;
    box-shadow: 0px 5px 75px 2px rgba(64, 70, 74, 0.2) !important;
    z-index: 100;
    overflow-y:auto;
    border-radius: 6px;
    padding-bottom: 10px;
  }
  .name-message{
    position: absolute;
    height: 140px;
    top: 132%;
    width: 400%;
    left: -135%;
    background-color:white;
    box-shadow: 0px 5px 75px 2px rgba(64, 70, 74, 0.2) !important;
    z-index: 100;
    overflow-y:auto;
    border-radius: 6px;
  }
  .arrow_top{
    display: block;
    position: absolute;
    z-index: 101;
    top: -23px;
    right:19px;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #E4E5EC transparent;
  }
  .notice li{
    list-style: none;
    border-bottom: 1px solid #E4E5EC;
  }
  .new-container{
    width: 94%;
    margin: 0 auto;
  }
  .new-container p:nth-child(1){
    text-align: left;
    color: #2d8cf0;
  }
.new-container p:nth-child(2){
  text-align: left;
}
  .notice .top{
    height: 40px!important;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .notice span{
    display: block;
  }
  .left-tip{
    width: 100%;
    margin: 10px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #ed4014;
  }

  .notice-list p{
    text-align: left;
    width: 95%;
    margin: 0 auto;
  }
  .notice-list p:nth-child(1){
    color: #2b85e4;
  }

  .name-container{
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: left;
    border-bottom: 1px solid #E4E5EC;
    font-size: 14px;
    cursor: pointer;
  }
  .name-container .ivu-icon{
    margin-left: 10px;
    margin-right: 20px;
  }
</style>
