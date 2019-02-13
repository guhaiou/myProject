<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>系统设置</span>&gt;<span>添加题库</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入课程名字" style="width: auto" />
      <div style="display: inline-block">
        <Button type="primary" class="add" @click="addBack">添加题库</Button>
        <Button type="primary" class="add" @click="upMd">批量导入</Button>
      </div>
    </div>
    <div class="tab-container">
      <div class="tab-top">
        <div class="tip">选择专业:</div>
        <div class="profession-container">
          <div v-for="(item,index) in profession" v-on:click="selectProfession(index)" :class="{ selected:changeRed2 == index}">{{item.name}}</div>
        </div>
      </div>
      <div class="tab-top tab-button">
        <div class="tip">选择课程:</div>
        <div class="profession-container">
          <div v-for="(item,index) in course" v-on:click="selectCourse(index)" :class="{ selected:changeRed1 == index}">{{item.name}}</div>
        </div>
      </div>
    </div>
    <Tabs size="small" class="tab-type" @on-click="switchs">
      <TabPane v-for="(item,index) in questionType" :label="item.name" >
        <Table :columns="columns10" :data="subjectContent"></Table>
        <div class="page">
          <Page :total="pageSize"   show-total show-elevator @on-change="pageChange" style="margin-top: 20px"/>
        </div>
      </TabPane>
    </Tabs>
    <!--添加题库-->
    <Modal class="change-modal"
           title="添加题库"
           v-model="add"
           width="800"
           @on-ok="addQuestion"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <p><span class="first-title">课程编码:</span><Input v-model="addData.titleNumber" size="large" placeholder="课程编码" style="width: 200px" /></p>
        <p><span class="first-title">专业编码:</span>
          <Select style="width:200px;position: relative;z-index: 10000000000;margin-left:-3px" v-model="addData.professionNumber">
            <Option style="position: relative;z-index: 1000000000" v-for="item in profession" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
     <div style="display: flex;justify-content: space-around">
       <p><span class="first-title">类别:</span>
         <Select style="width:200px;position: relative;z-index: 1000000000;margin-left:-3px" v-model="TypeDefault">
           <Option style="position: relative;z-index: 1000000000" v-for="item in Type" :value="item.id" :key="item.id">{{ item.name }}</Option>
         </Select>
       </p>
       <p><span class="first-title">题目类型:</span>
         <Select style="width:200px;position: relative;z-index: 1000000000;margin-left:-3px" v-model="QuestionDefault">
           <Option style="position: relative;z-index: 1000000000" v-for="item in questionType" :value="item.id" :key="item.id">{{ item.name }}</Option>
         </Select>
       </p>
     </div>
     <div style="display: flex;justify-content: space-around">
       <p><span class="first-title">插入位置:</span><Input v-model="addData.location" size="large" placeholder="添加位置（默认添加在最后）" style="width: 200px" /></p>
       <p style="visibility: hidden"><span class="first-title" >正确答案:</span><Input v-model="addData.rightAnswer" size="large" placeholder="正确答案" style="width: 200px" /></p>
     </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
         <div style="width: 670px">
          <div id="toolbar1" class="toolbar"></div>
          <p id="cont1" class="text">

          </p>
         </div>
      </div>

      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项A:</span>
        <div style="width: 670px">
          <div id="toolbar2" class="toolbar"></div>
          <p id="cont2" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项B:</span>
        <div style="width: 670px">
          <div id="toolbar3" class="toolbar"></div>
          <p id="cont3" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项C:</span>
        <div style="width: 670px">
          <div id="toolbar4" class="toolbar"></div>
          <p id="cont4" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项D:</span>
        <div style="width: 670px">
          <div id="toolbar5" class="toolbar"></div>
          <p id="cont5" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项E:</span>
        <div style="width: 670px">
          <div id="toolbar6" class="toolbar"></div>
          <p id="cont6" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">正确答案:</span>
        <div style="width: 670px">
          <div id="toolbar7" class="toolbar"></div>
          <p id="cont7" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">解析:</span>
        <div style="width: 670px">
          <div id="toolbar8" class="toolbar"></div>
          <p id="cont8" class="text">

          </p>
        </div>
      </div>
    </Modal>
    <!--修改信息-->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           width="800"
           @on-ok="changeSure"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <p><span class="first-title">课程编码:</span><Input v-model="changeData.curriculumCode" size="large" placeholder="课程编码" style="width: 200px" /></p>
        <p><span class="first-title">专业代码:</span>
          <Select style="width:200px;position: relative;z-index: 10000000000;margin-left:-3px" v-model="changeData.profession1">
            <Option style="position: relative;z-index: 1000000000" v-for="item in profession" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex;justify-content: space-around">
        <p><span class="first-title">类别:</span>
          <Select style="width:200px" v-model="changeData.category">
            <Option v-for="item in Type" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">题目类型:</span>
          <Select style="width:200px" v-model="changeData.autoSubtypeId">
            <Option v-for="item in questionType" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
     <div style="display: flex;justify-content: space-around">
       <p ><span class="first-title">插入位置:</span><Input v-model="changeData.location" size="large" placeholder="添加位置（默认添加在最后）" style="width: 200px" /></p>
       <p style="visibility: hidden"><span class="first-title">正确答案:</span><Input v-model="changeData.rightAnswer" size="large" placeholder="正确答案" style="width: 200px" /></p>
     </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
        <div style="width: 670px">
          <div id="toolbar9" class="toolbar"></div>
          <p id="cont9" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项A:</span>
        <div style="width: 670px">
          <div id="toolbar10" class="toolbar"></div>
          <p id="cont10" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项B:</span>
        <div style="width: 670px">
          <div id="toolbar11" class="toolbar"></div>
          <p id="cont11" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项C:</span>
        <div style="width: 670px">
          <div id="toolbar12" class="toolbar"></div>
          <p id="cont12" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项D:</span>
        <div style="width: 670px">
          <div id="toolbar13" class="toolbar"></div>
          <p id="cont13" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">选项E:</span>
        <div style="width: 670px">
          <div id="toolbar17" class="toolbar"></div>
          <p id="cont17" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">正确答案:</span>
        <div style="width: 670px">
          <div id="toolbar15" class="toolbar"></div>
          <p id="cont15" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">页码:</span>
        <div style="width: 670px">
          <div id="toolbar14" class="toolbar"></div>
          <p id="cont14" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">解析:</span>
        <div style="width: 670px">
          <div id="toolbar16" class="toolbar"></div>
          <p id="cont16" class="text">
          </p>
        </div>
      </div>
    </Modal>
    <!--批量添加-->
    <Modal class="change-modal"
           title="批量导入题库"
           v-model="moreMd"
           @on-ok="allAdd"
           @on-cancel=""
           :mask-closable="false">
      <Upload
        multiple
        type="drag"
        :action="actionUrl" ref="upload"  :on-error="handleError" :on-success="handleSuccess" :data="updata">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>批量导入题库</p>
        </div>
      </Upload>
      <a style="display: block" href="https://juwenjiaoyu-video.oss-cn-beijing.aliyuncs.com/exel/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">查看批量导入模板</a>
    </Modal>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import TableExpand from './TableExpand.vue';
    export default {
        name: "QuestionBank",
        components: { TableExpand },
        props: {
          row: Object
        },
        created() {
            this.$store.state.showBottomNav = false;
            this.$store.state.showLogin = true;
            this.professionAddCourse();
            this.getQuestionType();
            this.getTypeList();
        },
        data(){
          return{
            updata:{file:''},
            actionUrl:'',
            moreMd:false,
            add:false,
            pageSize:1,
            selectType:12,
            page:1,
            questionTpe:12,
            currentPage:1,
            changeRed2:0,
            changeRed1:0,
            changeMessage:false,
            questionType:[],
            profession:[],
            course:[],
            professionDf:'',
            courseDf:'',
            single:[],
            editorContent: '',
            editorContent2: '',
            editorContent3: '',
            editorContent4: '',
            editorContent5: '',
            editorContent6: '',
            editorContent7: '',
            editorContent8: '',
            editorContent9: '',
            editorContent10: '',
            editorContent11: '',
            editorContent12: '',
            editorContent13: '',
            editorContent14: '',
            editorContent15: '',
            TypeDefault:'',
            QuestionDefault:'',
            Type: [],
            columns10: [
              {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                  return h(TableExpand, {
                    props: {
                      row: params.row
                    }
                  })
                }
              },
              {
                type: 'index',
                width: 60,
                align: 'center'
              },
              {
                title: '题目',
                width: 400,
                align:'center',
                render: (h, params) => {
                  return h('span', {
                    domProps: {
                      innerHTML:params.row.name
                    }
                  })
                }
              },
              {
                title: '课程编码',
                align:'center',
                key: 'curriculumCode'
              },
              {
                title: '专业ID',
                align:'center',
                key: 'profession'
              },
              {
                title: '类别',
                align:'center',
                render: (h, params) => {
                  let category;
                  if(params.row.category=='1'){
                    category='湖南自考'
                  }
                  if(params.row.category=='2'){
                    category='海南自考'
                  }
                  if(params.row.category=='4'){
                    category='成教专科'
                  }
                  if(params.row.category=='8'){
                    category='成教本科'
                  }
                  return h('span', {
                    domProps: {
                      innerHTML:category
                    }
                  })
                }
              },
              {
                title: '题目类型',
                align:'center',
                render: (h, params) => {
                  let category;
                  if(params.row.autoSubtypeId=='12'){
                    category='单选题'
                  }
                  if(params.row.autoSubtypeId=='13'){
                    category='多选题'
                  }
                  if(params.row.autoSubtypeId=='14'){
                    category='填空题'
                  }
                  if(params.row.autoSubtypeId=='15'){
                    category='名词解释'
                  }
                  if(params.row.autoSubtypeId=='16'){
                    category='简单题'
                  }
                  if(params.row.autoSubtypeId=='17'){
                    category='论述题'
                  }
                  if(params.row.autoSubtypeId=='19'){
                    category='判断题'
                  }
                  return h('span', {
                    domProps: {
                      innerHTML:category
                    }
                  })
                }
              },
              {
                title: '操作',
                align:'center',
                key: 'action',
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
            changeP:'27',
            changeData: {
              profession1:'',
              name:'',
              curriculumCode: '',
              category: '',
              autoSubtypeId: '',
              pageNumber: '',
              rightAnswer:'',
              location:'',
              optionsList:[],
              analysis:'',
              id:''
              },
            addData: {
                name:'',
                titleNumber: '',
                professionNumber: '',
                type: '',
                questionType: '',
                page: '',
                rightAnswer:'',
                location:0,
                question1:'',
                question2:'',
                question3:'',
                question4:'',
                examinationSite:'',
                analyse:'无',
                autoSubtypeId:12
            },
            subjectContent:[]
          }
        },
        methods:{
          /*切换题型*/
          switchs(index){
            this.QuestionDefault=this.questionType[index].id;
            this.defaultSingle();
          },
          /*分页*/
          pageChange(index){
            this.page=index;
            this.defaultSingle();
          },
          /*添加题目*/
          addQuestion(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            if(_this.QuestionDefault=='12'){
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamQuestionBank',
                data: {
                  examPaperInfoId:localStorage.getItem('paperId'),
                  curriculumCode:_this.addData.titleNumber,
                  professionId:_this.addData.professionNumber,
                  category:_this.TypeDefault,
                  autoSubtypeId:_this.QuestionDefault,
                  rightAnswer:_this.editor7.txt.text(),
                  location:_this.addData.location,
                  name:_this.editor1.txt.html(),
                  pageNumber:_this.addData.page,
                  analysis:_this.editor8.txt.html(),
                  selectA:_this.editor2.txt.html(),
                  selectB:_this.editor3.txt.html(),
                  selectC:_this.editor4.txt.html(),
                  selectD:_this.editor5.txt.html(),
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'POST',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.$Message.info('添加成功成功!');
                    _this.defaultSingle()
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            }
            else{
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addAutoSubject',
                data: {
                  curriculumCode:_this.addData.titleNumber,
                  professionId:_this.addData.professionNumber,
                  category:_this.TypeDefault,
                  autoSubtypeId:_this.QuestionDefault,
                  rightAnswer:_this.editor7.txt.text(),
                  location:_this.addData.location,
                  name:_this.editor1.txt.html(),
                  pageNumber:_this.addData.page,
                  analysis:_this.editor8.txt.html(),
                  selectA:_this.editor2.txt.html(),
                  selectB:_this.editor3.txt.html(),
                  selectC:_this.editor4.txt.html(),
                  selectD:_this.editor5.txt.html(),
                  selectE:_this.editor6.txt.html(),
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'POST',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.$Message.info('添加成功成功!');
                    _this.defaultSingle()
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            }

            },
          /*修改确定*/
          changeSure(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            if(this.questionTpe==12){
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateAutoSubject',
                data: {
                  id:_this.changeData.id,
                  curriculumCode:_this.changeData.curriculumCode,
                  professionId:_this.changeData.profession1,
                  category:_this.changeData.category,
                  autoSubtypeId:_this.changeData.autoSubtypeId,
                  rightAnswer:_this.editor15.txt.text(),
                  location:_this.changeData.location,
                  name:_this.editor9.txt.html(),
                  pageNumber:_this.editor14.txt.html(),
                  analysis:_this.editor16.txt.html(),
                  selectA:_this.editor10.txt.text(),
                  selectB:_this.editor11.txt.text(),
                  selectC:_this.editor12.txt.text(),
                  selectD:_this.editor13.txt.text(),
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
                    _this.defaultSingle()
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            }
            else{
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateAutoSubject',
                data: {
                  id:_this.changeData.id,
                  curriculumCode:_this.changeData.curriculumCode,
                  professionId:_this.changeData.profession1,
                  category:_this.changeData.category,
                  autoSubtypeId:_this.changeData.autoSubtypeId,
                  rightAnswer:_this.editor15.txt.text(),
                  location:_this.changeData.location,
                  name:_this.editor9.txt.html(),
                  pageNumber:_this.editor14.txt.html(),
                  analysis:_this.editor16.txt.html(),
                  selectA:_this.editor10.txt.text(),
                  selectB:_this.editor11.txt.text(),
                  selectC:_this.editor12.txt.text(),
                  selectD:_this.editor13.txt.text(),
                  selectE:_this.editor17.txt.text(),
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
                    _this.defaultSingle()
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            }
          },
          addBack(){
            this.add=true;
            this.editor1.txt.html('');
            this.editor2.txt.html('');
            this.editor3.txt.html('');
            this.editor4.txt.html('');
            this.editor5.txt.html('');
            this.editor6.txt.html('');
            this.editor7.txt.html('');
            this.editor8.txt.html('');
          },
          /*修改题目*/
          change(index){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            this.changeMessage=true;
            this.changeData.name=this.subjectContent[index].name;
            this.changeData.curriculumCode=this.subjectContent[index].curriculumCode;
            this.changeData.category=this.subjectContent[index].category;
            this.changeData.autoSubtypeId=this.subjectContent[index].autoSubtypeId;
            this.changeData.pageNumber=this.subjectContent[index].pageNumber;
            this.changeData.rightAnswer=this.subjectContent[index].rightAnswer;
            this.changeData.location=this.subjectContent[index].location;
            this.changeData.analysis=this.subjectContent[index].analysis;
            this.changeData.examPoint=this.subjectContent[index].rightAnswer;
            this.changeData.optionsList=this.subjectContent[index].optionsList;
            this.changeData.id=this.subjectContent[index].id;
            this.changeData.profession1=parseInt(this.subjectContent[index].profession);

            this.editor9.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor9.customConfig.debug = true;
            this.editor9.customConfig.uploadFileName = 'file';
            this.editor9.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor9.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
               alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor9.customConfig.uploadImgShowBase64 = true;
            this.editor9.create();
            if(this.changeData.name){
              this.editor9.txt.html(this.changeData.name);
            }
            else{
              this.editor9.txt.html('');
            }



            this.editor10.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor10.customConfig.debug = true;
            this.editor10.customConfig.uploadFileName = 'file';
            this.editor10.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor10.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor10.customConfig.uploadImgShowBase64 = true;
            this.editor10.create();
            if(this.changeData.optionsList[0].name){
              this.editor10.txt.html(this.changeData.optionsList[0].name);
            }
            else{
              this.editor10.txt.html('')
            }



            this.editor11.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor11.customConfig.debug = true;
            this.editor11.customConfig.uploadFileName = 'file';
            this.editor11.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor11.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor11.customConfig.uploadImgShowBase64 = true;
            this.editor11.create();
            if(this.changeData.optionsList[1].name){
              this.editor11.txt.html(this.changeData.optionsList[1].name);
            }
            else{
              this.editor11.txt.html('');
            }



            this.editor12.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor12.customConfig.debug = true;
            this.editor12.customConfig.uploadFileName = 'file';
            this.editor12.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor12.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor12.customConfig.uploadImgShowBase64 = true;
            this.editor12.create();
            if(this.changeData.optionsList[2].name){
              this.editor12.txt.html(this.changeData.optionsList[2].name);
            }
            else{
              this.editor12.txt.html('');
            }





            this.editor13.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor13.customConfig.debug = true;
            this.editor13.customConfig.uploadFileName = 'file';
            this.editor13.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor13.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor13.customConfig.uploadImgShowBase64 = true;
            this.editor13.create();
            if(this.changeData.optionsList[3].name){
              this.editor13.txt.html(this.changeData.optionsList[3].name);
            }
            else{
              this.editor13.txt.html('');
            }




            this.editor14.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor14.customConfig.debug = true;
            this.editor14.customConfig.uploadFileName = 'file';
            this.editor14.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor14.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor14.customConfig.uploadImgShowBase64 = true;
            this.editor14.create();
            if(this.subjectContent[index].pageNumber){
              this.editor14.txt.html(this.subjectContent[index].pageNumber);
            }
            else{
              this.editor14.txt.html('');
            }


            this.editor15.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor15.customConfig.debug = true;
            this.editor15.customConfig.uploadFileName = 'file';
            this.editor15.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor15.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor15.customConfig.uploadImgShowBase64 = true;
            this.editor15.create();
            if(this.changeData.examPoint){
              this.editor15.txt.html(this.changeData.examPoint);
            }
            else{
              this.editor15.txt.html('');
            }


            this.editor16.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor16.customConfig.debug = true;
            this.editor16.customConfig.uploadFileName = 'file';
            this.editor16.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor16.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor16.customConfig.uploadImgShowBase64 = true;
            this.editor16.create();
            if(this.subjectContent[index].analysis){
              this.editor16.txt.html(this.subjectContent[index].analysis);
            }
            else{
              this.editor16.txt.html('');
            }

            this.editor17.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
            this.editor17.customConfig.debug = true;
            this.editor17.customConfig.uploadFileName = 'file';
            this.editor17.customConfig.uploadImgParams = {
              type :1,
            };
            this.editor17.customConfig.uploadImgHooks = {
              before: function(xhr, editor, files) {

              },
              success: function(xhr, editor, result) {
                alert("上传成功");
                console.log(result)
              },
              fail: function(xhr, editor9, result) {
                alert("上传失败,原因是" + result);
              },
              error: function(xhr, editor) {
                alert("上传出错");
              },
              timeout: function(xhr, editor) {
                alert("上传超时");
              },
              customInsert: function (insertImg, result, editor) {
                let url=result.data
                insertImg(url)
              }
            };
            this.editor17.customConfig.uploadImgShowBase64 = true;
            if(this.changeData.optionsList.length>=5){
              this.editor17.txt.html(this.changeData.optionsList[4].name);
            }
            else{
              this.editor17.txt.html('');
            }
          },
          /*专业和课程接口*/
          professionAddCourse(){
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
                  console.log(res.data.profession)
                  for(var i=0;i<res.data.professions.length;i++){
                    _this.profession.push(res.data.professions[i]);
                    _this.professionDf=_this.profession[0].id;
                  }
                  for(var j=0;j<res.data.curriculums.length;j++){
                    _this.course.push(res.data.curriculums[j])
                    _this.courseDf=_this.course[0].id;
                  }
                  if(_this.course.length!=0){
                    var courseCode=_this.course[0].code;
                  }
                  else{
                    var courseCode=' ';
                  }
                  console.log(_this.profession)
                  $.ajax({
                    url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectPage',
                    data: {
                      autoSubtypeId:_this.selectType,
                      professionId:_this.professionDf,
                      curriculumCode:_this.courseDf,
                      pageIndex:_this.page
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
                        _this.pageSize=res.data.pageSize;
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
          /*选择专业*/
          selectProfession(index){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          this.changeRed2 = index;
          this.changeRed1 = 0;
          this.professionDf=this.profession[index].id;
          var _this=this;
          var index=index;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectConditionTwo',
            data: {
              professionId:_this.profession[index].id
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
                if(_this.course.length>0){
                  _this.courseDf=_this.course[0].code;
                }
                else{
                  _this.courseDf='';
                }

                _this.defaultSingle(index);
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
          },
          /*选择课程*/
          selectCourse(index){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            this.changeRed1 = index;
            var _this=this;
            var index=index;
           _this.courseDf=_this.course[index].code;
            _this.defaultSingle(index);

          },
          /*选择专业时默认单选题*/
          defaultSingle(index){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            var professionIndex=_this.changeRed2;
            var courseIndex=_this.changeRed1;
            var defaultCourse;
            if(_this.courseDf){
              defaultCourse=_this.courseDf;
            }
            else{
              defaultCourse='';
            }

            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectPage',
              data: {
                autoSubtypeId:_this.QuestionDefault,
                pageIndex:_this.page,
                professionId:_this.professionDf,
                curriculumCode:defaultCourse
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
                  _this.pageSize=res.data.pageSize;
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});
          },
          /*获取单选题题库*/
          defaultGetSingle(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectPage',
            data: {
              professionCode:_this.profession[index].code,
              curriculumCode:this.course[index].code,
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
                _this.data9=res.data;
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
          },
          /*题库列表*/
          questionList(){
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          var _this=this;
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectPage',
            data: {
              professionCode:'B080809',
              curriculumCode:'06167',
              autoSubtypeId:_this.questionTpe,
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
                  _this.subjectContent=res.data.list;
                  _this.pageSize=res.data.pageSize;
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
          },
          /*获取类别列表*/
          getTypeList(){
              var _this=this;
              var token=sessionStorage.getItem('token');
              var userId=sessionStorage.getItem('userId');
              var page=1;
              $.ajax({
                url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCategorysPage',
                data: {
                  pageIndex :page
                },
                beforeSend: function(request) {
                  request.setRequestHeader("x-access-token", token);
                },
                async: false,//请求是否异步，默认为异步
                type: 'GET',
                dataType:'json',
                success: function (res) {
                  if(res.status==200){
                    _this.Type=[];
                    for(var i=0;i<res.data.list.length;i++){
                      _this.Type.push(res.data.list[i]);
                    }
                  }
                  else{
                    alert(res.message)
                  }
                },
                error: function () {
                }});
            },
          /*查询题目类别*/
          getQuestionType(){
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var page=1;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubtype',
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
                  _this.questionType=res.data;
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
                  url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delAutoSubject',
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
                      _this.defaultSingle();
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
          /*上传弹框*/
          upMd(){
            var userId=sessionStorage.getItem('userId');
            this.moreMd=true;
            this.actionUrl='http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/importAutoSubjectExcel';
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
          /*添加成功*/
          allAdd(){

          },
      },
      mounted(){
        var userId=sessionStorage.getItem('userId');
        this.editor1 = new Editor('#toolbar1','#cont1');
        this.editor2 = new Editor('#toolbar2','#cont2');
        this.editor3 = new Editor('#toolbar3','#cont3');
        this.editor4 = new Editor('#toolbar4','#cont4');
        this.editor5 = new Editor('#toolbar5','#cont5');
        this.editor6 = new Editor('#toolbar6','#cont6');
        this.editor7 = new Editor('#toolbar7','#cont7');
        this.editor8 = new Editor('#toolbar8','#cont8');
        this.editor9 = new Editor('#toolbar9','#cont9');
        this.editor10 = new Editor('#toolbar10','#cont10');
        this.editor11 = new Editor('#toolbar11','#cont11');
        this.editor12 = new Editor('#toolbar12','#cont12');
        this.editor13 = new Editor('#toolbar13','#cont13');
        this.editor14 = new Editor('#toolbar14','#cont14');
        this.editor15 = new Editor('#toolbar15','#cont15');
        this.editor16 = new Editor('#toolbar16','#cont16');
        this.editor17 = new Editor('#toolbar17','#cont17');
        this.editor1.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor1.customConfig.debug = true;
        this.editor1.customConfig.uploadFileName = 'file';
        this.editor1.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor1.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor1.customConfig.uploadImgShowBase64 = true;
        this.editor1.create();
        this.editor1.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ],

        this.editor2.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor2.customConfig.debug = true;
        this.editor2.customConfig.uploadFileName = 'file';
        this.editor2.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor2.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor2.customConfig.uploadImgShowBase64 = true;
        this.editor2.create();
        this.editor2.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

        this.editor3.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor3.customConfig.debug = true;
        this.editor3.customConfig.uploadFileName = 'file';
        this.editor3.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor3.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor3.customConfig.uploadImgShowBase64 = true;
        this.editor3.create();
        this.editor3.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];


        this.editor4.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor4.customConfig.debug = true;
        this.editor4.customConfig.uploadFileName = 'file';
        this.editor4.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor4.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor4.customConfig.uploadImgShowBase64 = true;
        this.editor4.create();
        this.editor4.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

        this.editor5.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor5.customConfig.debug = true;
        this.editor5.customConfig.uploadFileName = 'file';
        this.editor5.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor5.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor5.customConfig.uploadImgShowBase64 = true;
        this.editor5.create();
        this.editor5.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

        this.editor6.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor6.customConfig.debug = true;
        this.editor6.customConfig.uploadFileName = 'file';
        this.editor6.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor6.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor6.customConfig.uploadImgShowBase64 = true;
        this.editor6.create();
        this.editor6.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

        this.editor7.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor7.customConfig.debug = true;
        this.editor7.customConfig.uploadFileName = 'file';
        this.editor7.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor7.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor7.customConfig.uploadImgShowBase64 = true;
        this.editor7.create();
        this.editor7.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

        this.editor8.customConfig.uploadImgServer = 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId +'/common/upload';
        this.editor8.customConfig.debug = true;
        this.editor8.customConfig.uploadFileName = 'file';
        this.editor8.customConfig.uploadImgParams = {
          type :1,
        };
        this.editor8.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {

          },
          success: function(xhr, editor, result) {
            alert("上传成功");
            console.log(result)
          },
          fail: function(xhr, editor9, result) {
            alert("上传失败,原因是" + result);
          },
          error: function(xhr, editor) {
            alert("上传出错");
          },
          timeout: function(xhr, editor) {
            alert("上传超时");
          },
          customInsert: function (insertImg, result, editor) {
            let url=result.data
            insertImg(url)
          }
        };
        this.editor8.customConfig.uploadImgShowBase64 = true;
        this.editor8.create();
        this.editor8.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];

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
  .change-modal p{
    margin-bottom: 5px;
  }
.toolbar{
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  height: 30px;
}
  .text{
    border: 1px solid #ccc;
    border-top: none;
    height: 180px;
    z-index: 10000;
    width: 100%;
  }
  .w-e-text p{
    margin: 0!important;

  }
</style>
