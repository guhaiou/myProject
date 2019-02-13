<template>
  <div class="container">
  <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>院校管理</span>&gt;<span>添加考纲</span></div>
  <div class="search">
    <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入考纲名称" style="width: auto" />
    <Button type="primary" class="add" @click="add">添加考纲</Button>
  </div>
  <ul class="point-container">
    <li v-for="(item,index) in subjectContent">
      <span>{{index+1}}、</span>
      <p>{{item.title}}</p>
      <div class="bt_coantainer"> <Button @click="remove(index)" class="bt" type="primary" ghost>删除</Button><Button @click="changeModal(item,index)" class="bt" type="primary" ghost>修改</Button><Button @click="comeToText(item.id)" class="bt" type="info" ghost>知识点管理</Button><Button @click="getSetCourseList(item.id)" class="bt" type="info" ghost>设置课程</Button><Button @click="alertPofessionMd(item.id)" class="bt" type="info" ghost>设置专业</Button><Button @click="lookChapter(item.id)" class="bt" type="info" ghost>查看章节</Button><Button @click="addChapters(item.id)" class="bt" type="info" ghost>添加章节</Button></div></li>
  </ul>

  <!--分页-->
  <div class="page">
    <Page :total="totalNum"  show-total show-elevator  @on-change="pageChange"/>
  </div>

  <!--添加考纲-->
  <Modal
    class="addMd"
    v-model="examination"
    title="添加考纲"
    @on-ok="addKaoGang"
    @on-cancel="cancel">
    <p><span class="first-title">考纲标题:</span><Input  v-model="addData.name"  size="large" placeholder="考纲标题" style="width: 200px" /></p>
  </Modal>
  <!--修改考纲-->
  <Modal
    class="addMd"
    v-model="changeMd"
    title="修改考纲"
    @on-ok="changeKaoGang"
    @on-cancel="cancelChange">
    <p><span class="first-title">考纲标题:</span><Input  v-model="changeData.title"  size="large" placeholder="考纲标题" style="width: 200px" /></p>
  </Modal>
  <!--添加章节-->
  <Modal
    width='365px'
    class="addMd"
    v-model="addChapter"
    title="章节列表"
    @on-ok="sureAddChapter"
    @on-cancel="cancel">
    <ul class="chapterList">
      <li><p><span style="margin-right: 5px">名称:</span><Input style="width: 300px" v-model="addData.title" size="large" placeholder="章节名称" /></p></li>
      <li><p><span style="margin-right: 5px">排序:</span><Input style="width: 300px" v-model="addData.listOrder" size="large" placeholder="排序" /></p></li>
    </ul>
  </Modal>
  <!--查看章节-->
  <Modal
    width='800px'
    class="addMd"
    v-model="lookChapterMd"
    title="章节列表">
    <ul class="chapterList">
      <li v-for="(item,index) in chapterList"><p><span>标题:</span> <Input style="width: 300px" disabled v-model="item.title" size="large" placeholder="large size" /><span style="margin-left: 40px;margin-right: 10px">排序:</span><Input style="width:35px" :disabled="true" v-model="item.listOrder" size="large"  /></p><div class="btContainer"><Button class="chapterBt" type="primary" @click="change(index)" ghost>修改</Button><Button class="chapterBt" @click="deletChapter(item.id)" type="error" ghost>删除</Button></div></li>
    </ul>
  </Modal>
  <!--修改章节-->
  <Modal
    width='366px'
    class="addMd"
    v-model="changeChapter"
    title="修改章节"
    @on-ok="sureChangeChapter"
    @on-cancel="cancelChange">
    <ul class="chapterList">
      <li><p><span>标题</span> <Input style="width: 300px" v-model="changeChapterData.title" size="large" /></p></li>
      <li><p><span>排序</span> <Input style="width: 300px" v-model="changeChapterData.listOrder" size="large" /></p></li>
    </ul>
  </Modal>
  <!--专业选择-->
  <Modal
    title="专业"
    v-model="professionMd"
    width="1000"
    @on-ok="setP"
    @on-cancel="setCancel"
    :mask-closable="false">
    <CheckboxGroup v-model="setedProfession">
      <Checkbox v-for="item in setProfession" :label="item.id">{{item.name}}</Checkbox>
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
  <!--删除章节-->
  <Modal
    title="删除章节"
    v-model="deletMd"
    width="360"
    @on-ok="sureDelete"
    @on-cancel="cancelDelet"
    :mask-closable="false">
    是否确定删除？
  </Modal>
</div>
</template>

<script>
    export default {
        name: "examination",
        data(){
            return{
              index:'',
              changeMd:false,
              setingID:'',
              chapterId:'',
              setProfession:[],
              setedProfession:[],
              professionMd:false,
              examination:false,
              changeRed:0,
              courseMd:false,//课程弹框
              selectedcourse:[],
              selectedProfession:[],
              changeRed2:0,//专业序号
              changeRed1:0,//课程序号
              profession:[],//专业列表
              course:[],//课程列表
              subjectContent:[],//考纲列表
              totalNum:'',//刚考列表总数
              currentPage:1,//分页跳转的页码
              selectprofessionId:'',
              addData:{
                title:'',
                listOrder:'',
                id:''
              },
              changeData:{
                title:''
              },
              searchType:'',
              changeChapter:false,
              addChapter:false,
              lookChapterMd:false,
              deletMd:false,
              changeChapterData:{title:'',listOrder:'',id:''},
              isChange:false,
              addChapterData:'',
              chapterContent1:'第一章 绪论',
              chapterContent2:'第二章 了解购买者行为规律',
              chapterList:[],
          }
        },
        created() {
          this.$store.state.showBottomNav = false,
          this.$store.state.showLogin = true
          this.professionAndCourse();
          this.getAllKaoGang();
        },
      methods:{
          /*显示选择专业弹框*/
        alertPofessionMd(index){
          this.professionMd=true;
          this.getSetProfessionList(index);
        },
        /*添加考纲弹框*/
        add(){
          this.examination=true;
        },
        /*添加考纲*/
        addKaoGang(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamLoreExercises',
            data: {
              title:_this.addData.name
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
                _this.getAllKaoGang();
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
        /*修改考纲弹框*/
        changeModal(item,index){
          this.changeMd=true;
          this.index=index;
          this.changeData.title=item.title;
        },
        /*修改考纲*/
        changeKaoGang(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamLoreExercises',
            data: {
              id:_this.subjectContent[_this.index].id,
              title:_this.changeData.title
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
                _this.getAllKaoGang();
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
        /*添加章节*/
        lookChapter(id){
          this.lookChapterMd=true;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          var id=id;
          _this.setingID=id;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesItems',
            data: {
              examLoreExercisesId:id
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'GET',
            dataType:'json',
            success: function (res) {
              if(res.status==200){
                  _this.chapterList=res.data;
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        /*修改章节*/
        change(index){
          this.changeChapter=true;
          this.changeChapterData.listOrder=this.chapterList[index].listOrder;
          this.changeChapterData.title=this.chapterList[index].title;
          this.changeChapterData.id=this.chapterList[index].id;
        },
        /*确定修改章节*/
        sureChangeChapter(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamLoreExercisesItem',
            data: {
              id:_this.changeChapterData.id,
              title:_this.changeChapterData.title,
              listOrder:_this.changeChapterData.listOrder
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
                _this.lookChapterMd=false;
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});

        },
        /*添加章节*/
        addChapters(id){
          this.addChapter=true;
          this.chapterId=id;
        },
        /*确定添加章节*/
        sureAddChapter(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamLoreExercisesItem',
            data: {
              examLoreExerciserId :_this.chapterId,
              title:_this.addData.title,
              listOrder:_this.addData.listOrder
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
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        /*删除章节借口*/
        deletChapter(id){
          this.deletMd=true;
          this.chapterId=id;
        },
        /*确定删除*/
        sureDelete(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamLoreExercisesItem',
            data: {
              id:_this.chapterId
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
                _this.lookChapterMd=false;

              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        /*取消删除*/
        cancelDelet(){
          this.$Message.info('删除失败!');
        },
        comeToText(id){
          localStorage.setItem('paperId',id)
          this.$router.push({ name:'ExaminationList'});
        },
        /*专业和课程接口*/
        professionAndCourse(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectCondition',
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
                _this.profession.push({ id:0, name: '全部考纲' });
                for(var i=0;i<res.data.professions.length;i++){
                  _this.profession.push(res.data.professions[i]);
                }
                for(var j=0;j<res.data.curriculums.length;j++){
                  _this.course.push(res.data.curriculums[j])
                }
                $.ajax({
                  url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectPage',
                  data: {
                    autoSubtypeId:12,
                    pageIndex:1
                  },
                  beforeSend: function(request) {
                    request.setRequestHeader("x-access-token", token);
                  },
                  async: false,//请求是否异步，默认为异步
                  type: 'GET',
                  dataType:'json',
                  success: function (res) {
                    if(res.status==200){
                      _this.subjectContent=res.data.list;
                    }
                    else{
                      alert(res.message)
                    }
                  },
                  error: function () {
                  }});
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        /*获取所有考纲*/
        getAllKaoGang(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          var page=this.currentPage;
          _this.selectprofessionId=0;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercises',
            data: {
              pageIndex:page,
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'GET',
            dataType:'json',
            success: function (res) {
              if(res.status==200){
                _this.subjectContent=res.data.list;
                _this.totalNum=res.data.pageSize;
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
          this.getAllKaoGang();
        },
        /*搜索*/
        search(){
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var page=_this.currentPage;
          var name=_this.searchType;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercises',
            data: {
              pageIndex :page,
              title:name
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'GET',
            dataType:'json',
            success: function (res) {
              _this.totalNum=res.data.pageSize;
              if(res.status==200){
                _this.subjectContent=res.data.list;
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        /*获取设置专业的专业列表*/
        getSetProfessionList(id){
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var id=id;
          _this.setingID=id;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesProfession',
            data: {
              examLoreExercisesId:id
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
        /*设置专业*/
        setP(){
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setExamLoreExercisesProfession',
            data: {
              professionStrIds  :_this.setedProfession.join(','),
              examLoreExercisesId:_this.setingID
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
        /*获取设置课程的课程列表*/
        getSetCourseList(id){
          this.courseMd=true;
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var id=id;
          _this.setingID=id;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesCurriculum',
            data: {
              examLoreExercisesId:id
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
        /*设置失败*/
        setCancel(){
          this.$Message.info('设置失败!');
        },
        /*设置课程*/
        setC(){
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setExamLoreExercisesCurriculum',
            data: {
              curriculumStrIds   :_this.selectedcourse.join(','),
              examLoreExercisesId :_this.setingID
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
        /*专业选择弹框*/
        /*删除考纲*/
        remove (index) {
          this.$Modal.confirm({
            title: '删除内容',
            content: '<p>请确认是否删除？</p>',
            onOk: () => {
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              var _this=this;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamLoreExercises',
                data: {
                  id:_this.subjectContent[index].id,
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
                    _this.getAllKaoGang();
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

  /*专业课程选择部分*/
  .tab-top{
    display: flex;
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
  .selected{
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
    border-bottom: 1px dashed #e8eaec;
  }
  .point-container span{
    display: inline-block;
    margin-right: 5px;

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
  .bt_coantainer{
    display: inline-block;
    position: absolute;
    right: 0;
  }
  .bt{
    float: right;
    margin-left: 10px;
  }
</style>
