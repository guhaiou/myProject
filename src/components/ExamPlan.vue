<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>报考计划</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="loginName"   @on-enter="search" placeholder="请输入学生登录账号" style="width: auto" />
      <div>
        <Button type="primary" class="add" @click="addMd">添加报考计划</Button>
        <Button type="primary" class="add" @click="upMd">批量导入</Button>
      </div>
    </div>
    <div style="margin: 20px">
      <table class="tb" id="myTable" cellspacing="0" cellpadding="0" border="0">
        <tr class="thead">
          <td>课程类型</td>
          <td>课程代码</td>
          <td>课程名称</td>
          <td>报考批次</td>
          <td>状态</td>
          <td style="width: 200px">操作</td>
        </tr>
        <tr class="tbody1" v-for="(item,index) in kernelCourse" v-if="kernelCourse.length!=0">
          <td v-if="index==0" :rowspan="kernelCourse.length">核心课程</td>
          <td>{{kernelCourse[index].curriculumCode}}</td>
          <td>{{kernelCourse[index].curriculumName}}</td>
          <td>{{kernelCourse[index].batchName}}</td>
          <td class="por">
            <p><span class="baokao"></span>{{kernelCourse[index].examinationStatus}}</p>
          </td>
          <td><Button type="primary" @click="changeHZ(index)">修改</Button><Button type="error" @click="deleteHZ(index)" style="margin-left: 10px">删除</Button></td>
        </tr>
        <tr class="tbody1" v-for="(item,index) in publicCourse" v-if="publicCourse.length!=0">
          <td v-if="index==0" :rowspan="publicCourse.length">公共课程</td>
          <td>{{publicCourse[index].curriculumCode}}</td>
          <td>{{publicCourse[index].curriculumName}}</td>
          <td>{{publicCourse[index].batchName}}</td>
          <td class="por">
            <p><span class="baokao"></span>{{publicCourse[index].examinationStatus}}</p>
          </td>
          <td><Button type="primary" @click="changeCM(index)">修改</Button><Button type="error" @click="deleteCM(index)" style="margin-left: 10px">删除</Button></td>
        </tr>
        <tr class="tbody1" v-for="(item,index) in selectCourse" v-if="selectCourse.length!=0">
          <td v-if="index==0" :rowspan="selectCourse.length">选考课程</td>
          <td>{{selectCourse[index].curriculumCode}}</td>
          <td>{{selectCourse[index].curriculumName}}</td>
          <td>{{selectCourse[index].batchName}}</td>
          <td class="por">
            <p><span class="baokao"></span>{{selectCourse[index].examinationStatus}}</p>
          </td>
          <td><Button type="primary" @click="changeXX(index)">修改</Button><Button type="error" @click="deleteXX(index)" style="margin-left: 10px">删除</Button></td>
        </tr>
      </table>
    </div>
    <!--添加报考计划-->
    <Modal class="change-modal"
           title="添加报考计划"
           v-model="add"
           width="800"
           @on-ok="sureAdd"
           @on-cancel="cancel"
           :mask-closable="false">
    <div style="display: flex;justify-content: space-around">
      <div><span>学生账号:</span><Input v-model="account" placeholder="学生账号" style="width: 200px;margin-left:5px"></Input></div>
      <div><span>类别:</span>
        <Select v-model="typeDefault" style="width:200px">
        <Option v-for="item in type" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      </div>
      <div><span>批次名称:</span>
        <Select v-model="batchDefault" style="width:200px;" :label-in-value="true" @on-change="select">
          <Option v-for="item in batch" :value="item.id" :key="item.name">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
      <div style="margin-top: 10px;display: inline-block"><span>报考状态:</span>
        <Select v-model="statusDefault" style="width:200px;margin-left:5px">
          <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 10px;display: inline-block" v-on:click="showCourse"><span>课程:</span>
        <span style="margin-left: 10px;display: inline-block;background-color:#2d8cf0;color: white;padding: 5px;border-radius:4px;cursor: pointer">选择课程</span>
      </div>
    </Modal>
    <!--修改报考计划-->
    <Modal class="change-modal"
           title="添加报考计划"
           v-model="change"
           width="800"
           @on-ok="changeOk"
           @on-cancel=""
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <div><span>学生账号:</span><Input v-model="changeData.changeAccount" placeholder="学生账号" disabled="" style="width: 200px;margin-left:5px"></Input></div>
        <div><span>类别:</span>
          <Select v-model="changeData.changeTypeDefault" style="width:200px">
            <Option v-for="item in type" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div><span>批次名称:</span>
          <Select v-model="changeData.changeBatchDefault" style="width:200px;" :label-in-value="true" @on-change="select">
            <Option v-for="item in batch" :value="item.id" :key="item.name">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div style="margin-top: 10px;display: inline-block"><span>报考状态:</span>
        <Select v-model="changeData.changeStatusDefault" style="width:200px;margin-left:5px">
          <Option v-for="item in status" :value="item.label" :key="item.label">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 10px;display: inline-block" v-on:click="showCourse"><span>课程:</span>
        <span style="margin-left: 10px;display: inline-block;background-color:#2d8cf0;color: white;padding: 5px;border-radius:4px;cursor: pointer">选择课程</span>
      </div>
    </Modal>
    <!--选择课程-->
    <Modal
      title="选择课程"
      v-model="courseMd"
      width="1000"
      :mask-closable="false">
      <RadioGroup   v-model="selectedCourseMd">
        <Radio   v-for="(item,index) in course" :label="item.id">{{item.name}}</Radio  >z
      </RadioGroup  >
    </Modal>
    <!--批量添加-->
    <Modal class="change-modal"
           title="批量导入学生"
           v-model="moreMd"
           @on-ok="allAdd"
           @on-cancel=""
           :mask-closable="false">
      <div style="margin: 10px 0"><span>选择批次:</span>
        <Select v-model="updata.batchId" style="width:200px;" :label-in-value="true" @on-change="select">
          <Option v-for="item in batch" :value="item.id" :key="item.name">{{ item.name }}</Option>
        </Select>
      </div>
      <Upload
        multiple
        type="drag"
        :action="actionUrl" ref="upload"  :on-error="handleError" :on-success="handleSuccess" :data="updata">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>学生批量导入</p>
        </div>
      </Upload>
      <a style="display: block" href="https://juwenjiaoyu-video.oss-cn-beijing.aliyuncs.com/exel/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">查看批量导入模板</a>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "ExamPlan",
    data(){
      return{
        updata:{file:'',batchId:''},
        actionUrl:'',
        account:'',
        moreMd:false,
        courseMd:false,
        add:false,
        change:false,
        selectedCourseMd:'',
        allCourse:'',
        typeDefault:'',
        typeDefaultName:'',
        type:[
          {name:'公众课程',id:1},
          {name:'核心课程',id:2},
          {name:'选考课程',id:3}
        ],
        batchDefault:'',
        batch:[],
        statusDefault:'',
        course:[],
        status:[
          {value:1, label:'已报考'},
          {value:2, label:'未报考'}
        ],
        publicCourse:[],
        kernelCourse:[],
        selectCourse:[],
        modal10:false,
        value:"",
        currentPage:1,
        loginName:'522121199307280214',
        dada6:[],
        changeData:{
          changeAccount:'',
          changeTypeDefault:'',
          changeBatchDefault:'',
          changeStatusDefault:'',
          id:''
        }
      }
    },
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getList();
    },
    mounted(){
    },
    methods:{
      /*搜索*/
      search(){
        this.getList();
      },
      /*获取课程列表*/
      getList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/selectExaminationPlanByLoginName',
          data: {
            pageIndex:_this.currentPage,
            loginName:_this.loginName
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.publicCourse=[];
              _this.kernelCourse=[];
              _this.selectCourse=[];
              for(let i=0;i<res.data.length;i++){
                if(res.data[i].type==1){
                  _this.publicCourse.push(res.data[i])
                 for(let j=0;j<_this.publicCourse.length;j++){
                   if(_this.publicCourse[j].examinationStatus==1){
                     _this.publicCourse[j].examinationStatus='已报考'
                   }
                   else if(_this.publicCourse[j].examinationStatus==2){
                     _this.publicCourse[j].examinationStatus='未报考'
                   }
                 }
                }
                if(res.data[i].type==2){
                  _this.kernelCourse.push(res.data[i])
                 for(let k=0;k<_this.kernelCourse.length;k++){
                   if(_this.kernelCourse[k].examinationStatus==1){
                     _this.kernelCourse[k].examinationStatus='已报考'
                   }
                   else if (_this.kernelCourse[k].examinationStatus==2){
                     _this.kernelCourse[k].examinationStatus='未报考'
                   }
                 }
                }
                if(res.data[i].type==3){
                  _this.selectCourse.push(res.data[i])
                  for(let z=0;z<_this.selectCourse.length;z++){
                    if(_this.selectCourse[z].examinationStatus==1){
                      _this.selectCourse[z].examinationStatus='已报考'
                    }
                    else if(_this.selectCourse[z].examinationStatus==2){
                      _this.selectCourse[z].examinationStatus='未报考'
                    }
                  }
                }
              }
              console.log(_this.kernelCourse)
              console.log(_this.publicCourse)
              console.log(_this.selectCourse)
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
        this.getBatchList();
      },
      /*显示课程弹框*/
      showCourse(){
        this.courseMd=true;
        this.getSetCourseList();
      },
      /*获取批次列表*/
      getBatchList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/system/selectBatchs',
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
              _this.batch=res.data;
              console.log( _this.batch)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取设置课程的课程列表*/
      getSetCourseList(index){
        this.index=index;
        this.courseMd=true;
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/data/selectExamPaperInfoCurriculum',
          data: {
            examPaperInfoId :1
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.course=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*确定添加*/
      sureAdd(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/addExaminationPlan',
          data: {
            loginName  :_this.account,
            curriculumId   :_this.selectedCourseMd,
            type:_this.typeDefault,
            batchId :_this.batchDefault,
            batchName  :_this.typeDefaultName,
            examinationStatus   :_this.statusDefault,
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
      /*批次*/
      select(e){
       this.typeDefaultName=e.label;
      },
      cancel(){
        this.$Message.info('取消添加!');
      },
      /*x修改核心课程*/
      changeHZ(index){
        this.change=true;
        this.getBatchList();
        this.changeData.changeBatchDefault=this.kernelCourse[index].batchId;
        this.changeData.changeTypeDefault=2;
        this.changeData.id=this.kernelCourse[index].id;
        this.changeData.changeAccount=this.kernelCourse[index].loginName;
        this.changeData.changeStatusDefault=this.kernelCourse[index].examinationStatus;
        this.selectedCourseMd=this.kernelCourse[index].curriculumId ;
      },
      /*修改公共课程*/
      changeCM(index){
        this.change=true;
        this.getBatchList();
        this.changeData.changeBatchDefault=this.publicCourse[index].batchId;
        this.changeData.changeTypeDefault=1;
        this.changeData.id=this.publicCourse[index].id;
        this.changeData.changeAccount=this.publicCourse[index].loginName;
        this.changeData.changeStatusDefault=this.publicCourse[index].examinationStatus;
        this.selectedCourseMd=this.publicCourse[index].curriculumId ;
      },
      /*修改选修课程*/
      changeXX(index){
        this.change=true;
        this.getBatchList();
        this.changeData.changeBatchDefault=this.selectCourse[index].batchId;
        this.changeData.changeTypeDefault=3;
        this.changeData.id=this.selectCourse[index].id;
        this.changeData.changeAccount=this.selectCourse[index].loginName;
        this.changeData.changeStatusDefault=this.selectCourse[index].examinationStatus;
        this.selectedCourseMd=this.selectCourse[index].curriculumId ;
      },
      /*确定修改*/
      changeOk(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var status='';
        if(_this.changeData.changeStatusDefault=='已报考'){
          status=1;
        }
        else{
          status=2
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/updateExaminationPlan',
          data: {
            id:_this.changeData.id,
            curriculumId:_this.selectedCourseMd,
            type   :_this.changeData.changeTypeDefault,
            batchId    :_this.changeData.changeBatchDefault,
            batchName     :_this.typeDefaultName,
            examinationStatus      :status,
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
      /*文件上传*/
      handleSuccess (res, file) {
        if(res.status==200){
          this.updata.file=res.data;
          alert('导入成功!')
        }
        else{
          alert('导入出错!')

        }

      },
      /*上传错误*/
      handleError ( event, file, fileList) {
        alert('上传错误!')
      },
      /*上传弹框*/
      upMd(){
        var userId=sessionStorage.getItem('userId');
        this.moreMd=true;
        this.getBatchList();
        this.actionUrl='http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/importExaminationPlanExcel';
      },
      /*确定批量添加*/
      allAdd(){

      },
      /*删除核心课*/
      deleteHZ(index){
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/delExaminationPlan',
              data: {
                id:_this.kernelCourse[index].id,
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
          onCancel: () => {
            this.$Message.info('取消删除!');
          }
        });
      },
      /*删除公共课*/
      deleteCM(index){
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/delExaminationPlan',
              data: {
                id:_this.publicCourse[index].id,
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
          onCancel: () => {
            this.$Message.info('取消删除!');
          }
        });
      },
      /*删除选修课*/
      deleteXX(index){
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/'+userId+'/teacher/delExaminationPlan',
              data: {
                id:_this.selectCourse[index].id,
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
          onCancel: () => {
            this.$Message.info('取消删除!');
          }
        });
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
  .tb{
    width: 100%;
    border: 1px solid #e8eaec;
    border-right: none;
    border-bottom: none;
  }
  .thead{
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
  }
  .thead td{
    background-color: #f8f8f9;
    padding: 10px;
  }
  td{
    border-right: 1px solid #e8eaec;
    padding: 10px;
  }
  .tbody1 td{
    border-bottom: 1px solid #e8eaec;
  }
</style>
