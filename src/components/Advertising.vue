<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统管理</span>&gt;<span>轮播图片管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入类别名字" style="width: auto;visibility: hidden" />
      <Button type="primary" class="add"  v-on:click="addMd=true">添加图片</Button>
    </div>
    <Table border :columns="columns1" :data="data1" style="margin: 20px" on-change="pageChange"></Table>
    <!--分页-->
    <div class="page">
      <Page :total="4" show-total show-elevator />
    </div>
    <!--添加图片-->
    <Modal class="change-modal"
           title="添加图片"
           v-model="addMd"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">图片名称:</span><Input v-model="addData.advName" size="large" placeholder="图片名称" style="width: 200px" /></p>
      <p><span class="first-title">缩虐图:</span><Input v-model="addData.advPic" size="large" placeholder="缩虐图" style="width: 200px" /></p>
      <p><span class="first-title">描述:</span><Input v-model="addData.advDesc" size="large" placeholder="描述" style="width: 200px" /></p>
      <p><span class="first-title">广告位置:</span>
        <Select v-model="addData.advPlace" style="width:200px;margin-left: -3px">
          <Option v-for="item in location" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">广告外链:</span><Input v-model="addData.advUrl" size="large" placeholder="广告外链" style="width: 200px" /></p>
      <p><span class="first-title">排序:</span><Input v-model="addData.listOrder" size="large" placeholder="排序" style="width: 200px" /></p>
    </Modal>
    <!--修改图片-->
    <Modal class="change-modal"
           title="修改图片"
           v-model="changeMd"
           width="350"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <p><span class="first-title">图片名称:</span><Input v-model="changeData.advName" size="large" placeholder="图片名称" style="width: 200px" /></p>
      <p><span class="first-title">缩虐图:</span><Input v-model="changeData.advPic" size="large" placeholder="缩虐图" style="width: 200px" /></p>
      <p><span class="first-title">描述:</span><Input v-model="changeData.advDesc" size="large" placeholder="描述" style="width: 200px" /></p>
      <p><span class="first-title">广告位置:</span>
        <Select v-model="changeData.advPlace" style="width:200px;margin-left: -3px">
          <Option v-for="item in location" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">广告外链:</span><Input v-model="changeData.advUrl" size="large" placeholder="广告外链" style="width: 200px" /></p>
      <p><span class="first-title">排序:</span><Input v-model="changeData.listOrder" size="large" placeholder="排序" style="width: 200px" /></p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "Advertising",
    created() {
        this.$store.state.showBottomNav = false;
        this.$store.state.showLogin = true;
        this. getList();
    },
    data(){
      return {
        index:'',
        currentPage:1,
        addMd:false,
        changeMd:false,
        defaultLocation:'',
        location:[
          {name:'PC',value:0},
          {name:'APP',value:1}
        ],
        addData:{
          advName :'',
          advPic :'',
          advDesc :'',
          advPlace:'',
          advUrl:'',
          listOrder:''
        },
        changeData:{
          advName :'',
          advPic :'',
          advDesc :'',
          advPlace:'',
          advUrl:'',
          listOrder:''
        },
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '广告名称',
            key: 'advName',
            align:"center",
          },
          {
            title: '缩略图',
            key: 'advPic',
            align:"center",
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.advPic
                  },
                  style: {
                    width: '40%',
                    position:'relative',
                    top:'2px'
                  }
                }),
              ]);
            }
          },
          {
            title: '描述 ',
            key: 'advDesc',
            align:"center",
          },
          {
            title: '广告位置 ',
            align: 'center',
            key: 'advPlace'
          },
          {
            title: '广告外链 ',
            align: 'center',
            key: 'advUrl'
          },
          {
            title: '排序 ',
            align: 'center',
            key: 'listOrder'
          },
          {
            title: '操作',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style:{
                    marginRight:'5px'
                  },
                  on: {
                    click: () => {
                      this.changeModal(params.index)
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
                }, '删除'),
              ]);
            }
          }
        ],
        data1: [],
      }
    },
    methods:{
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/delAdvertisements',
              data: {
                id :_this.data1[index].id,
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'POST',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.$Message.info('删除成功!');
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
      /*添加模块*/
      sureAdd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        var advPlace;
        if(_this.addData.advPlace=='PC'){
          advPlace=0;
        }
        else{
          advPlace=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/addAdvertisement',
          data: {
            advName :_this.addData.advName,
            advPic  :_this.addData.advPic,
            advDesc :_this.addData.advDesc,
            advType :0,
            advPlace:advPlace,
            advUrl  :_this.addData.advUrl,
            listOrder:_this.addData.listOrder,
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('添加成功!');
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
        this.$Message.info('添加失败!');
      },
      /*修改弹框*/
      changeModal(index){
        this.changeMd=true;
        this.index=index;
        this.changeData.advName=this.data1[index].advName;
        this.changeData.advPic=this.data1[index].advPic;
        this.changeData.advDesc=this.data1[index].advDesc;
        this.changeData.advPlace=this.data1[index].advPlace;
        this.changeData.advUrl=this.data1[index].advUrl;
        this.changeData.listOrder=this.data1[index].listOrder;
      },
      /*修改信息*/
      sureChange(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        var advPlace;
        if(_this.changeData.advPlace=='PC'){
          advPlace=0;
        }
        else{
          advPlace=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/updateAdvertisements',
          data: {
            id :_this.data1[_this.index].id,
            advName :_this.changeData.advName,
            advPic  :_this.changeData.advPic,
            advDesc :_this.changeData.advDesc,
            advType :0,
            advPlace:advPlace,
            advUrl  :_this.changeData.advUrl,
            listOrder:_this.changeData.listOrder,
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
        this.$Message.info('修改失败!');
      },
      /*获取列表*/
      getList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/selectAdvertisements',
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
                _this.data1.push(res.data.list[i])
                if(res.data.list[i].advPlace==0){
                  _this.data1[i].advPlace='PC'
                }
                else{
                  _this.data1[i].advPlace='APP'
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
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getList();
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
  .table-container{
    padding: 0 20px;
  }
  .pnote{
    margin-top: 30px;
  }
  .first-title{
    display: inline-block;
    margin:0 10px;
    width: 60px;
    text-align: right;
  }
  .change-modal p{
    margin-bottom: 10px;
  }
  .pd{
    margin: 20px;
  }
</style>
