<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>考纲内容</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入知识点题目名称" style="width: auto" />
      <Button type="primary" class="add" @click="addPoint">添加知识点</Button>
    </div>
    <div class="tab-container">
      <div class="tab-top">
        <div class="tip">选择章节:</div>
        <div class="profession-container">
          <div v-for="(item,index) in chapterListData" :class="{selected:changed==index}" @click="selectedChapter(index)" v-html="item.title"></div>
        </div>
      </div>
    </div>
    <div class="tab-type">
      <Table :columns="columns10" :data="data9"></Table>
    </div>
    <!--添加知识点-->
    <Modal class="change-modal"
           title="添加知识点"
           v-model="add"
           width="800"
           @on-ok="addSure"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
        <div style="width: 670px">
          <div id="toolbar1" class="toolbar"></div>
          <p id="cont1" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">内容:</span>
        <div style="width: 670px">
          <div id="toolbar2" class="toolbar"></div>
          <p id="cont2" class="text">
          </p>
        </div>
      </div>
      <p><span class="first-title">排序:</span>
        <Input v-model="addData.listOrder" placeholder="序号"  style="width: 60px"  />
      </p>
    </Modal>
    <!--修改知识点-->
    <Modal class="change-modal"
           title="添加知识点"
           v-model="change"
           width="800"
           @on-ok="changeSure"
           @on-cancel="changeCancel"
           :mask-closable="false">
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
        <div style="width: 670px">
          <div id="toolbar3" class="toolbar"></div>
          <p id="cont3" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;">
        <span class="first-title" style="display: block;line-height:100px">内容:</span>
        <div style="width: 670px;">
          <div id="toolbar4" class="toolbar"></div>
          <p id="cont4" class="text" style="height: 400px">
          </p>
        </div>
      </div>
      <p><span class="first-title">排序:</span>
        <Input v-model="changeData.listOrder" placeholder="序号"  style="width: 60px"  />
      </p>
    </Modal>

  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  import ExaminationListContentText from './ExaminationListContentText.vue';
    export default {
        name: "ExaminationList",
        data(){
            return {
              index:'',
              changed:0,
              kaoGangId: this.$store.state.kaoGangId,
              add:false,
              addData:{title:'',contents:'',listOrder:''},
              change:false,
              professionDefault:'',
              courseDefault:'',
              professionList:[
                {value:'交通土建',label:'交通土建'},
                {value:'会计',label:'会计'}
              ],
              courseList:[
                {value:'工程项目管理',label:'工程项目管理'},
                {value:'中国近代史',label:'中国近代史'}
              ],
              columns10: [
                {
                  type: 'expand',
                  width: 50,
                  render: (h, params) => {
                    return h(ExaminationListContentText, {
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
                        innerHTML:params.row.title
                      }
                    })
                  }
                },
                {
                  title: '排序',
                  width: 60,
                  key:'listOrder',
                  align: 'center'
                },
                {
                  title: '操作',
                  width: 140,
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
                            this.changePoint(params.index)
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
              data9: [
                {
                  name:'马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是?',
                  text:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容'
                },
                {
                  name:'马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是?',
                  text:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容'
                },
                {
                  name:'马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是?',
                  text:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容'
                },
                {
                  name:'马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是马克思主义的根本理论特征是?',
                  text:'这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容'
                },
              ],
              defaultProfession:'交通土建',
              defaultCourse:'工程项目管理',
              changeData:{listOrder:""},
              chapterListData:[],//章节列表
            }
        },
        created() {
            this.$store.state.showBottomNav = false,
            this.$store.state.showLogin = true,
            this.chapterList();
            this.knowledgeList();
        },
        methods:{
          /*添加知识点*/
          addPoint(){
            this.add=true;
            this.editor1.txt.html(' ');
            this.editor2.txt.html(' ');
            this.addData.listOrder='';

          },
          /*确定添加*/
          addSure(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamLoreExercisesItemDetail',
              data: {
                examLoreExercisesItemId :_this.chapterListData[_this.changed].id,
                title: _this.editor1.txt.html(),
                contents:_this.editor2.txt.html(),
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
                  _this.$Message.info('添加成功!')
                  _this.knowledgeList();
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
            this.$Message.info('添加失败,请重新添加!')
          },
          /*修改知识点*/
          changePoint(index){
            this.change=true;
            this.index=index;
            this.changeData.listOrder=this.data9[index].listOrder;
            this.editor3.txt.html(this.data9[index].title)
            this.editor4.txt.html(this.data9[index].contents)
          },
          /*确定修改*/
          changeSure(index){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamLoreExercisesItemDetail',
              data: {
                id:_this.data9[_this.index].id,
                title: _this.editor3.txt.html(),
                contents:_this.editor4.txt.html(),
                listOrder:_this.changeData.listOrder
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
                  _this.knowledgeList();
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});

          },
          /*取消修改*/
          changeCancel(){
            this.$Message.info('修改失败,请重新修改!')
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
                  url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamLoreExercisesItemDetail',
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
                      _this.knowledgeList();
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
          /*章节列表*/
          chapterList(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesItems',
              data: {
                examLoreExercisesId:localStorage.getItem('paperId')
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'GET',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.chapterListData=res.data;
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});
          },
          /*选择章节*/
          selectedChapter(index){
            this.changed=index;
            this.knowledgeList();
          },
          /*章节知识点列表*/
          knowledgeList(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesItemDetails',
              data: {
                examLoreExercisesItemId :_this.chapterListData[_this.changed].id
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
          /*添加章节知识点*/
          AddKnowledge(){
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectExamLoreExercisesItemDetails',
              data: {
                examLoreExercisesItemId :_this.chapterListData[_this.changed].id
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


        },
        mounted(){
          var userId=sessionStorage.getItem('userId');
          this.editor1 = new Editor('#toolbar1','#cont1');
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
          ];

          this.editor2 = new Editor('#toolbar2','#cont2');
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

          this.editor3 = new Editor('#toolbar3','#cont3');
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

          this.editor4 = new Editor('#toolbar4','#cont4');
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
    height: 100px;
    width: 100%;
  }
  .w-e-text p{
    margin: 0!important;

  }
</style>
