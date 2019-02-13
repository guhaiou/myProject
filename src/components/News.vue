<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>内容管理</span>&gt;<span>新闻资讯管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" placeholder="请输入版本名称" style="width: auto;visibility:hidden" />
      <Button type="primary" class="add" @click="addMd">添加新闻咨询</Button>
    </div>
    <Table border :columns="columns7" :data="data6" style="margin: 20px"></Table>
    <div>
      <Page :total="pageSize"  show-total on-change="pageChange"/>
    </div>
    <!--添加课程-->
    <Modal class="change-modal"
           width="700"
           title="添加新闻列表"
           v-model="add"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <div>
          <p><span class="first-title" style="text-align: left;width: auto">标题:</span><Input v-model="addData.title" size="large" placeholder="标题" style="width: 200px" /></p>
          <p><span class="first-title" style="text-align: left;width: auto">作者:</span><Input v-model="addData.author" size="large" placeholder="作者" style="width: 200px" /></p>
        </div>
        <div>
          <p><span class="first-title">第三方外链:</span><Input v-model="addData.thirdUrl" size="large" placeholder="第三方外链" style="width: 200px" /></p>
          <p><span class="first-title">排序:</span><Input v-model="addData.listOrder" size="large" placeholder="排序" style="width: 200px" /></p>
        </div>
      </div>
      <div><p class="first-title" style="text-align: center">内容:</p>
        <div style="width: 670px">
          <div id="toolbar2" class="toolbar"></div>
          <p id="cont2" class="text" style="height:400px">

          </p>
        </div>
      </div>
    </Modal>
    <!--修改课程-->
    <Modal class="change-modal"
           width="700"
           title="修改新闻内容"
           v-model="changeMd"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <div style="display: flex;justify-content: space-around">
        <div>
          <p><span class="first-title" style="text-align: left;width: auto">标题:</span><Input v-model="changeData.title" size="large" placeholder="标题" style="width: 200px" /></p>
          <p><span class="first-title" style="text-align: left;width: auto">作者:</span><Input v-model="changeData.author" size="large" placeholder="作者" style="width: 200px" /></p>
        </div>
        <div>
          <p><span class="first-title">第三方外链:</span><Input v-model="changeData.thirdUrl" size="large" placeholder="第三方外链" style="width: 200px" /></p>
          <p><span class="first-title">排序:</span><Input v-model="changeData.listOrder" size="large" placeholder="排序" style="width: 200px" /></p>
        </div>
      </div>
      <div><p class="first-title" style="text-align: center">内容:</p>
        <div style="width: 670px">
          <div id="toolbar1" class="toolbar"></div>
          <p id="cont1" class="text" style="height:400px">

          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  export default {
    name: "News",
    data(){
      return {
        index:'',
        add:false,
        changeMd:false,
        currentPage:1,
        defaultType:'',
        pageSize:'',
        columns7: [
          {
            title: '标题',
            key: 'title',
            align:'center',
            width:280
          },
          {
            title: '内容',
            render: (h, params) => {
              return h('span', {
                domProps: {
                  innerHTML:params.row.contents
                }
              })
            }
          },
          {
            title: '第三方外链',
            key: 'thirdUrl',
            align:'center',
            width:200
          },
          {
            title: '作者',
            key: 'author',
            align:'center',
            width:100
          },
          {
            title: '排序',
            key: 'listOrder',
            align:'center',
            width:100
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
          title:'',
          contents:'',
          author:'',
          thirdUrl:'',
          listOrder:''
        },
        changeData:{
          title:'',
          contents:'',
          author:'',
          thirdUrl:'',
          listOrder:''
        }
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/selectNewsInformations',
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
              _this.data6=res.data.list;
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
        this.addData=[];
        this.editor1.txt.html('');
      },
      /*确定添加*/
      sureAdd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/addNewsInformation',
          data: {
            title:_this.addData.title,
            contents:this.editor2.txt.html(),
            author:_this.addData.author,
            type:0,
            thirdUrl:_this.addData.thirdUrl,
            listOrder:_this.addData.listOrder,
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
      /*修改*/
      change(index){
        var userId=sessionStorage.getItem('userId');
        this.index=index;
        this.changeMd=true;
        this.changeData=[];
        this.changeData.title =this.data6[index].title;
        this.changeData.contents=this.data6[index].contents;
        this.changeData.author=this.data6[index].author;
        this.changeData.thirdUrl=this.data6[index].thirdUrl;
        this.changeData.listOrder=this.data6[index].listOrder;
        this.editor1.txt.html(this.changeData.contents);

      },
      /*确定修改*/
      sureChange(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/updateNewsInformation',
          data: {
            id:_this.data6[_this.index].id,
            title:_this.changeData.title,
            contents:_this.editor1.txt.html(),
            author:_this.changeData.author,
            type:0,
            thirdUrl:_this.changeData.thirdUrl,
            listOrder:_this.changeData.listOrder,
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/content/delNewsInformation',
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
    },
    mounted() {
      var userId=sessionStorage.getItem('userId');
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
  .toolbar{
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    height: 30px;
  }
  .text {
    border: 1px solid #ccc;
    border-top: none;
    height: 180px;
    z-index: 10000;
    width: 100%;
  }
</style>
