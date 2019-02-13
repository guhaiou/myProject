<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>添加真题题目</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入课程名字" style="width: auto" />
      <Button type="primary" class="add" @click="addBack">添加题目</Button>
    </div>
    <Tabs size="small"   class="tab-type" @on-click="switchs">
      <TabPane v-for="(item,index) in typeList"  :value="item.name"  :label="item.name">
        <Table :columns="columns10" :data="data9"></Table>
        <div class="page">
          <Page :total="pageSize"   show-total show-elevator @on-change="pageChange" style="margin-top: 20px"/>
        </div>
      </TabPane>
    </Tabs>
    <!--添加题库-->
    <Modal class="change-modal"
           title="添加题目"
           v-model="add"
           width="800"
           @on-ok="addQuestion"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around;position: relative;z-index:999999999999999999">
        <p><span class="first-title" style="position: relative;z-index:999999999999999999">题目类型:</span>
          <Select style="width:200px;position: relative;z-index:999999999999999999;margin-left:-3px" v-model="QuestionDefault">
            <Option style="position: relative;z-index:999999999999999999" v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">插入位置:</span><Input v-model="addData.location" size="large" placeholder="添加位置（默认添加在最后）" style="width: 200px" /></p>
      </div>
      <div style="display: flex;position: relative;z-index:100">
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
        <p><span class="first-title">题目类型:</span>
          <Select style="width:200px" v-model="currentTypeId">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p ><span class="first-title">插入位置:</span><Input v-model="changeData.listOrder" size="large" placeholder="添加位置（默认添加在最后）" style="width: 200px" /></p>
      </div>
      <div style="display: flex;position: relative;z-index: 10">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
        <div style="width: 670px">
          <div id="toolbar9" class="toolbar"></div>
          <p id="cont9" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="xuan1">
        <span class="first-title" style="display: block;margin-top: 40px">选项A:<p><Checkbox style="display: inline-block" v-model="singleA"></Checkbox></p></span>

        <div style="width: 670px">
          <div id="toolbar10" class="toolbar"></div>
          <p id="cont10" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="xuan1">
        <span class="first-title" style="display: block;margin-top: 40px">选项B:<p><Checkbox style="display: inline-block" v-model="singleB"></Checkbox></p></span>
        <div style="width: 670px">
          <div id="toolbar11" class="toolbar"></div>
          <p id="cont11" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="xuan1">
        <span class="first-title" style="display: block;margin-top: 40px">选项C:<p><Checkbox style="display: inline-block;" v-model="singleC"></Checkbox></p></span>
        <div style="width: 670px">
          <div id="toolbar12" class="toolbar"></div>
          <p id="cont12" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="xuan1">
        <span class="first-title" style="display: block;margin-top: 40px">选项D:<p><Checkbox style="display: inline-block" v-model="singleD"></Checkbox></p></span>
        <div style="width: 670px">
          <div id="toolbar13" class="toolbar"></div>
          <p id="cont13" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="xuan">
        <span class="first-title" style="display: block;margin-top: 40px">选项E:<p><Checkbox style="display: inline-block" v-model="singleE"></Checkbox></p></span>
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
        <span class="first-title" style="display: block;line-height:100px">解析:</span>
        <div style="width: 670px">
          <div id="toolbar16" class="toolbar"></div>
          <p id="cont16" class="text">

          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import expandRow  from './PaperData.vue';
  export default {
    name: "ExamPaperList",
    components: { expandRow  },
    props: {
      row: Object
    },
    created() {
        this.$store.state.showBottomNav = false;
        this.$store.state.showLogin = true;
        this.getTypeList();
        this.getQuestion();
    },
    data(){
      return{
        singleA:false,
        singleB:false,
        singleC:false,
        singleD:false,
        singleE:false,
        id:'',
        add:false,
        xuan:true,
        xuan1:true,
        index1:0,
        typeId:1,
        changeMessage:false,
        currentTypeId:1,
        currentPage:1,
        pageSize:1,
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
        editorContent17: '',
        TypeDefault:'',
        QuestionDefault:'',
        Type: [
          {
            value: '湖南自考',
            label: '湖南自考'
          },
          {
            value: '海南自考',
            label: '海南自考'
          },
          {
            value: '成考',
            label: '成考'
          },
        ],
        questionType: [],
        columns10: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow , {
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
            render: (h, params) => {
              return h('span', {
                domProps: {
                  innerHTML:params.row.contents
                }
              })
            }
          },
          {
            title: '题目类型',
            width:100,
            align:'center',
            key: 'examQuestionBankTypeId'
          },
          {
            width:60,
            title: '排序',
            align:'center',
            key: 'listOrder'
          },
          {
            title: '操作',
            key: 'action',
            width:130,
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
        data9:[],
        changeData: {
          contents:'',
          descriptions: '',
          examQuestionBankTypeId: '',
          listOrder: '',
          optionsAnswer:'',
          options:[]
        },
        addData: {
          name:'',
          titleNumber: '',
          professionNumber: '',
          type: '',
          questionType: '',
          page: '',
          rightAnswer:'',
          location:'',
          question1:'',
          question2:'',
          question3:'',
          question4:'',
          examinationSite:'',
          analyse:''
        },
        typeList:[]
      }
    },
    methods:{
      /*切换题型*/
      switchs(index){
        this.data9=[];
        this.pageSize=0;
        this.currentPage=1;
        this.currentTypeId=this.typeList[index].id;
        this.getQuestion();
      },
      /*添加题目*/
      addQuestion(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        if(_this.QuestionDefault=='12'){
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
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var xuanA=0;
        var xuanB=0;
        var xuanC=0;
        var xuanD=0;
        var xuanE=0;
        if(_this.singleA==true){
          xuanA=1
        }
        if(_this.singleB==true){
          xuanB=1
        }
        if(_this.singleC==true){
          xuanC=1
        }
        if(_this.singleD==true){
          xuanD=1
        }
        if(_this.singleE==true){
          xuanE=1
        }
       if(_this.currentTypeId==1){
         $.ajax({
           url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamQuestionBank',
           data: {
             id:_this.data9[_this.index1].id,
             titleName:_this.editor9.txt.html(),
             examQuestionBankTypeId:_this.currentTypeId,
             difficultyId:1,
             descriptions:_this.editor16.txt.html(),
             listOrder:_this.changeData.listOrder,
             optionA:_this.editor10.txt.html(),
             optionB:_this.editor11.txt.html(),
             optionC:_this.editor12.txt.html(),
             optionD:_this.editor13.txt.html(),
             optionAnswerA:xuanA,
             optionAnswerB:xuanB,
             optionAnswerC:xuanC,
             optionAnswerD:xuanD,
             optionAnswerE:xuanE,
           },
           beforeSend: function(request) {
             request.setRequestHeader("x-access-token", token);
           },
           async: false,//请求是否异步，默认为异步
           type: 'POST',
           dataType:'json',
           success: function (res) {
             if(res.status==200){
               _this.$Message.info('修改成功!')
               _this.getQuestion();
             }
             else{
               alert(res.message)
             }
           },
           error: function () {
           }});
       }
       else if(_this.currentTypeId==5){
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamQuestionBank',
            data: {
              id:_this.data9[_this.index1].id,
              titleName:_this.editor9.txt.html(),
              examQuestionBankTypeId:_this.currentTypeId,
              difficultyId:1,
              descriptions:_this.editor16.txt.html(),
              listOrder:_this.changeData.listOrder,
              optionA:_this.editor10.txt.html(),
              optionB:_this.editor11.txt.html(),
              optionC:_this.editor12.txt.html(),
              optionD:_this.editor13.txt.html(),
              optionE:_this.editor17.txt.html(),
              optionAnswerA:xuanA,
              optionAnswerB:xuanB,
              optionAnswerC:xuanC,
              optionAnswerD:xuanD,
              optionAnswerE:xuanE,
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'POST',
            dataType:'json',
            success: function (res) {
              if(res.status==200){
                _this.$Message.info('修改成功!')
                _this.getQuestion();
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
           url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamQuestionBank',
           data: {
             id:_this.data9[_this.index1].id,
             titleName:_this.editor9.txt.html(),
             examQuestionBankTypeId:_this.currentTypeId,
             difficultyId:1,
             descriptions:_this.editor16.txt.html(),
             listOrder:_this.changeData.listOrder,
             answer:_this.editor15.txt.html()
           },
           beforeSend: function(request) {
             request.setRequestHeader("x-access-token", token);
           },
           async: false,//请求是否异步，默认为异步
           type: 'POST',
           dataType:'json',
           success: function (res) {
             if(res.status==200){
               _this.$Message.info('修改成功!')
               _this.getQuestion();
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
      },
      /*修改题目*/
      change(index){
        var userId=sessionStorage.getItem('userId');
        this.index1=index;
        this.changeMessage=true;
        this.changeData.contents=this.data9[index].contents;
        this.changeData.listOrder=this.data9[index].listOrder;
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
        if(this.data9[index].contents){
          this.editor9.txt.html(this.data9[index].contents);
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
        if(this.data9[index].options){
          this.editor10.txt.html(this.data9[index].options[0].contents);
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
        if(this.data9[index].options!=undefined&&this.data9[index].options.length>=1){
          this.editor11.txt.html(this.data9[index].options[1].contents);
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
        if(this.data9[index].options!=undefined&&this.data9[index].options.length>=2){
          this.editor12.txt.html(this.data9[index].options[2].contents);
        }
        else{
          this.editor11.txt.html('');
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
        if(this.data9[index].options!=undefined&&this.data9[index].options.length>=3){
          this.editor13.txt.html(this.data9[index].options[3].contents);
        }
        else{
          this.editor13.txt.html('');
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
        if(this.data9[index].optionsAnswer){
          var da=[];
          for(let i=0;i<this.data9[index].optionsAnswer.length;i++){
            da.push(this.data9[index].optionsAnswer[i].contents)
          }
          this.editor15.txt.html(da.join(','));
        }
        else if(this.data9[index].contentsAnswer){
          this.editor15.txt.html(this.data9[index].contentsAnswer.answer);
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
        if(this.data9[index].descriptions){
          this.editor16.txt.html(this.data9[index].descriptions);
        }
        else{
          this.editor16.txt.html('');
        };
        if(this.currentTypeId==1){
          this.xuan=false;
          this.xuan1=true;
        }
        else if(this.currentTypeId==5){
          this.xuan=true;
          this.xuan1=true;
          this.editor17 = new Editor('#toolbar17','#cont17');
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
          this.editor17.create();
          if(this.data9[index].options!=undefined&&this.data9[index].options.length>4){
            this.editor17.txt.html(this.data9[index].options[4].contents);
          }
          else{
            this.editor17.txt.html('');
          }
        }
        else if(this.currentTypeId==2){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==3){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==4){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==6){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==7){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==8){
          this.xuan1=false;
          this.xuan=false;
        }
        else if(this.currentTypeId==9){
          this.xuan1=false;
          this.xuan=false;
        }


      },
      /*题型列表*/
      getTypeList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamQuestionBankTypeCurrent',
          data: {
            examPaperInfoId:localStorage.getItem('paperId')
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.typeList=[];
              _this.typeList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取对应题型题目*/
      getQuestion(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var id=sessionStorage.getItem('typeId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamQuestionBanks',
          data: {
            examPaperInfoId:localStorage.getItem('paperId'),
            examQuestionBankTypeId:_this.currentTypeId,
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
              if(res.data.list.length!=0){
                _this.data9=[];
                _this.data9=res.data.list;
                _this.pageSize=res.data.pageSize;
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      gernerateId(index){
        return "toolbar" +index
      },
      setContent(index){
        return "cont" +index
      },
      /*分页*/
      pageChange(index){
        this.currentPage=index;
        this.getQuestion();
      },
      /*删除题目*/
      remove (index) {
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamQuestionBank',
              data: {
                id:_this.data9[index].id,
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
                  _this.getQuestion();
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
  .change-modal p{
    margin-bottom: 5px;
  }
  .toolbar{
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    height: 30px;
    position: relative;
    z-index: 9999999999999999999999999999;
  }
  .w-e-toolbar .w-e-droplist{
    z-index:99999999999999999999999999999 ;
    background-color:#000000;
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
