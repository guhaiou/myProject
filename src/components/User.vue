<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统设置</span>&gt;<span>用户管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入用户名字" v-model="name"  @on-change="search"   style="width: auto;visibility: hidden"/>
      <Button type="primary" class="add" @click="Add">添加用户</Button>
    </div>
    <div class="table-container" style="margin: 20px">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    </div>
    <div class="page">
      <Page :total="pageSize" show-elevator show-total="" @on-change="pageChange" />
    </div>
    <!--修改密码-->
    <Modal class="change-modal"
           title="修改密码"
           v-model="changeWordMd"
           @on-ok="sureChangePw"
           @on-cancel="cancelChangePw"
           :mask-closable="false">
      <p><span class="first-title">新密码:</span><Input v-model="changeWord1" size="large" placeholder="请输入新密码" style="width: 200px" /></p>
      <p><span class="first-title">再次输入:</span><Input v-model="changeWord2" size="large" placeholder="再次输入新密码" style="width: 200px" /></p>
    </Modal>
    <!--修改信息-->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <p><span class="first-title">姓名:</span><Input v-model="changeData.userName" size="large" placeholder="站点名称" style="width: 200px" /></p>
      <p><span class="first-title">手机:</span><Input v-model="changeData.mobileNo " size="large" placeholder="站点地点" style="width: 200px" /></p>
      <p><span class="first-title">性别:</span>
        <Select v-model="changeData.sex" style="width:200px">
         <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
<!--      <p><span class="first-title">角色:</span>
        <Select v-model="changeData.roleId" style="width:200px">
          <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.id }}</Option>
        </Select>
      </p>-->
    </Modal>
    <!--添加站点-->
    <Modal class="change-modal"
           title="添加站点"
           v-model="add"
           @on-ok="sureAdd"
           @on-canncel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">姓名:</span><Input v-model="addData.userName" size="large" placeholder="姓名" style="width: 200px" /></p>
      <p><span class="first-title">手机:</span><Input v-model="addData.mobileNo " size="large" placeholder="手机" style="width: 200px" /></p>
      <p><span class="first-title">性别:</span>
        <Select v-model="addData.sex" style="width:200px">
          <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">角色:</span>
         <Select v-model="addData.roleId" style="width:200px">
                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.id }}</Option>
          </Select>
      </p>
      <p><span class="first-title">站点:</span>
        <Select v-model="addData.branchId" style="width:200px">
          <Option v-for="item in pointList" :value="item.id" :key="item.id">{{ item.id }}</Option>
        </Select>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "User",
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true
      this.getList();
    },
    data(){
      return {
        changeWordMd:false,
        name:'',
        index:'',
        searchName:'',
        changeMessage:false,
        pageSize:'',
        currentPage:1,
        changeWord1:'',
        changeWord2:'',
        add:false,
        addData:{
          userName:'',
          sex:'',
          roleId:'',
          mobileNo:'',
          branchId:'',
        },
        pointList:[],
        sexList:[{name:'男',value:'1'},{name:'女',value:'0'}],
        roleList:[],
        changeData:{
          userName:'',
          sex:'',
          roleId:'',
          mobileNo:'',
          branchId:''
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'userName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.userName)
              ]);
            }
          },
          {
            title: '电话',
            key: 'mobileNo'
          },
          {
            title: '角色Id',
            key: 'roleId',
          },
          {
            title: '所属站点',
            key: 'branchId'
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
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
                }, '修改信息'),
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
                      this.changePassWord(params.index)
                    }
                  }
                }, '修改密码'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
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
        data6:[]
      }
    },
    methods:{
      Add(){
        this.add=true;
        this.getRoleList();
        this.getPointList();
      },
      /*添加*/
      sureAdd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/addAdmins',
          data: {
            mobileNo   :_this.addData.mobileNo ,
            userName  :_this.addData.userName,
            branchId  :_this.addData.branchId ,
            roleId   :_this.addData.roleId ,
            sex :_this.addData.sex ,
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('添加成功!')
              _this.getList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消添加*/
      cancelAdd(){
        this.$Message.info('添加失败!')
      },
      /*修改弹框*/
      change(index){
        this.changeMessage=true;
        this.index=index;
        this.changeData=[];
        this.changeData.branchId=this.data6[index].branchId;
        this.changeData.mobileNo=this.data6[index].mobileNo;
        this.changeData.roleId=this.data6[index].roleId;
        this.changeData.sex=this.data6[index].sex;
        this.changeData.userName=this.data6[index].userName;
        this.getRoleList();
        this.getPointList();
      },
      /*确定修改*/
      sureChange(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/updateAdmins',
          data: {
            adminId :_this.data6[_this.index].id,
            mobileNo   :_this.changeData.mobileNo ,
            userName  :_this.changeData.userName ,
            sex  :_this.changeData.sex,
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
              _this.getList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消修改*/
      cancelChange(){
        this.$Message.info('修改失败!')
      },
      /*获取列表*/
      getList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/selectAdminsPage',
          data: {
            pageIndex:_this.currentPage,
            name:this.searchName
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
              _this.pageSize=res.data.pageSize;
              _this.data6=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/delAdmins',
              data: {
                adminId :_this.data6[index].id,
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'POST',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.$Message.info('已删除!');
                  _this.getList();
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
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getList();
      },
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectBranchsPage',
          data: {
            pageIndex :_this.currentPage,
            name:_this.name
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            _this.pageSize=res.data.pageSize;
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
      /*获取角色列表*/
      getRoleList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectRoles',
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
              _this.roleList=[];
              _this.roleList=res.data;
              console.log( _this.roleList)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取站点列表*/
      getPointList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectBranchsList',
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
              _this.pointList=[];
              _this.pointList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*修改密码*/
      changePassWord(index){
        this.index=index;
        this.changeWordMd=true;
        this.changeWord1='';
        this.changeWord2='';

      },
      /*确定输入新密码*/
      sureChangePw(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/updateAdminsPwd',
          data: {
            adminId:_this.data6[_this.index].id,
            password:_this.changeWord1,
            password2:_this.changeWord2
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
      /*取消输入*/
      cancelChangePw(){
        this.$Message.info('修改失败!')
      }
    }
  }
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
