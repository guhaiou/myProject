<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>加分宝典</span>&gt;<span>APP版本列表</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入版本名称" style="width: auto;visibility:hidden" />
      <Button type="primary" class="add" @click="addMd">添加版本</Button>
    </div>
    <Table border :columns="columns7" :data="data6" style="margin: 20px"></Table>
    <div>
      <Page :total="pageSize"  show-total on-change="pageChange"/>
    </div>
    <!--添加课程-->
    <Modal class="change-modal"
           width="350"
           title="添加版本"
           v-model="add"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">客服端类型:</span>
        <Select v-model="defaultType" style="width:200px;margin-left: -3px">
          <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">描述:</span><Input v-model="addData.description" size="large" placeholder="描述" style="width: 200px" /></p>
      <p><span class="first-title">下载地址:</span><Input v-model="addData.downloadUrl" size="large" placeholder="下载地址" style="width: 200px" /></p>
      <p><span class="first-title">版本号:</span><Input v-model="addData.code" size="large" placeholder="版本号" style="width: 200px" /></p>
      <p><span class="first-title">更新状态:</span>
        <Select v-model="requestDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in request" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
    <!--修改课程-->
    <Modal class="change-modal"
           width="350"
           title="修改版本"
           v-model="changeMd"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <p><span class="first-title">客服端类型:</span>
        <Select v-model="defaultType" style="width:200px;margin-left: -3px">
          <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">描述:</span><Input v-model="changeData.description" size="large" placeholder="描述" style="width: 200px" /></p>
      <p><span class="first-title">下载地址:</span><Input v-model="changeData.downloadUrl" size="large" placeholder="下载地址" style="width: 200px" /></p>
      <p><span class="first-title">版本号:</span><Input v-model="changeData.code" size="large" placeholder="版本号" style="width: 200px" /></p>
      <p><span class="first-title">更新状态:</span>
        <Select v-model="requestDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in request" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "appUpdata",
        data(){
          return {
            add:false,
            changeMd:false,
            currentPage:1,
            defaultType:'',
            pageSize:'',
            index:1,
            columns7: [
              {
                title: '客服端类型',
                key: 'clientType',
                align:'center'
              },
              {
                title: '描述',
                key: 'description',
                align:'center'
              },
              {
                title: '下载地址',
                key: 'downloadUrl',
                align:'center'
              },
              {
                title: '版本号',
                key: 'code',
                align:'center'
              },
              {
                title: '是否强制更新',
                key: 'updateType',
                align:'center',
                render: (h, params) => {
                  let swiper=false;
                  if(params.row.updateType==1){
                    swiper=true
                  }
                  else{
                    swiper=false;
                  }
                  return h('div', [
                    h('i-switch', {
                        props: {
                          type: 'md-checkmark',
                          value:swiper,
                          disabled:true
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
                            innerHTML: '是'
                          }
                        }),
                        h('span', {
                          slot: 'close',
                          domProps: {
                            innerHTML: '否'
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
            type:[
              {name:'Android',value:1},
              {name:'Ios',value:2}
            ],
            request:[
              {name:'强制更新',value:'1'},
              {name:'不强制更新',value:'0'},
            ],
            data6: [
              {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park'
              },
              {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park'
              },
              {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park'
              },
              {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park'
              }
            ],
            addData:{
              clientType:'',
              description:'',
              downloadUrl:'',
              code:'',
              updateType:''
            },
            changeData:{
              clientType:'',
              description:'',
              downloadUrl:'',
              code:'',
              updateType:''
            },
            requestDefault:''
          }
        },
        created() {
            this.$store.state.showBottomNav = false;
            this.$store.state.showLogin = true;
            this.getList();
        },
      methods:{
       /*获取列表*/
       getList(){
         var token=sessionStorage.getItem('token');
         var userId=sessionStorage.getItem('userId');
         var _this=this;
         $.ajax({
           url: 'http://47.92.243.14:9000/api/user/'+userId+'/content/selectAppVersions',
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
               _this.data6=[];
               _this.pageSize=res.data.pageSize;
               for(let i=0;i<res.data.list.length;i++){
                 _this.data6.push(res.data.list[i])
                 if(res.data.list[i].clientType==1){
                   _this.data6[i].clientType='Android'
                 }
                 if(res.data.list[i].clientType==2){
                   _this.data6[i].clientType='Ios'
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
       /*添加弹框*/
        addMd(){
         this.add=true;
         this.defaultType='';
        },
        /*确定添加*/
        sureAdd(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://47.92.243.14:9000/api/user/'+userId+'/content/addAppVersion',
            data: {
              code :_this.addData.code,
              description:_this.addData.description,
              clientType:_this.defaultType,
              downloadUrl :_this.addData.downloadUrl,
              updateType  :_this.requestDefault,
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
        /*是否强制更新*/
        forbidden(value,index){

        },
        /*修改*/
        change(index){
          this.index=index;
          this.changeMd=true;
         if(  this.data6[index].clientType=='Android'){
           this.defaultType=1;
         }
          else if(  this.data6[index].clientType=='Ios'){
            this.defaultType=2;
          }
          this.changeData.description=this.data6[index].description;
          this.changeData.downloadUrl=this.data6[index].downloadUrl;
          this.changeData.code=this.data6[index].code;
          this.requestDefault=this.data6[index].updateType;
        },
        /*确定修改*/
        sureChange(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://47.92.243.14:9000/api/user/'+userId+'/content/updateAppVersion',
            data: {
              id:_this.data6[_this.index].id,
              code :_this.changeData.code,
              description:_this.changeData.description,
              clientType:_this.defaultType,
              downloadUrl :_this.changeData.downloadUrl,
              updateType  :_this.requestDefault,
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
        /*取消修改*/
        cancelChange(){
          this.$Message.info('修改失败!')
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
                url: 'http://47.92.243.14:9000/api/user/'+userId+'/content/delAppVersion',
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
  .change-modal span{
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    cursor: pointer;
  }
  .change-modal p{
    margin-bottom: 10px;
  }
</style>
