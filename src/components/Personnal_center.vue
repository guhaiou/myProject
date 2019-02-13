<template>
 <div class="container">
   <Row class="title">
     <Col span="24">个人中心</Col>
   </Row>
   <Row class="title">
     <Col class="name-img"><img src="../assets/head-img/name-img.png"/></Col>
     <Col class="name">谷海欧</Col>
   </Row>
   <ul class="message-container">
     <Row class="message-content">
        <Col class="bale-common">姓名:</Col>
        <Col class="input-common"><Input size="large" disabled="isDo" v-model="name"  style="width: 200px" /></Col>
     </Row>
     <Row class="message-content">
       <Col class="bale-common">电话:</Col>
       <Col class="input-common"><Input size="large" disabled="isDo"   v-model="phone"   style="width: 200px" /></Col>
     </Row>
     <Row class="message-content">
       <Col class="bale-common">站点:</Col>
       <Col class="input-common"><Input size="large" disabled="isDo"    v-model="site"  style="width: 200px" /></Col>
     </Row>
     <Row class="message-content">
       <Col class="bale-common">机构:</Col>
       <Col class="input-common"><Input size="large" disabled="isDo"    v-model="institution"   style="width: 200px" /></Col>
     </Row>
   </ul>
 </div>
</template>

<script>
    export default {
      name: "Personnal_center",
      created() {
        this.$store.state.showBottomNav = false,
          this.$store.state.showLogin = true
      },
      data:function () {
        return {
          name:'谷海欧',
          phone:"18397642808",
          site:'高新站点',
          institution:'湖南高新技术学院',
          isDo:false
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
    width:70px;
    line-height: 36px;
    font-size: 18px;
  }
  .message-content{
    display: flex;
    margin: 20px auto;
  }
</style>
