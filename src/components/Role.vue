<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统设置</span>&gt;<span>角色管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入课程名字" v-model="name"  @on-change="search"  style="width: auto;visibility: hidden" />
      <Button type="primary" class="add" @click="add=true">添加角色</Button>
    </div>
    <div class="table-container" style="margin: 20px">
      <Table border ref="selection" :columns="columns7" :data="data6"  @on-change="pageChange"></Table>
    </div>
    <div class="page">
      <Page :total="pageSize" show-elevator show-total="" />
    </div>
    <!--修改信息-->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <p><span class="first-title">角色名称:</span><Input v-model="changeData.name" size="large" placeholder="角色名称" style="width: 200px" /></p>
      <p><span class="first-title">角色描述:</span><Input v-model="changeData.description " size="large" placeholder="角色描述" style="width: 200px" /></p>
    </Modal>
    <!--添加站点-->
    <Modal class="change-modal"
           title="添加角色"
           v-model="add"
           @on-ok="sureAdd"
           @on-canncel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">角色名称:</span><Input v-model="addData.name" size="large" placeholder="角色名称" style="width: 200px" /></p>
      <p><span class="first-title">角色描述:</span><Input v-model="addData.description" size="large" placeholder="角色描述" style="width: 200px" /></p>
    </Modal>
    <!--权限-->
    <Modal class="change-modal"
           title="权限分配"
           v-model="permissionsMd"
           @on-ok="setPermissionsMd"
           @on-canncel="cancelAdd"
           :mask-closable="false">
      <Tree :data="data3" check-strictly="link"  multiple @on-select-change='getSelectedNodes'></Tree>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "Role",
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getList();
    },
    data(){
      return {
        link:false,
        permissionsMd:false,
        name:'',
        index:'',
        searchName:'',
        changeMessage:false,
        pageSize:'',
        currentPage:1,
        add:false,
        addData:{
          name:'',
          description:'',
        },
        changeData:{
          name:'',
          description:'',
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'school-name',
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
            title: '角色描述',
            key: 'description'
          },
          {
            title: '角色ID',
            key: 'id',
          },
          {
            title: '操作',
            key: 'action',
            width:260,
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
                      this.permissions(params.index)
                    }
                  }
                }, '权限'),
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
        data6: [
          {
            name: '高新站点',
            location: '湖南交通职业技术学院',
            phone: '18397642808',
            note:'这是长期合作机构'
          },
          {
            name: '高新站点',
            location: '湖南交通职业技术学院',
            phone: '18397642808',
            note:'这是长期合作机构'
          },
          {
            name: '高新站点',
            location: '湖南交通职业技术学院',
            phone: '18397642808',
            note:'这是长期合作机构'
          },
          {
            name: '高新站点',
            location: '湖南交通职业技术学院',
            phone: '18397642808',
            note:'这是长期合作机构'
          }
        ],
        data2: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
              },
              {
                title: 'parent 1-2',
                expand: true,
              }
            ]
          },
          {
            title: 'parent 2',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
              },
              {
                title: 'parent 1-2',
                expand: true,
              }
            ]
          }
        ],
        data3:[],
        functionIdStr:[]
      }
    },
    methods:{
      /*添加*/
      sureAdd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addRoles',
          data: {
            name  :_this.addData.name,
            description :_this.addData.description
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
        this.changeData.name=this.data6[index].name;
        this.changeData.description=this.data6[index].description;
      },
      /*确定修改*/
      sureChange(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/updateRoles',
          data: {
            roleId:_this.data6[_this.index].id,
            name:_this.changeData.name,
            description:_this.changeData.description,
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectRoles',
          data: {
            pageIndex:_this.currentPage,
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
              _this.pageSize=res.data.length;
              _this.data6=res.data;
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/delRoles',
              data: {
                roleId :_this.data6[index].id,
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
      /*权限*/
      permissions(index){
        this.permissionsMd=true;
        this.index=index;
        this.getRoleFunctionsList();
      },
      /*菜单列表*/
      getRoleFunctionsList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectRoleFunctionsByRoleId',
          data: {
            roleId:_this.data6[_this.index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.data3=[];
              for(let i=0;i<res.data.length;i++){
                _this.data3.push(res.data[i]);
                for(let j=0;j<_this.data3[i].children.length;j++){
                  if(res.data[i].children[j].isSelect==1){
                    _this.$set( _this.data3[i],'selected',true)
                  }
                  else{
                    _this.$set( _this.data3[i],'selected',false)
                  }
                  if(_this.data3[i].children[j].isSelect==1){
                    _this.$set(_this.data3[i].children[j],'selected',true)
                  }
                  else{
                    _this.$set(_this.data3[i].children[j],'selected',false)
                  }
                }
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*设置权限*/
      setPermissionsMd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/setRoleFunctions',
          data: {
            roleId :_this.data6[_this.index].id,
            functionIdStr:_this.functionIdStr.join(',')
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('设置成功!')
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取选中列表*/
      getSelectedNodes(data){
        this.functionIdStr=[];
        for(let i=0;i<data.length;i++){
          this.functionIdStr.push(data[i].id)
        }
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
