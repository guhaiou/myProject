<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>消息管理</span></div>
    <div class="search">
      <Input icon="ios-search-outline"   @on-change="search" class="search-input" placeholder="请输入批次名字" style="width: auto;visibility: hidden" />
      <Button type="primary" class="add" @click="showAddMessage">发送消息</Button>
    </div>
    <div class="subcontainer">
      <Table class="table-class" border   :columns="columns1"  :data="data1"></Table>
      <div class="page">
        <Page :total="pageSize" show-total="" show-elevator @on-change="pageChange" />
      </div>
    </div>
    <!--发送消息-->
    <Modal class="change-modal"
           title="发送系统消息"
           v-model="add"
           @on-ok="modal2=true"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <p>
          <span>批次:</span><Select v-model="batchDefault" clearable style="width:120px">
          <Option v-for="item in batch" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
        <p>
          <span>类别:</span><Select v-model="typeDefault" clearable style="width:120px">
          <Option v-for="item in type1" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
        <p>
          <span>学校:</span><Select v-model="schoolDefault" clearable style="width:120px">
          <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
      </div>
      <div style="display: flex;justify-content: space-around">
        <p>
          <span>层次:</span><Select v-model="CCDefault" clearable style="width:120px">
          <Option v-for="item in CcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
        <p>
          <span>专业:</span><Select v-model="ProfessionDefault" clearable style="width:120px">
          <Option v-for="item in Profession" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
        <p>
          <span>状态:</span><Select v-model="studentStatusDefault" clearable style="width:120px">
          <Option v-for="item in studentStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </p>
      </div>
      <p><span class="first-title">标题:</span><Input v-model="addData.title" size="large" placeholder="标题" style="width: 360px" /></p>
      <p><span class="first-title">内容:</span><Input type="textarea" v-model="addData.detail" :rows="4" size="large" placeholder="内容" style="width: 360px" /></p>
    </Modal>
    <!--确认弹框-->
    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#2d8cf0;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否向学生发送该消息？</span>
      </p>
      <div style="text-align:center">
        <p>发送消息后将不可撤回!</p>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" long  @click="addMessage">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "TeacherMsg",

    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getTypeList();
    },
    data(){
      return {
        add:false,
        modal2:false,
        batchDefault:'',
        typeDefault:'',
        CCDefault:'',
        schoolDefault:'',
        ProfessionDefault:'',
        studentStatusDefault:'',
        currentPage:1,
        pageSize:'',
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '内容',
            key: 'detail'
          },
          {
            title: '时间',
            key: 'createAt'
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
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }

        ],
        data1: [
          {

            address: '这是系统消息',
            date: '2016-10-03',
            object:'学生',
            note:'这是备注一'
          },
          {
            address: '这是通知',
            date: '2016-10-01',
            object:'老师',
            note:'这是备注一'
          },
          {

            address: '这是系统消息二',
            date: '2016-10-02',
            object:'学生、老师、站点',
            note:'这是备注一'
          },
          {

            address: '这是系统消息三',
            date: '2016-10-04',
            object:'站点',
            note:'这是备注一'
          }
        ],
        addData:{
          title:'',
          detail:''
        },
        batch:[],
        type1:[],
        CcList:[],
        schoolList:[],
        Profession:[],
        studentStatus:[]
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
      getBatch(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectBatchs',
          data: {
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              for(var i=0;i<res.data.length;i++){
                _this.batch.push(res.data[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取批次列表*/
      getTypeList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectCustomizedSystemMessages',
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
              }
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
      showAddMessage(){
        this.add=true;
        this.getBatch();
        this.getTypeList1();
        this.getCcList();
        this.getSchoolList();
        this.showProfession();
        this.getStudentStateList();
        this.addData=[];
      },
      /*添加类别*/
      addMessage(index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addCustomizedSystemMessages',
          data: {
            title :_this.addData.title,
            detail:_this.addData.detail,
            branchId:localStorage.getItem('branchId'),
            batchId:_this.batchDefault,
            categoryId:_this.typeDefault,
            educational:_this.CCDefault,
            schoolId:_this.schoolDefault,
            professionalId:_this.ProfessionDefault,
            studentStatusId:_this.studentStatusDefault
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.data6=[];
              _this.$Message.info('发送成功!');
              _this.getTypeList();
              _this.modal2=false;
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
      /*获取类别列表*/
      getTypeList1(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCategorysPage',
          data: {
            pageIndex :page
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              for(var i=0;i<res.data.list.length;i++){
                _this.type1.push(res.data.list[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*层次列表*/
      getCcList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectEducationals',
          data: {
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.CcList=[];
              _this.CcList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取学校列表*/
      getSchoolList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolPage',
          data: {
            pageIndex:1
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.schoolList=[];
              for(var i=0;i<res.data.list.length;i++){
                _this.schoolList.push(res.data.list[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*显示专业*/
      showProfession(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolProfession',
          data: {
            schoolId:1
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.Profession=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取学生状态列表*/
      getStudentStateList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudentStatus',
          data: {
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.studentStatus=[];
              _this.studentStatus=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getCourseList();
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
