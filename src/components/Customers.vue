<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>招生管理</span>&gt;<span>客户管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input"  v-model="searchType"  @on-change="search" placeholder="请输入课程名字" style="width: auto;visibility: hidden" />
      <Button type="primary" class="add" @click="addMessage">添加客户</Button>
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
      <p>
        <span class="first-title">客户状态:</span>
        <Select v-model="studentStatusdefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in studentStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
    <!--添加课程-->
    <Modal class="change-modal"
           title="添加课程"
           v-model="add"
           @on-ok="sureAdd"
           width="615"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <div style="display: flex">
        <p><span class="first-title">客户姓名:</span><Input v-model="addData.name" size="large" placeholder="客户姓名" style="width: 200px" /></p>
        <p><span class="first-title">联系电话:</span><Input v-model="addData.number" size="large" placeholder="联系电话" style="width: 200px" /></p>
      </div>
      <div style="display: flex">
      <p>
        <span class="first-title">所属老师:</span>
        <Select v-model="teacher" style="width:200px;margin-left: -3px">
          <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.userName }}</Option>
        </Select>
      </p>
      <p>
        <span class="first-title">客户状态:</span>
        <Select v-model="studentStatusdefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in studentStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </p>
    </div>
      <div style="display: flex">
        <p>
          <span class="first-title">招生来源:</span>
          <Select v-model="originListDefault" style="width:200px;margin-left: -3px">
            <Option v-for="item in originList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <p>
        <span class="first-title">客户介绍:</span>
        <Input v-model="introduce" type="textarea" placeholder="客户介绍" style="width: 480px;display: inline-block;margin-left: -3px" />
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'Customers',
    created() {
      this.$store.state.showBottomNav = false,
        this.$store.state.showLogin = true,
        this.getCourseList();
        this.getStudentStateList();
    },
    data () {
      return {
        teacher:'',
        teacherList:[],
        studentStatus:[],
        studentStatusdefault:'',
        originList:'',
        originListDefault:'',
        introduce:'',
        modal: false,
        changeMessage:false,
        searchType:'',
        totalNum:'',
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
            title: '客户姓名',
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
            title: '联系电话',
            key: 'mobileNo'
          },
          {
            title: '客户状态',
            key: 'crmStageName'
          },
          {
            title: '客户来源',
            key: 'crmFromTypeName'
          },
          {
            title: '客户情况描述',
            key: 'descriptions'
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
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
                      this.changeStatus(params.index)
                    }
                  }
                }, '转化成功'),
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
                      this.remove(params.index)
                    }
                  }
                }, '删除')
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/delCustomer',
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
                  _this.getCourseList();
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
      /*修改课程*/
      change(index){
        var _this=this;
        _this.changeMessage=true;
        _this.changeMessageData.name=_this.data6[index].name;
        _this.changeMessageData.id=_this.data6[index].id;
        _this.changeMessageData.code=_this.data6[index].code;
        _this.changeMessageData.categoryId=_this.data6[index].categoryId;
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
            categoryId:categoryId

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
        this.getOrigin();
        this.getTeacherList();
        this.getStudentStateList();
      },
      /*确定添加课程*/
      sureAdd(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/addCustomers',
          data: {
            adminId :_this.teacher,
            name:_this.addData.name,
            mobileNo :_this.addData.number,
            crmStageId : _this.studentStatusdefault,
            crmFromTypeId:_this.originListDefault,
            descriptions:_this.introduce
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/selectCustomers',
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
              _this.data6=res.data.list;
              console.log( _this.data6)

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
      },
      /*获取老师列表*/
      getTeacherList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/admin/selectAdmins',
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
              _this.teacherList=[];
              _this.teacherList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取客户状态*/
      getStudentStateList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/selectCrmStages',
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
              _this.studentStatus=[];
              _this.studentStatus=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取招生来源*/
      getOrigin(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/selectCrmFromTypes',
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
              _this.originList=[];
              _this.originList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*改变状态*/
      changeStatus(index){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/customer/updateCustomerStatus',
          data: {
            id :_this.data6[index].id,
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
