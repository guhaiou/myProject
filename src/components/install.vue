<template>
  <div class="container">
    <Row class="title">
      <Col span="24">修改密码</Col>
    </Row>
    <ul class="message-container">
      <Row class="message-content">
        <Col class="bale-common">初始密码:</Col>
        <Col class="input-common"><Input size="large" v-model="oldWord" placeholder="原密码" clearable="false"  style="width: 200px" /></Col>
      </Row>
      <Row class="message-content">
        <Col class="bale-common">最新密码:</Col>
        <Col class="input-common">
          <Input size="large" v-model="newWord"  placeholder="新密码" clearable="true"   style="width: 200px" />
          <Button type="primary" class="change-word" @click="changeWord">修改密码</Button>
        </Col>
      </Row>

    </ul>
    <Row class="title">
      <Col span="24">重置学生密码</Col>
    </Row>
    <ul class="message-container">
      <Row class="message-content">
        <Col class="bale-common">学生账号:</Col>
        <Col class="input-common">
          <Input size="large" placeholder="输入学生的账号" clearable="false"  style="width: 200px" />
          <Button type="primary" class="change-word" @click="resetStudentWord">重置密码</Button>
        </Col>
      </Row>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Install",
    created() {
      this.$store.state.showBottomNav = false,
        this.$store.state.showLogin = true
    },
    data:function () {
      return {
        oldWord:this.oldWord,
        newWord:this.newWord,
      }
    },
    methods:{
        changeWord:function () {
          const this_vue=this;
          this.$http({
            method:'post',
            url:'http://www.gho0818.com/login.php',
            data:{
              'oldWord':this.oldWord,
              'newWord':this.newWord
            }
          }).then(function(res){
            this_vue.$Message.info('密码修改成功!');
          }).catch(function(err){
            alert("数据请求失败!")
          })
        },
        resetStudentWord:function () {
        const this_vue=this;
        this.$http({
          method:'post',
          url:'http://www.gho0818.com/login.php'
        }).then(function(res){
          this_vue.$Message.info('密码已经重置成功!');
        }).catch(function(err){
          alert("数据请求失败!")
        })
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 90%;
    margin: 30px auto;
    box-shadow: 0px 5px 75px 4px rgba(64, 70, 74, 0.2) !important;
    border-top: 4px solid #363e4f;
    padding: 1% 4%;
  }
  .title{
    font-size: 24px;
    text-align: left;
    display: flex;
    margin: 20px auto;
  }
  .name-img{
    width: 136px;
    height: 136px;
    border-radius: 50%;
  }
  .name{
    line-height: 136px;
    margin-left: 30px;
  }
  .message-container{
    text-align: left;
  }
  .bale-common{
    width:90px;
    line-height: 36px;
    font-size: 18px;
  }
  .message-content{
    display: flex;
    margin: 20px auto;
  }
  .change-word{
    margin-left: 10px;
  }
</style>
