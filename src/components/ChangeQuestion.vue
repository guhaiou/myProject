<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>题目纠错</span></div>
    <div class="subcontainer">
      <Table class="table-class" border   :columns="columns1"  :data="data1"></Table>
      <div class="page">
        <Page :total="pageSize" show-total="" show-elevator />
      </div>
    </div>
    <!--修改信息-->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           width="800"
           @on-ok="changeSure"
           :mask-closable="false">
      <div style="display: flex;position: relative;z-index: 10">
        <span class="first-title" style="display: block;line-height:100px">题目:</span>
        <div style="width: 670px">
          <div id="toolbar9" class="toolbar"></div>
          <p id="cont9" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz1">
        <span class="first-title" style="display: block;margin-top: 40px">选项A:</span>

        <div style="width: 670px">
          <div id="toolbar10" class="toolbar"></div>
          <p id="cont10" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz2">
        <span class="first-title" style="display: block;margin-top: 40px">选项B:</span>
        <div style="width: 670px">
          <div id="toolbar11" class="toolbar"></div>
          <p id="cont11" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz3">
        <span class="first-title" style="display: block;margin-top: 40px">选项C:</span>
        <div style="width: 670px">
          <div id="toolbar12" class="toolbar"></div>
          <p id="cont12" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz4">
        <span class="first-title" style="display: block;margin-top: 40px">选项D:</span>
        <div style="width: 670px">
          <div id="toolbar13" class="toolbar"></div>
          <p id="cont13" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz7">
        <span class="first-title" style="display: block;margin-top: 40px">选项E:</span>
        <div style="width: 670px">
          <div id="toolbar17" class="toolbar"></div>
          <p id="cont17" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz5">
        <span class="first-title" style="display: block;line-height:100px">正确答案:</span>
        <div style="width: 670px">
          <div id="toolbar15" class="toolbar"></div>
          <p id="cont15" class="text">

          </p>
        </div>
      </div>
      <div style="display: flex;" v-show="kz6">
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
  export default {
    name: "ChangeQuestion",
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getTypeList();
    },
    data(){
      return {
        kz1:true,
        kz2:true,
        kz3:true,
        kz4:true,
        kz5:true,
        kz6:true,
        kz7:true,
        index1:'',
        singleA:'',
        singleB:'',
        singleC:'',
        singleD:'',
        add:false,
        changeMessage:false,
        currentPage:1,
        typeList:[],
        currentTypeId:'',
        pageSize:'',
        changeMsg:[],
        columns1: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '纠错内容',
            key: 'contents'
          },
          {
            title: '时间',
            key: 'createAt'
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
                }, '纠错'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
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
        data1: [],
        addData:{
          title:'',
          detail:''
        },
        changeData:{listOrder:''}
      }
    },
    methods: {
      /*修改*/
      changeSure(){

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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delSubjectErrorCorrection',
              data: {
                id:_this.data1[index].id,
              },
              beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
              },
              async: false,//请求是否异步，默认为异步
              type: 'POST',
              dataType:'json',
              success: function (res) {
                if(res.status==200){
                  _this.data1=[];
                  _this.$Message.info('已删除!');
                  _this.getTypeList();
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
      /*获取批次列表*/
      getTypeList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSubjectErrorCorrections',
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
                _this.data1.push(res.data.list[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*修改类别*/
      change(index){
        var _this=this;
        _this.changeMessage=true;
        this.TypeList();
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        if(_this.data1[index].type==4||_this.data1[index].type==5){
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectAutoSubjectById',
            data: {
              id:_this.data1[index].bussinessId,
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'GET',
            dataType:'json',
            success: function (res) {
              if(res.status==200){
                _this.changeMsg=res.data;
                if(_this.changeMsg.autoSubtypeId==19){
                  _this.kz1=false;
                  _this.kz2=false;
                  _this.kz3=false;
                  _this.kz4=false;
                  _this.kz5=true;
                  _this.kz6=false;
                  _this.kz7=false;
                  _this.editor9.txt.html(_this.changeMsg.name);
                  _this.editor15.txt.html(_this.changeMsg.rightAnswer);
                }
                if(_this.changeMsg.autoSubtypeId==12){
                  _this.kz1=true;
                  _this.kz2=true;
                  _this.kz3=true;
                  _this.kz4=true;
                  _this.kz5=true;
                  _this.kz6=true;
                  _this.kz6=false;
                  _this.editor9.txt.html(_this.changeMsg.name);
                  _this.editor10.txt.html(_this.changeMsg.optionsList[0].name);
                  _this.editor11.txt.html(_this.changeMsg.optionsList[1].name);
                  _this.editor12.txt.html(_this.changeMsg.optionsList[2].name);
                  _this.editor13.txt.html(_this.changeMsg.optionsList[3].name);
                  _this.editor15.txt.html(_this.changeMsg.rightAnswer);
                  _this.editor16.txt.html(_this.changeMsg.analysis);
                }
                if(_this.changeMsg.autoSubtypeId==13){
                  _this.kz1=true;
                  _this.kz2=true;
                  _this.kz3=true;
                  _this.kz4=true;
                  _this.kz5=true;
                  _this.kz6=true;
                  _this.kz7=true;
                  _this.editor9.txt.html(_this.changeMsg.name);
                  _this.editor10.txt.html(_this.changeMsg.optionsList[0].name);
                  _this.editor11.txt.html(_this.changeMsg.optionsList[1].name);
                  _this.editor12.txt.html(_this.changeMsg.optionsList[2].name);
                  _this.editor13.txt.html(_this.changeMsg.optionsList[3].name);
                  _this.editor15.txt.html(_this.changeMsg.rightAnswer);
                  _this.editor16.txt.html(_this.changeMsg.analysis);
                  _this.editor17.txt.html(_this.changeMsg.optionsList[4].name);
                }
                else if(_this.changeMsg.autoSubtypeId==14||_this.changeMsg.autoSubtypeId==15||_this.changeMsg.autoSubtypeId==16||_this.changeMsg.autoSubtypeId==17){
                  _this.kz1=false;
                  _this.kz2=false;
                  _this.kz3=false;
                  _this.kz4=false;
                  _this.kz5=true;
                  _this.kz6=false;
                  _this.kz7=false;
                  _this.editor9.txt.html(_this.changeMsg.name);
                  _this.editor15.txt.html(_this.changeMsg.rightAnswer);
                }
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        }
      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/addBatch',
          data: {
            name:_this.changeMessageData.name,
            description:_this.changeMessageData.description
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
              _this.data6=[];
              _this.getTypeList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*题型列表*/
      TypeList(){
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
    },
    mounted(){
      this.editor9 = new Editor('#toolbar9','#cont9');
      this.editor10 = new Editor('#toolbar10','#cont10');
      this.editor11 = new Editor('#toolbar11','#cont11');
      this.editor12 = new Editor('#toolbar12','#cont12');
      this.editor13 = new Editor('#toolbar13','#cont13');
      this.editor14 = new Editor('#toolbar14','#cont14');
      this.editor15 = new Editor('#toolbar15','#cont15');
      this.editor16 = new Editor('#toolbar16','#cont16');
      this.editor17 = new Editor('#toolbar17','#cont17');
      var userId=sessionStorage.getItem('userId');
      this.changeData.contents=this.data1.contents;
      this.changeData.listOrder=this.data1.listOrder;
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
      if(this.data1.contents){
        this.editor9.txt.html(this.data1.contents);
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
      if(this.data1.options){
        this.editor10.txt.html(this.data1.options[0].contents);
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
      if(this.data1.options!=undefined&&this.data1.options.length>=1){
        this.editor11.txt.html(this.data1.options[1].contents);
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
      if(this.data1.options!=undefined&&this.data1.options.length>=2){
        this.editor12.txt.html(this.data1.options[2].contents);
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
      if(this.data1.options!=undefined&&this.data1.options.length>=3){
        this.editor13.txt.html(this.data1.options[3].contents);
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
      if(this.data1.optionsAnswer){
        var da=[];
        for(let i=0;i<this.data1.optionsAnswer.length;i++){
          da.push(this.data1.optionsAnswer[i].contents)
        }
        this.editor15.txt.html(da.join(','));
      }
      else if(this.data1.contentsAnswer){
        this.editor15.txt.html(this.data1.contentsAnswer.answer);
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
      if(this.data1.options!=undefined&&this.data1.options.length>=3){
        this.editor16.txt.html(this.data1.options[3].contents);
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
      this.editor17.create();
      if(this.data1.options!=undefined&&this.data1.options.length>=3){
        this.editor17.txt.html(this.data1.options[3].contents);
      }
      else{
        this.editor17.txt.html('');
      }


        }
  }
</script>

<style scoped>
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
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .search-input{
    margin-left: 20px;
  }
  .add{
    margin-right: 20px;
  }
  .subcontainer{
    padding: 30px 20px;

  }
  .change-modal p{
    margin-bottom: 10px;
  }
  .first-title{
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 5px;
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
  .top-head span{
    margin-right: 5px;
    cursor: pointer;
  }
  .table-class{
    margin: 0 auto;
  }
  .page{
    margin-top: 30px;
  }
  .toolbar{
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    height: 30px;
    position: relative;
    z-index: 9999999999999999999999999999;
  }
  .text{
    border: 1px solid #ccc;
    border-top: none;
    height: 180px;
    z-index: 10000;
    width: 100%;
  }
</style>
