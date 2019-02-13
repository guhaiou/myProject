<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统管理</span>&gt;<span>批次管理</span></div>
    <div class="search">
      <Input icon="ios-search-outline" v-model="searchType"   @on-change="search" class="search-input" placeholder="请输入批次名字" style="width: auto;visibility: hidden" />
      <Button type="primary" class="add" @click="showAddMessage">添加批次</Button>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    </div>
    <!--修改课程信息-->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           @on-ok="sureChange"
           @on-cancel="cancel"
           :mask-closable="false">
      <p><span class="first-title">类别名称:</span><Input v-model="changeMessageData.name" size="large" placeholder="类别名称" style="width: 200px" /></p>
      <p><span class="first-title">类别说明:</span><Input v-model="changeMessageData.description" size="large" placeholder="类别说明" style="width: 200px" /></p>
    </Modal>
    <!--添加课程-->
    <Modal class="change-modal"
           title="添加类别"
           v-model="add"
           @on-ok="addMessage"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">批次名称:</span><Input v-model="addData.name" size="large" placeholder="批次名称" style="width: 200px" /></p>
      <p><span class="first-title">备注:</span><Input v-model="addData.description" size="large" placeholder="批次说明" style="width: 200px" /></p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'BatchController',
    data () {
      return {
        modal: false,
        changeMessage:false,
        pageSize:'',
        searchType:'',
        add:false,
        changeMessageData:{
          name:'',
          description: '',
          status:'',
          id:''
        },
        addData:{
          name:'',
          description: '',
          listOrder:'',
          id:''
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '批次名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '备注',
            key: 'description'
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
        data6: []
      }
    },
    created(){
      this.$store.state.showBottomNav = false,
        this.$store.state.showLogin = true,
        this.getTypeList();
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/delBatch',
              data: {
                id:_this.data6[index].id,
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
                _this.data6.push(res.data[i]);
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
      },
      /*添加类别*/
      addMessage(index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        _this.add=true;
        let name=_this.addData.name;
        let description=_this.addData.description;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addBatch',
          data: {
            name :name,
            description:description,
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
              _this.$Message.info('修改成功!');
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
  //<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}
</script>

<style scoped>
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
  .search{
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
  .search-input{
    margin-left: 20px;
  }
  .add{
    margin-right: 20px;
  }
  .table-container{
    padding: 0 20px;
  }
  .page{
    margin-top: 30px;
  }
  .first-title{
    display: inline-block;
    margin:0 10px;
    width: 60px;
    text-align: right;
  }
  .change-modal p{
    margin-bottom: 5px;
  }
</style>
