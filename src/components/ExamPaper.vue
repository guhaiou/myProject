<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>真题列表</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入试卷名称" style="width: auto" />
      <Button type="primary" class="add" @click="add">添加真题</Button>
    </div>
    <ul class="point-container">
      <li v-for="(item,index) in paperList"><div><span style="display: inline-block;line-height: 40px;position: relative;top: -13px">{{index+1}}、</span><p class="title" v-bind:title="item.title">{{item.title}}</p></div><div class="bt_container"><Button @click="Delete(item.id)" type="primary" ghost>删除试卷</Button> <Button @click="changeModal(index)"  type="primary" ghost>编辑试卷</Button><Button @click="comeToText(index)" type="info" ghost>题目管理</Button><Button @click="getSetCourseList(index)"  type="info" ghost>课程设置</Button><Button @click="getSetProfessionList(index)" type="info" ghost>专业设置</Button><Button @click="comeToType(index)"  type="info" ghost>题型管理</Button></div></li>
    </ul>
    <div class="page">
      <Page :total="pageSize" show-elevator show-total="" @on-change="pageChange" />
    </div>
    <!--添加真题-->
    <Modal
      class="addMd"
      v-model="examination"
      title="添加真题"
      @on-ok="ok"
      @on-cancel="cancel">
      <p><span class="first-title">试卷名称:</span><Input v-model="addData.title"  size="large" placeholder="试卷名称" style="width: 380px" /></p>
      <p><span class="first-title">试卷总分:</span><Input v-model="addData.examTotalScore"   size="large" placeholder="试卷总分" style="width: 380px" /></p>
      <p><span class="first-title">及格分数:</span><Input v-model="addData.examPassScore"   size="large" placeholder="及格分数" style="width: 380px" /></p>
    </Modal>
    <!--添加章节-->
    <Modal
      width='800px'
      class="addMd"
      v-model="addChapter"
      title="章节列表"
      @on-ok="ok"
      @on-cancel="cancel">
      <ul class="chapterList">
        <li><p> <Input style="width: 300px" v-model="addChapterData" size="large" placeholder="章节名称" /></p></li>
      </ul>
    </Modal>
    <!--修改章节-->
    <Modal
      width='800px'
      class="addMd"
      v-model="changeChapter"
      title="章节列表"
      @on-ok="ok"
      @on-cancel="cancel">
      <ul class="chapterList">
        <li><p> <Input :disabled="isChange" style="width: 300px" v-model="chapterContent1" size="large" placeholder="large size" /></p><div class="btContainer"><Button class="chapterBt" type="primary" @click="change" ghost>修改</Button><Button class="chapterBt" type="error" ghost>删除</Button></div></li>
        <li><p><Input :disabled="isChange" style="width: 300px" v-model="chapterContent2" size="large" placeholder="large size" /></p><div class="btContainer"><Button class="chapterBt" type="primary" ghost>修改</Button><Button class="chapterBt" type="error" ghost>删除</Button></div></li>
      </ul>
    </Modal>
    <!--专业选择-->
    <Modal
      title="专业"
      v-model="profession"
      width="1000"
      @on-ok="sureSelect"
      @on-cancel="cancelSelect"
      :mask-closable="false">
      <CheckboxGroup v-model="setedProfession" @on-change="checkAllGroupChange">
        <Checkbox v-for="item in setProfession" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
    <!--课程选择-->
    <Modal
      title="课程"
      v-model="courseMd"
      width="1000"
      @on-ok="setC"
      @on-cancel="cancelSelect"
      :mask-closable="false">
      <CheckboxGroup v-model="selectedCourse">
        <Checkbox v-for="item in course" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
    <!--编辑真题-->
    <Modal
      class="addMd"
      v-model="changeMd"
      title="编辑试卷"
      @on-ok="sureChange"
      @on-cancel="cancel">
      <p><span class="first-title">试卷名称:</span><Input v-model="changeData.title"  size="large" placeholder="试卷名称" style="width: 380px" /></p>
      <p><span class="first-title">试卷总分:</span><Input v-model="changeData.examTotalScore"   size="large" placeholder="试卷总分" style="width: 380px" /></p>
      <p><span class="first-title">及格分数:</span><Input v-model="changeData.examPassScore"   size="large" placeholder="及格分数" style="width: 380px" /></p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "ExamPaper",
    data(){
      return{
        index:'',
        examination:false,
        indeterminate:false,
        selectType:'',
        checkAll:false,
        checkAllGroup: [],
        profession:false,
        professionList:[
          '交通土建',
          '工程造价',
          '人力资源',
          '会计',
          '工程财务管理'
        ],
        courseMd:false,//课程
        selectedCourse:[],
        course:[],//课程列表
        checkAllGroup2: [
          {
            typeId:1,
            typeName:'交通土建',
            checkAll: false,
            indeterminate: false,
            allSelect:[],
            typeList:[
              '中国近代史',
              '马克思社会主义理论',
              '会计制度'
            ]
          },
          {
            typeId:2,
            typeName:'工程造价',
            checkAll: false,
            indeterminate: false,
            allSelect:[],
            typeList:[
              '中国近代史',
              '马克思社会主义理论',
              '会计制度'
            ]
          }
        ],
        currentPage:1,//当前分页数
        pageSize:'',
        changeChapter:false,
        addChapter:false,
        isChange:true,
        addChapterData:'',
        chapterContent1:'第一章 绪论',
        chapterContent2:'第二章 了解购买者行为规律',
        typeList:[
          {value:'湖南自考',label:'湖南自考'},
          {value:'海南自考',label:'海南自考'},
          {value:'成考',label:'成考'},
        ],
        changeMd:false,//编辑弹框
        paperList:[],
        addData:{
          title:'',
          examTotalScore:'',
          examPassScore:''
        },
        changeData:{
          title:'',
          examTotalScore:'',
          examPassScore:''
        },
        setedProfession:[],
        setProfession:[]
      }
    },
    created() {
        this.$store.state.showBottomNav = false,
        this.$store.state.showLogin = true
        this.getPaperList()
    },
    methods:{
      /*添加考纲*/
      add(){
        this.examination=true;
      },
      /*确定添加*/
      ok () {
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamPaperInfo',
          data: {
            title :_this.addData.title,
            examMinutes :120,
            examTotalScore:_this.addData.examTotalScore,
            examPassScore:_this.addData.examPassScore  ,
            type:1,
            descriptions:_this.addData.title,

          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('添加成功！');
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
      cancel () {
        this.$Message.info('添加失败，请重新添加!');
      },
      /*添加章节*/
      lookChapter(){
        this.changeChapter=true;
      },
      /*添加章节*/
      change(){
        this.isChange=false;
      },
      /*添加章节*/
      addChapters(){
        this.addChapter=true;
      },
      comeToText(index){
        localStorage.setItem("paperId",this.paperList[index].id);
        this.$router.push({ name:'ExamPaperList'});
      },
      /*专业全选*/
      handleCheckAll (index) {
        if (this.indeterminate) {
          this.checkAll = true;
        } else {
          this.checkAll = !this.checkAll;
        }
        if (this.checkAll) {
          this.checkAllGroup = this.professionList;
        }else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length ===this.professionList.length) {
          this.indeterminate = true;
          this.checkAll = true;
        }
      },
      showProfession(index){
        this.profession=true;
      },
      /*选择课程*/
      showCourseModal(){
        this.courseShow=true;
      },
      /*课程全选*/
      handleCheckAll2 (index) {
        if (this.checkAllGroup2[index].indeterminate) {
          this.checkAllGroup2[index].checkAll = true;
        } else {
          this.checkAllGroup2[index].checkAll = !this.checkAllGroup2[index].checkAll;
        }
        if (this.checkAllGroup2[index].checkAll) {
          this.checkAllGroup2[index].allSelect =this.checkAllGroup2[index].typeList;
        } else {
          this.checkAllGroup2[index].allSelect=[]
        }
      },
      /*编辑弹框*/
      changeModal(index){
        this.index=index;
        this.changeMd=true;
        this.changeData.title=this.paperList[index].title;
        this.changeData.examTotalScore=this.paperList[index].examTotalScore;
        this.changeData.examPassScore=this.paperList[index].examPassScore;

      },
      /*确定编辑*/
      sureChange(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        var pageIndex=_this.currentPage;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamPaperInfo',
          data: {
            id  :_this.paperList[_this.index].id,
            title:_this.changeData.title,
            examTotalScore :_this.changeData.examTotalScore ,
            examPassScore  :_this.changeData.examPassScore  ,
            descriptions   :_this.changeData.title  ,
            examMinutes:120,
            type :1,

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
              _this.getPaperList();

            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*删除课程*/
      Delete(id) {
        this.$Modal.confirm({
          title: '删除试卷',
          content: '<p>是否确定删除试卷？</p>',
          onOk: () => {
            this.$Message.info('删除成功!');
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamPaperInfo',
              data: {
                id:id,
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
            this.$Message.info('删除失败!');
          }
        });
      },
      /*真题列表*/
      getPaperList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamPaperInfos',
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
              _this.paperList=[];
              _this.paperList=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取设置专业的专业列表*/
      getSetProfessionList(index){
        this.profession=true;
        this.index=index;
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamPaperInfoProfession',
          data: {
            examPaperInfoId :_this.paperList[index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.setedProfession=[];
              _this.setProfession=res.data;
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.setedProfession.push(res.data[i].id)
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
      sureSelect(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setExamPaperInfoProfession',
          data: {
            examPaperInfoId  :_this.paperList[_this.index].id,
            professionStrIds:_this.setedProfession.join(',')
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('设置成功!');
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消设置*/
      cancelSelect(){
        this.$Message.info('设置失败!');
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
            examPaperInfoId :_this.paperList[index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.selectedCourse=[];
              _this.course=res.data;
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.selectedCourse.push(res.data[i].id)
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setExamPaperInfoCurriculum',
          data: {
            curriculumStrIds    :_this.selectedCourse.join(','),
            examPaperInfoId  :_this.paperList[_this.index].id
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
      comeToType(index){
        localStorage.setItem("paperId",this.paperList[index].id);
        this.$router.push({ name:'questionType'});
      },
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getPaperList();
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
  .bt_container button{
    float: right;
    display: block;
    margin-left: 10px;
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
  .point-container li{
    display: flex;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    margin: 5px 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #e8eaec;
  }
  .point-container li p{
    display: inline-block;
  }
  .point-container span{
    display: inline-block;
    margin-right: 5px;

  }
  .bt{
    position: absolute;
    right:100px;
  }
  .bt1{
    position: absolute;
    right:200px;
  }
  .bt2{
    position: absolute;
    right:300px;
  }
  .bt3{
    position: absolute;
    right:0;
  }
  .bt4{
    position: absolute;
    right:400px;
  }
  .first-title{
    display: inline-block;
    margin:0 10px;
    width: 60px;
    text-align: right;
  }
  .addMd p{
    margin-bottom: 10px;
  }
  .select{
    position: relative;
    left: -3px;
  }
  .chapterList li{
    display: flex;
    justify-content: space-between;
    height:50px;
  }
  .chapterList li p{
    position: relative;
    top: 8px;
  }
  .chapterBt{
    display: block;
    margin-left: 10px;
    margin-top: 10px;
  }
  .btContainer{
    display: flex;
    height: 40px;
  }
  .title{
    width: 350px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
  }
</style>
