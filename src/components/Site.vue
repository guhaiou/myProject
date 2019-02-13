<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统设置</span>&gt;<span>添加站点</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入课程名字" v-model="name"  @on-change="search"  style="width: auto" />
      <Button type="primary" class="add" @click="add=true">添加站点</Button>
    </div>
    <div class="table-container" style="margin: 20px">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
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
      <p><span class="first-title">站点名称:</span><Input v-model="changeData.name" size="large" placeholder="站点名称" style="width: 200px" /></p>
      <p><span class="first-title">站点地点:</span><Input v-model="changeData.contactAddress " size="large" placeholder="站点地点" style="width: 200px" /></p>
      <p><span class="first-title">联系人:</span><Input v-model="changeData.contactPerson" size="large" placeholder="联系人" style="width: 200px" /></p>
      <p><span class="first-title">联系方式:</span><Input v-model="changeData.contactPhone " size="large" placeholder="联系方式" style="width: 200px" /></p>
      <p><span class="first-title">备注:</span><Input v-model="changeData.remark" size="large" placeholder="备注" style="width: 200px" /></p>
    </Modal>
    <!--添加站点-->
    <Modal class="change-modal"
           title="添加站点"
           v-model="add"
           @on-ok="sureAdd"
           @on-canncel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">站点名称:</span><Input v-model="addData.name" size="large" placeholder="站点名称" style="width: 200px" /></p>
      <p><span class="first-title">站点地点:</span><Input v-model="addData.contactAddress" size="large" placeholder="站点地点" style="width: 200px" /></p>
      <p><span class="first-title">联系人:</span><Input v-model="addData.contactPerson" size="large" placeholder="联系人" style="width: 200px" /></p>
      <p><span class="first-title">联系方式:</span><Input v-model="addData.contactPhone" size="large" placeholder="联系方式" style="width: 200px" /></p>
      <p><span class="first-title">备注:</span><Input v-model="addData.remark" size="large" placeholder="备注" style="width: 200px" /></p>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "Site",
        created() {
            this.$store.state.showBottomNav = false;
            this.$store.state.showLogin = true
            this.getList();
        },
        data(){
          return {
            name:'',
            index:'',
            searchName:'',
            changeMessage:false,
            pageSize:'',
            currentPage:1,
            add:false,
            addData:{
              name:'',
              contactAddress:'',
              contactPerson:'',
              contactPhone:'',
              remark:''
            },
            changeData:{
              name:'',
              contactAddress:'',
              contactPerson:'',
              contactPhone:'',
              remark:''
            },
            columns7: [
              {
                type: 'index',
                width: 60,
                align: 'center'
              },
              {
                title: '站点名称',
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
                title: '站点地址',
                key: 'contactAddress'
              },
              {
                title: '联系人',
                key: 'contactPerson',
              },
              {
                title: '联系方式',
                key: 'contactPhone',
              },
              {
                title: '备注',
                key: 'remark'
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
            data6: []
          }
        },
        methods:{
          /*添加*/
          sureAdd(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addBranch',
              data: {
                name  :_this.addData.name,
                categoryStrIds :'1,2,4,8,10',
                contactPerson :_this.addData.contactPerson,
                contactPhone  :_this.addData.contactPhone,
                contactAddress:_this.addData.contactAddress,
                remark:_this.addData.remark
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
            this.changeData.contactAddress=this.data6[index].contactAddress;
            this.changeData.contactPerson=this.data6[index].contactPerson;
            this.changeData.contactPhone=this.data6[index].contactPhone;
            this.changeData.remark=this.data6[index].remark;
          },
          /*确定修改*/
          sureChange(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/updateBranch',
              data: {
                id:_this.data6[_this.index].id,
                name  :_this.changeData.name,
                categoryStrIds :'1,2,4,8,10',
                contactPerson :_this.changeData.contactPerson,
                contactPhone  :_this.changeData.contactPhone,
                contactAddress:_this.changeData.contactAddress,
                remark:_this.changeData.remark
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectBranchsPage',
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
                  console.log(_this.data6.list)
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
                  url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/delBranch',
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
