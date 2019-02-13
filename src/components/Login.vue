<template>
    <div class="container">
      <Spin size="large" v-if="$store.state.isLoading"></Spin>
      <div class="top">
        <img src="../assets/login-img/login-top.jpg"/>
        <p class="top-title">Hello,Welcome back!</p>
        <p class="top-subtitle">教务后台管理中心</p>
      </div>
      <div class="login-container">
        <Input class="inputStyle1" size="large" prefix="ios-contact-outline" placeholder="请输入账号" @on-change="hideTip()" style="width: auto" v-model="username" @keyup.enter.native="getAddressJson" /><br>
        <div class="tip tip1" v-if="showTip1">* {{tipText1}} !</div>
        <Input class="inputStyle2" size="large" prefix="ios-lock-outline" type="password" placeholder="请输入密码" @on-change="hideTip()" style="width: auto" v-model="password" @keyup.enter.native="getAddressJson" />
        <div class="tip tip2" v-if="showTip2">* {{tipText2}} !</div>
        <div class="login" v-on:click="getAddressJson()">登录</div>
        <div class="remember-container">
          <Checkbox v-model="remember">Checkbox</Checkbox>
          <div>忘记密码？</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data:function(){
      return {
        username:this.username,
        password: this.password,
        showTip1:false,
        showTip2:false,
        tipText1:'',
        tipText2:'',
        remember:true
      }
    },
    created() {
        this.$store.state.showBottomNav = true,
        this.$store.state.showLogin = false
        if(localStorage.getItem('isselect')=="true"){
          this.remember=true;
        }
        else{
          this.remember=false;
        }
    },
    mounted:function(){
        this.username=JSON.parse(localStorage.getItem('login_message'))["name"];
        this.password=JSON.parse(localStorage.getItem('login_message'))["password"];
    },
    watch:{
      "remember":function change(){
        localStorage.setItem("isselect",this.remember);
      }
    },
    methods:{
      hideTip:function (e) {
       if(this.username){
         this.showTip1=false;
       }
       if(this.password){
         this.showTip2=false;
       }
       if(!this.username){
         this.showTip1=true;
         this.tipText1='账号不能为空';
       }
        if(!this.password){
          this.showTip2=true;
          this.tipText2='密码不能为空';
        }
      },
      getAddressJson:function (e) {
        var this_vue=this;
        var username=this.username;
        var password=this.password;
        this.$http({
          method:'POST',
          url:'http://api-erp.juwenjiaoyu.com:9000/api/tourist/login?mobileNo='+username+'&password='+password,
        }).then(function(res){
          var branchId=res.data.data.branchId;
          var righname=res.data.status;
          var token=res.data.data.token;
          var userId=res.data.data.id;
          var name=res.data.data.userName;
          var functions=res.data.data.functions;
          if(username==undefined){
            if(password==undefined){
              this_vue.showTip1='true';
              this_vue.tipText1='账号不能为空';
              this_vue.showTip2='true';
              this_vue.tipText2='密码不能为空';
            }
            else if(password!=undefined){
              this_vue.showTip1='true';
              this_vue.tipText1='账号不能为空';
            }
          }
          else{
            if(password==undefined){
              this_vue.showTip2='true';
              this_vue.tipText2='密码不能为空';
            }
            else {
              if(righname==200){
                var login_message=JSON.stringify({name:username,password:password});
                sessionStorage.setItem('name',name);
                sessionStorage.setItem('token',token);
                sessionStorage.setItem('userId',userId);
                localStorage.removeItem("login_state");
                localStorage.setItem('branchId',branchId);
                localStorage.setItem('userId',userId);
                localStorage.setItem('functions',JSON.stringify(functions));
                if(this_vue.remember){
                  localStorage.setItem('login_message',login_message);
                }
                else{
                  localStorage.removeItem("login_message");
                }
                this_vue.$router.push({ name:'Statistics'});
              }
              else if(righname==1000){
                alert("账号或密码错误!")
              }
            }
          }
        }).catch(function(err){
          alert("数据请求失败!")
        })
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    position: relative;
  }
  .inputStyle input{
    background: white;
  }
  .top{
    position: relative;
    width: 100%;

  }
  .top-title{
    position: absolute;
    width: 50%;
    left: 25%;
    top: 25%;
    text-align: center;
    font-size: 60px;
    color: white;
  }
  .top-subtitle{
    position: absolute;
    width: 50%;
    left: 25%;
    top: 47%;
    text-align: center;
    font-size: 36px;
    color: white;
    font-weight: bold;
    opacity: 0.8;
  }
  .top img{
    width: 100%;
  }
  .login-container{
    width: 23%;
    padding:60px 40px;
    margin: 25px auto;
    background: white;
    border-radius: 8px;
    position: relative;
    top: -190px;
    box-shadow: 0px 5px 75px 2px rgba(64, 70, 74, 0.2) !important;
  }
  .login-container .ivu-input-wrapper{
    width: 98% !important;
    border-radius: 6px;
    outline: none;
    border: none;
    margin-bottom: 30px;
  }
  .login-container .ivu-input-wrapper .ivu-input-type{
    height: 100px;
  }
  .login{
    width: 100%;
    height: 45px;
    background:#46a5fe ;
    text-align: center;
    line-height: 45px;
    margin: 15px auto;
    border-radius: 8px;
    color: white;
    font-size: 18px;
    margin-bottom: 0;
  }
  .login a{
    display: block;
    height: 100%;
    width: 100%;
    color: white;
  }
  .ivu-input{
    background: white;
    height: 90px!important;
  }
  .tip{
    font-size: 12px;
    color: red;
    position: absolute;
    left:46px;
    top: 100px;
  }
  .tip2{
    top: 163px;
  }
  .remember-container{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #626b7d;
    cursor: pointer;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .ivu-spin{
    position: absolute;
    bottom: 44%;
    z-index: 999;
    left: 49%;
  }
  .demo-spin-col .ivu-spin-fix{

    color: white;
  }
</style>
