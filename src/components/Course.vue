<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>院校管理</span>&gt;<span>课程管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入课程名字" style="width: auto" />
      <Button type="primary" class="add" @click="addMessage">添加课程</Button>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    </div>
    <div class="page">
      <Page :total="totalNum"   show-total show-elevator @on-change="pageChange"/>
    </div>
    <!--修改课程信息-->
    <Modal class="change-modal"
           title="修改信息"
           @on-ok="sureChange"
           @on-cancel="cancel"
           v-model="changeMessage"
           :mask-closable="false">
      <p><span class="first-title">专业名称:</span><Input v-model="changeMessageData.name" size="large" placeholder="课程名称" style="width: 200px" /></p>
      <p><span class="first-title">专业代码:</span><Input v-model="changeMessageData.code" size="large" placeholder="课程代码" style="width: 200px" /></p>
      <p><span class="first-title">类别:</span>
        <Select v-model="changeMessageData.categoryId" style="width:200px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p>
        <span class="first-title">课程类型:</span>
        <Select v-model="ChangeCourseD" style="width:200px">
          <Option v-for="item in courseTp" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
    <!--添加课程-->
    <Modal class="change-modal"
           title="添加课程"
           v-model="add"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">课程名称:</span><Input v-model="addData.name" size="large" placeholder="课程名称" style="width: 200px" /></p>
      <p><span class="first-title">课程代码:</span><Input v-model="addData.number" size="large" placeholder="课程代码" style="width: 200px" /></p>
      <p>
        <span class="first-title">类别:</span>
        <Select v-model="addData.default" style="width:200px">
        <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
      </p>
      <p>
        <span class="first-title">课程类型:</span>
        <Select v-model="courseD" style="width:200px">
          <Option v-for="item in courseTp" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'Course',
    created() {
      this.$store.state.showBottomNav = false,
      this.$store.state.showLogin = true,
      this.getCourseList();
    },
    data () {
      return {
        modal: false,
        changeMessage:false,
        searchType:'',
        totalNum:'',
        courseD:'',
        ChangeCourseD:'',
        courseTp:[
          {name:'公共课',value:1},
          {name:'核心课',value:2},
          {name:'选考课',value:3},
          {name:'毕业论文',value:4},
          ],
        typeList:[],
        currentPage:'',
        add:false,
        changeMessageData:{
          name:'',
          code: '',
          id:'',
          categoryId:''
        },
        addData:{
          default:'',
          name:'',
          number:'',
      },
        typeList:[

        ],
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '课程名称',
            key: 'school-name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '课程代码',
            key: 'code'
          },
          {
            title: '类别',
            key: 'categoryId'
          },
          {
            title: '课程类型',
            width: 400,
            align:'center',
            render: (h, params) => {
              let type='';
                if(params.row.type==1){
                  type='公共课'
              }
              if(params.row.type==2){
                type='核心课'
              }
              if(params.row.type==3){
                type='选修课'
              }
              if(params.row.type==4){
                type='毕业论文'
              }
              return h('span', {
                domProps: {
                  innerHTML:type
                }
              })
            }
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              let swiper=false;
              if(params.row.status==1){
                swiper=true
              }
              else{
                swiper=false;
              }
              return h('div', [
                h('i-switch', {
                    props: {
                      type: 'md-checkmark',
                      value:swiper
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-change': (value) => {
                        params.row.state = value;
                        this.forbidden(value,params.index);
                      }
                    },
                  },[
                    h('span', {
                      slot: 'open',
                      domProps: {
                        innerHTML: '启'
                      }
                    }),
                    h('span', {
                      slot: 'close',
                      domProps: {
                        innerHTML: '禁'
                      }
                    })
                  ]
                )
              ]);
            }
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
                }, '修改')
              ]);
            }
          }
        ],
        data6: []
      }
    },
    methods: {
      show (index) {
        var _this=this;
        this.$Modal.info({
          title: '修改信息',
          content:`<p>学校名称:${this.data6[index].name}</p><p>学校类别:${this.data6[index].type}</p><p>状态:${this.data6[index].state}</p><p>备注:${this.data6[index].note}</p>`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      /*修改课程*/
      change(index){
        var _this=this;
        _this.changeMessage=true;
        _this.changeMessageData.name=_this.data6[index].name;
        _this.changeMessageData.id=_this.data6[index].id;
        _this.changeMessageData.code=_this.data6[index].code;
        _this.changeMessageData.categoryId=_this.data6[index].categoryId;
        _this.ChangeCourseD=_this.data6[index].type;
        if(_this.data6[index].categoryId==1){
          _this.changeMessageData.categoryId='自考'
        }
        else if(_this.data6[index].categoryId==2){
          _this.changeMessageData.categoryId='成考'
        }
        else if(_this.data6[index].categoryId==4){
          _this.changeMessageData.categoryId='全日制自考'
        }
        else if(_this.data6[index].categoryId==8){
          _this.changeMessageData.categoryId='职业培训'
        }
        _this.getTypeList();

      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var categoryId='';
        if(_this.changeMessageData.categoryId=='自考'){
          categoryId=1
        }
        else if(_this.changeMessageData.categoryId=='成考'){
          categoryId=2
        }
        else if(_this.changeMessageData.categoryId=='全日制自考'){
          categoryId=4
        }
        else if(_this.changeMessageData.categoryId=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/updateCurriculum',
          data: {
            id :_this.changeMessageData.id,
            code :_this.changeMessageData.code,
            name:_this.changeMessageData.name,
            description:_this.changeMessageData.description,
            categoryId:categoryId,
            type:_this.ChangeCourseD

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
              _this.getCourseList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消修改*/
      cancel () {
        this.$Message.info('修改失败!');
      },
      /*添加课程弹框*/
      addMessage(index){
        this.add=true;
        this.typeList=[];
        this.addData=[];
        this.getTypeList();
      },
      /*确定添加课程*/
      sureAdd(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=_this.currentPage;
        var categoryId='';
        if(_this.addData.default=='自考'){
          categoryId=1
        }
        else if(_this.addData.default=='成考'){
          categoryId=2
        }
        else if(_this.addData.default=='全日制自考'){
          categoryId=4
        }
        else if(_this.addData.default=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/addCurriculum',
          data: {
            name:_this.addData.name,
            code:_this.addData.number,
            categoryId:categoryId,
            type:_this.courseD,
            status: 1
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
              _this.data6=[];
              _this.getCourseList();

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
        this.$Message.info('添加失败!');
      },
      /*获取课程列表*/
      getCourseList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=_this.currentPage;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCurriculumPage',
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
              _this.totalNum=res.data.pageSize;
              _this.data6=[];
              for(var i=0;i<res.data.list.length;i++){
                if(res.data.list[i].categoryId==1){
                    _this.data6.push(res.data.list[i]);
                    _this.data6[i].categoryId='自考';
                }
                else if(res.data.list[i].categoryId==2){
                  _this.data6.push(res.data.list[i]);
                  _this.data6[i].categoryId='成考';
                }
                else if(res.data.list[i].categoryId==4){
                  _this.data6.push(res.data.list[i]);
                  _this.data6[i].categoryId='全日制自考';
                }
                else if(res.data.list[i].categoryId==8){
                  _this.data6.push(res.data.list[i]);
                  _this.data6[i].categoryId='职业培训';
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
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getCourseList();
      },
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCurriculumByNamePage',
          data: {
            pageIndex :page,
            name:name
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
              _this.data6=res.data.list;
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
              _this.typeList=[];
              for(var i=0;i<res.data.list.length;i++){
                _this.typeList.push(res.data.list[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*禁用和启用*/
      forbidden(value,index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        var status=false;
        if(value==false){
          status=2;
        }
        else{
          status=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/setCurriculumStatus',
          data: {
            id:_this.data6[index].id,
            status: status
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
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      }
    }
  }
  //<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}
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
  .table-container{
    padding: 0 20px;
  }
  .page{
    margin-top: 30px;
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
</style>
