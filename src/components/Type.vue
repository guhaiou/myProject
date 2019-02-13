<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>院校管理</span>&gt;<span>类别管理</span></div>
    <div class="search">
      <Input icon="ios-search-outline" v-model="searchType"   @on-change="search" class="search-input" placeholder="请输入类别名字" style="width: auto" />
      <Button type="primary" class="add" @click="showAddMessage">添加类别</Button>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    </div>
    <div class="page">
      <Page :total="totalNum" show-total show-elevator />
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
      <p><span class="first-title">类别名称:</span><Input v-model="addData.name" size="large" placeholder="类别名称" style="width: 200px" /></p>
      <p><span class="first-title">类别说明:</span><Input v-model="addData.description" size="large" placeholder="类别说明" style="width: 200px" /></p>
      <p><span class="first-title">状态:</span>
        <i-switch v-model="addData.status">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'Type',
    data () {
      return {
        modal: false,
        changeMessage:false,
        searchType:'',
        add:false,
        totalNum:'',//数据总个数
        changeMessageData:{
          name:'',
          description: '',
          status:'',
          id:''
        },
        addData:{
          name:'',
          description: '',
          status:'',
          id:''
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '类别名称',
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
            title: '类别说明',
            key: 'description'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              let swiper=false;
              if(params.row.status==1){
                  swiper=true
              }
              else{
                 swiper=false;
              }
              return h('div', [
                h('i-switch', {
                    props: {
                      type: 'md-checkmark',
                      value:swiper
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-change': (value) => {
                        params.row.state = value;
                        this.forbidden(value,params.index);
                      }
                    },
                  },[
                    h('span', {
                      slot: 'open',
                      domProps: {
                        innerHTML: '启'
                      }
                    }),
                    h('span', {
                      slot: 'close',
                      domProps: {
                        innerHTML: '禁'
                      }
                    })
                  ]
                )
              ]);
            }
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
                      this.change(params.index)
                    }
                  }
                }, '修改'),
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
      remove (index) {
        this.data6.splice(index, 1);
      },
      /*获取类别列表*/
      getTypeList(){
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
                        _this.totalNum=res.data.pageSize;
                        for(var i=0;i<res.data.list.length;i++){
                          _this.data6.push(res.data.list[i]);
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
        _this.changeMessageData.status=_this.data6[index].status;
      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/updateCategory',
          data: {
            id :_this.changeMessageData.id,
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
        let status=1;
        if(_this.addData.status==false){
          status=2;
        }
        else{
          status=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/addCategory',
          data: {
            name :name,
            description:description,
            status:status
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
