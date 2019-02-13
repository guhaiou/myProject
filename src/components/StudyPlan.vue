<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>学习计划</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="loginName"   @on-enter="search" placeholder="请输入学生登录账号" style="width: auto" />
      <div style="display: inline-block">
        <Button type="primary" class="add" @click="addMd">添加学习计划</Button>
        <Button type="primary" class="add" @click="upMd">批量导入</Button>
      </div>
    </div>
    <div style="margin: 20px">
      <table class="tb" id="myTable" cellspacing="0" cellpadding="0" border="0">
        <tr class="thead">
          <td style="width: 100px">课程类型</td>
          <td style="width: 130px">课程代码</td>
          <td style="width: 200px">课程名称</td>
          <td>复习指南一</td>
          <td>复习指南二</td>
          <td>复习指南三</td>
          <td style="width: 200px">操作</td>
        </tr>
        <tr class="tbody1" v-for="(item,index) in kernelCourse" v-if="kernelCourse.length!=0">
          <td v-if="index==0" :rowspan="kernelCourse.length">核心课程</td>
          <td>{{kernelCourse[index].curriculumCode}}</td>
          <td>{{kernelCourse[index].curriculumName}}</td>
          <td>{{kernelCourse[index].reviewOne}}</td>
          <td>{{kernelCourse[index].reviewTwo}}</td>
          <td>{{kernelCourse[index].reviewThree}}</td>
          <td><Button type="primary" @click="changeHZ(index)">修改</Button><Button @click="deleteHX(index)" type="error" style="margin-left: 10px">删除</Button></td>
        </tr>
        <tr class="tbody1" v-for="(item,index) in selectCourse" v-if="selectCourse.length!=0">
          <td v-if="index==0" :rowspan="selectCourse.length">选考课程</td>
          <td>{{selectCourse[index].curriculumCode}}</td>
          <td>{{selectCourse[index].curriculumName}}</td>
          <td>{{selectCourse[index].reviewOne}}</td>
          <td>{{selectCourse[index].reviewTwo}}</td>
          <td>{{selectCourse[index].reviewThree}}</td>
          <td><Button type="primary" @click="changeXX(index)">修改</Button><Button @click="deleteXX(index)" type="error" style="margin-left: 10px">删除</Button></td>
        </tr>
      </table>
    </div>
    <!--添加报考计划-->
    <Modal class="change-modal"
           title="添加报考计划"
           v-model="add"
           width="570"
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
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="zn[0].zn1" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南一" />
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="zn[1].zn2" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南二" />
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="zn[2].zn3" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南三" />
      </div>
      <div style="margin-top: 10px;margin-left:11px" v-on:click="showCourse"><span>课程:</span>
        <span style="margin-left: 10px;display: inline-block;background-color:#2d8cf0;color: white;padding: 5px;border-radius:4px;cursor: pointer">选择课程</span>
      </div>
    </Modal>
    <!--修改报考计划-->
    <Modal class="change-modal"
           title="修改报考计划"
           v-model="change"
           width="570"
           @on-ok="changeOk"
           @on-cancel=""
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <div><span>学生账号:</span><Input v-model="changeData.changeAccount" placeholder="学生账号" style="width: 200px;margin-left:5px" disabled></Input></div>
        <div><span>类别:</span>
          <Select v-model="changeData.type" style="width:200px">
            <Option v-for="item in type" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="changeData.reviewOne" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南一" />
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="changeData.reviewTwo" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南二" />
      </div>
      <div style="margin-top: 10px;margin-left:11px"><span>复习指南一:</span>
        <Input v-model="changeData.reviewThree" type="textarea" style="display: inline-block;width: 446px;" placeholder="复习指南三" />
      </div>
      <div style="margin-top: 10px;margin-left:11px" v-on:click="showCourse"><span>课程:</span>
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
           title="批量导入学生学习计划"
           v-model="moreMd"
           @on-ok="allAdd"
           @on-cancel=""
           :mask-closable="false">
      <div style="margin: 10px 0"><span>学生账号:</span>
        <Input v-model="updata.loginName"  style="display: inline-block;width:200px;" placeholder="学生账号" />
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
        updata:{file:'',loginName:''},
        actionUrl:'',
        moreMd:false,
        account:'',
        courseMd:false,
        add:false,
        change:false,
        selectedCourseMd:'',
        allCourse:'',
        typeDefault:'',
        typeDefaultName:'',
        studentName:'',
        type:[
          {name:'必考课程',id:1},
          {name:'选考课程',id:2}
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
        loginName:'430822199312231936',
        dada6:[],
        changeData:{
          changeAccount:'',
          reviewOne:'',
          reviewTwo:'',
          reviewThree:'',
          id:'',
          type:'',
          curriculumId:''
        },
        zn:[
          {zn1:''},
          {zn2:''},
          {zn3:''}
        ]
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudyPlansByLoginName',
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
                  _this.kernelCourse.push(res.data[i])
                  for(let k=0;k<_this.kernelCourse.length;k++){
                    if(_this.kernelCourse[k].examinationStatus==1){
                      _this.kernelCourse[k].examinationStatus='已报考'
                    }
                    else{
                      _this.kernelCourse[k].examinationStatus='未报考'
                    }
                  }
                }
                if(res.data[i].type==2){
                  _this.selectCourse.push(res.data[i])
                  for(let z=0;z<_this.selectCourse.length;z++){
                    if(_this.selectCourse[z].examinationStatus==1){
                      _this.selectCourse[z].examinationStatus='已报考'
                    }
                    else{
                      _this.selectCourse[z].examinationStatus='未报考'
                    }
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamPaperInfoCurriculum',
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/addStudyPlan',
          data: {
            loginName  :_this.account,
            curriculumId   :_this.selectedCourseMd,
            type:_this.typeDefault,
            reviewOne:_this.zn[0].zn1,
            reviewTwo:_this.zn[1].zn2,
            reviewThree:_this.zn[2].zn3,
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
        this.changeData.changeAccount=this.kernelCourse[index].loginName;
        this.changeData.reviewOne=this.kernelCourse[index].reviewOne;
        this.changeData.reviewTwo=this.kernelCourse[index].reviewTwo;
        this.changeData.reviewThree=this.kernelCourse[index].reviewThree;
        this.changeData.type=this.kernelCourse[index].type;
        this.selectedCourseMd=this.kernelCourse[index].curriculumId;
        this.changeData.id=this.kernelCourse[index].id;
      },
      /*修改选修课程*/
      changeXX(index){
        this.change=true;
        this.changeData.changeAccount=this.selectCourse[index].loginName;
        this.changeData.reviewOne=this.selectCourse[index].reviewOne;
        this.changeData.reviewTwo=this.selectCourse[index].reviewTwo;
        this.changeData.reviewThree=this.selectCourse[index].reviewThree;
        this.changeData.type=this.selectCourse[index].type;
        this.selectedCourseMd=this.selectCourse[index].curriculumId;
        this.changeData.id=this.selectCourse[index].id;
      },
      /*确定修改*/
      changeOk(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/updateStudyPlan',
          data: {
            studyPlanId:_this.changeData.id,
            curriculumId:_this.selectedCourseMd,
            type:_this.changeData.type,
            reviewOne:_this.changeData.reviewOne,
            reviewTwo:_this.changeData.reviewTwo,
            reviewThree:_this.changeData.reviewThree,
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
      /*删除核心课*/
      deleteHX(index){
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/delStudyPlan',
              data: {
                studyPlanId:_this.kernelCourse[index].id,
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/delStudyPlan',
              data: {
                studyPlanId:_this.selectCourse[index].id,
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
      /*文件上传*/
      handleSuccess (res, file) {
        if(res.status==200){
          this.updata.file=res.data;
          alert('导入成功!');
          this.getList();
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
        this.actionUrl='http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/importStudyPlanExcel';
      },
      /*确定批量添加*/
      allAdd(){

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
