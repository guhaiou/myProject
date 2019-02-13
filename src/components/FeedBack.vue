<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>学生反馈</span></div>
    <div class="search">
      <Input icon="ios-search-outline"   @on-change="search" class="search-input" placeholder="请输入学生名字" style="width: auto;" />
      <Button type="primary" class="add" @click="showAddMessage" style="visibility: hidden">发送系统消息</Button>
    </div>
    <div class="subcontainer">
      <Table class="table-class" border   :columns="columns1"  :data="data1"></Table>
      <div class="page">
        <Page :total="pageSize" show-total="" show-elevator />
      </div>
    </div>
    <!--添加课程-->
    <Modal class="change-modal"
           title="回复消息"
           v-model="reply"
           @on-ok="replyMessage"
           @on-cancel="cancel"
           :mask-closable="false">
      <p><span class="first-title">内容:</span><Input type="textarea" v-model="addData.detail" :rows="4" size="large" placeholder="内容" style="width: 360px" /></p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "RecordMessage",
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getTypeList();
    },
    data(){
      return {
        index:'',
        reply:false,
        currentPage:1,
        pageSize:'',
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '学生姓名',
            key: 'studentName'
          },
          {
            title: '反馈内容',
            key: 'contents'
          },
          {
            title: '回复内容',
            key: 'title'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showAddMessage(params.index)
                    }
                  }
                }, '回复')
              ]);
            }
          }

        ],
        data1: [],
        addData:{
          detail:''
        }
      }
    },
    methods: {
      show (index) {
        var _this=this;
        this.$Modal.info({
          title: '修改信息',
          content:`<p>学校名称:${this.data6[index].name}</p><p>状态:${this.data6[index].status}</p><p>备注:${this.data6[index].description}</p>`
        })
      },
      /*删除*/
      remove (index) {
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/delSystemMessages',
              data: {
                id:_this.data1[index].id,
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'POST',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.data1=[];
                  _this.$Message.info('已删除!');
                  _this.getTypeList();
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});
          },
          onCancel: () => {
            this.$Message.info('取消删除!');
          }
        });
      },
      /*获取批次列表*/
      getTypeList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudentFeedbacks',
          data: {
            pageIndex:_this.currentPage
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.data1=[];
              _this.pageSize=res.data.pageSize;
              for(let i=0;i<res.data.list.length;i++){
                _this.data1.push(res.data.list[i]);
                if(res.data.list[i].feedbackDetails.length!=0){
                  _this.data1[i].title=res.data.list[i].feedbackDetails[0].detail;
                }
              }
              console.log(_this.data1)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*修改类别*/
      change(index){
        var _this=this;
        _this.changeMessage=true;
        _this.changeMessageData.name=_this.data6[index].name;
        _this.changeMessageData.description=_this.data6[index].description;
        _this.changeMessageData.id=_this.data6[index].id;
        _this.changeMessageData.listOrder=_this.data6[index].listOrder;
      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addBatch',
          data: {
            name:_this.changeMessageData.name,
            description:_this.changeMessageData.description
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('修改成功!');
              _this.data6=[];
              _this.getTypeList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消修改*/
      cancel () {
        this.$Message.info('修改失败!');
      },
      /*取消添加*/
      cancelAdd() {
        this.$Message.info('添加失败!');
      },
      /*显示添加弹框*/
      showAddMessage(index){
        this.reply=true;
        this.index=index
      },
      /*添加类别*/
      replyMessage(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/addStudentFeedbackDetail',
          data: {
            studentFeedbackId  :_this.data1[_this.index].id,
            detail:_this.addData.detail,
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.data1=[];
              _this.$Message.info('添加成功!');
              _this.getTypeList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCategoryByNamePage',
          data: {
            pageIndex :page,
            name:name
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.data6=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*禁用和启用*/
      forbidden(value,index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        var status=false;
        if(value==false){
          status=2;
        }
        else{
          status=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/setCategoryStatus',
          data: {
            id:_this.data6[index].id,
            status: status
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('修改成功!');
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
  .top-head{
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    text-align: left;
  }
  .top-head span:nth-child(1){
    margin-left: 20px;
  }
  .top-head span{
    margin-right: 5px;
    cursor: pointer;
  }
  .search{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .search-input{
    margin-left: 20px;
  }
  .add{
    margin-right: 20px;
  }
  .subcontainer{
    padding: 30px 20px;

  }
  .change-modal p{
    margin-bottom: 10px;
  }
  .first-title{
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 5px;
  }
  .top-left-icon{
    margin:0 5px 4px 20px;
  }
  .top-head{
    height: 50px;
    line-height: 50px;
    border: 1px solid #eee;
    text-align: left;
  }
  .top-head span:nth-child(1){
    margin-left: 20px;
  }
  .top-head span{
    margin-right: 5px;
    cursor: pointer;
  }
  .table-class{
    margin: 0 auto;
  }
  .page{
    margin-top: 30px;
  }
</style>
