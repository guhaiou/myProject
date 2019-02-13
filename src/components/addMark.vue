<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>加分宝典</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入资料名称" v-model="name" @on-change="search"  style="width: auto" />
      <Button type="primary" class="add" @click="modal1=true">添加资料</Button>
    </div>
    <Table border :columns="columns7" :data="data6" style="margin: 20px"></Table>
    <div class="page">
      <Page :total="pageSize" show-elevator show-total="" />
    </div>
    <!--添加文件-->
    <Modal
      class="change-modal"
      v-model="modal1"
      title="添加资料"
      @on-ok="add"
      @on-cancel="addCancel" >
      <p><span class="first-title">资料名称:</span><Input v-model="addData.fileName" size="large" placeholder="资料名称" style="width: 200px" /></p>
      <p>
        <Upload :action="actionUrl" ref="upload"  :on-progress="handleProgress" :on-success="handleSuccess" :data="type" style="display: inline-block;margin-left: 20px;">
        <Button icon="ios-cloud-upload-outline" style="width:260px">上传文件</Button>
      </Upload></p>
    </Modal>
    <!--专业选择-->
    <Modal
      title="专业"
      v-model="profession"
      width="1000"
      @on-ok="setP"
      @on-cancel="setCancel"
      :mask-closable="false">
      <CheckboxGroup v-model="checkAllGroup">
        <Checkbox v-for="item in professionList" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
    <!--课程选择-->
    <Modal
      title="课程"
      v-model="courseMd"
      width="1000"
      @on-ok="setC"
      @on-cancel="setCancel"
      :mask-closable="false">
      <CheckboxGroup v-model="selectedcourse">
        <Checkbox v-for="item in course" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "addMark",
        data(){
            return {
              profession:false,
              professionList:[],
              selectedcourse:[],
              checkAllGroup: [],
              course:'',
              courseMd:false,
              actionUrl:'',
              uploadList:'',
              defaultList:'',
              type:{type:1},
              userId:'',
              modal1:false,
              name:"",
              currentPage:1,
              pageSize:'',
              paperList:[],
              columns7: [
                {
                  type: 'index',
                  width: 60,
                  align: 'center'
                },
                {
                  title: '资料名称',
                  key: 'name',
                  render: (h, params) => {
                    return h('div', [
                      h('Icon', {
                        props: {
                          type: 'person'
                        }
                      }),
                      h('strong', params.row.fileName)
                    ]);
                  }
                },
                {
                  title: '下载地址',
                  key: 'filePath'
                },
                {
                  title: '排序',
                  key: 'listOrder'
                },
                {
                  title: 'Action',
                  key: 'action',
                  width: 350,
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
                            this.showProfession(params.index)
                          }
                        }
                      }, '设置专业'),
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
                            this.getSetCourseList(params.index)
                          }
                        }
                      }, '设置课程'),
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
              data6: [],
              addData:{
                fileName :'',
                filePath  :'',
                systemStudentFileDataTypeId:'2',
                fileDescription :'',
                listOrder  :'',

              }
            }
        },
        created() {
          this.$store.state.showBottomNav = false,
            this.$store.state.showLogin = true,
            this.getPaperList();
        },
          methods:{
            cancel () {
              this.$Message.info('上传失败!');
            },
            /*获取资料列表*/
            getPaperList(){
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              this.actionUrl='http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/common/upload';
              var _this=this;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSystemStudentFileDatas',
                data: {
                  pageIndex :_this.currentPage

                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'GET',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
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
            /*分页*/
            pageChange(page){
              this.currentPage=page;
              this.getPaperList();
            },
            /*添加资料弹框*/
            add(){
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              var _this=this;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addSystemStudentFileData',
                data: {
                  fileName:_this.addData.fileName,
                  filePath:_this.addData.filePath,
                  fileDescription:_this.addData.fileName,
                  systemStudentFileDataTypeId :_this.addData.systemStudentFileDataTypeId ,
                  listOrder:0,

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
                    _this.getPaperList();
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            },
            /*取消添加*/
            addCancel(){
              this.$Message.info('取消添加!');
            },
            handleSuccess (res, file) {
              this.addData.filePath=res.data;
            },
            handleProgress ( event, file, fileList) {
                var type=file.name.substring(file.name.length-3)
                if(type=='png'||type=='jpg'){
                  this.type.type=1;
                }
              if(type=='pdf'){
                this.type.type=2;
              }
              if(type=='ord'){
                this.type.type=3;
              }
              if(type=='doc'){
                this.type.type=3;
              }

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
                    url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delSystemStudentFileData',
                    data: {
                      id  :_this.data6[index].id,
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
                        _this.getPaperList();
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
            /*显示专业弹框*/
            showProfession(index){
              this.profession=true;
              this.index=index;
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              var _this=this;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectFileDataProfession',
                data: {
                  systemStudentFileDataId:_this.data6[index].id
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'GET',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.checkAllGroup=[];
                    _this.professionList=[];
                    _this.professionList=res.data;
                    for(var i=0;i<res.data.length;i++){
                      if(res.data[i].isSelect==1){
                        _this.checkAllGroup.push(res.data[i].id)
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
            /*设置专业*/
            setP(index){
              var _this=this;
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setSystemStudentFileDataProfession',
                data: {
                  systemStudentFileDataId :_this.data6[_this.index].id,
                  professionStrIds :_this.checkAllGroup.join(','),
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'POST',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.$Message.info('设置专业成功!');
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            },
            /*设置失败*/
            setCancel(){
              this.$Message.info('设置失败!');
            },
            /*获取设置课程的课程列表*/
            getSetCourseList(index){
              this.courseMd=true;
              var _this=this;
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              _this.index=index;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectFileDataCurriculum',
                data: {
                  systemStudentFileDataId  :_this.data6[index].id
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'GET',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.selectedcourse=[];
                    _this.course=res.data;
                    for(var i=0;i<res.data.length;i++){
                      if(res.data[i].isSelect==1){
                        _this.selectedcourse.push(res.data[i].id)
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
            /*设置课程*/
            setC(){
              var _this=this;
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setSystemStudentFileDataCurriculum',
                data: {
                  curriculumStrIds :_this.selectedcourse.join(','),
                  systemStudentFileDataId:_this.data6[_this.index].id
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'POST',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.$Message.info('设置课程成功!');
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
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSystemStudentFileDatas',
                data: {
                  pageIndex :1,
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

  /*专业课程选择部分*/
  .tab-top{
    display: flex;
    border-bottom: 1px dashed #dcdcdc;
    padding: 0px 0 5px 0;

  }
  .tab-container{
    border:1px solid #dcdcdc;
    margin: 20px;
    padding: 10px 10px 0 10px;
  }
  .tab-container .tip{
    display:block;
    width:100px;
    padding: 5px 10px;
  }
  .profession-container{
    display: inline-block;
    list-style: none;
    margin-left: 5px;
    width:100%;
  }
  .profession-container>div{
    float: left;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .profession-container>div:hover{
    background-color: #2d8cf0;
    color: white;
    border-radius: 3px;
  }
  .profession-container>div:nth-child(1){
    background-color: #2d8cf0;
    color: white;
    border-radius: 3px;
  }
  .tab-button{
    border: none!important;
    margin-top: 10px!important;
    padding-bottom: 0;
  }
  .tab-type{
    margin: 20px;
  }
  .first-title{
    display: inline-block;
    margin:0 10px;
    width: 60px;
    text-align: right;
  }
  .theHead{
    font-weight: bold;
    background-color: #2d8cf0;
    padding: 10px 0;
    margin:0 20px;
    color: white;
  }
  .list{
    margin: 0 20px;
    list-style: none;
  }
  .list li{
    line-height: 30px;
    padding: 10px 0;
    border-bottom: 1px dashed #e8eaec;;
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
</style>
