<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>招生管理</span>&gt;<span>学生列表</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入学生名字" style="width: auto" />
      <div style="display: inline-block;visibility: hidden">
        <Button type="primary" class="add" @click="addMd">添加学生</Button>
        <Button type="primary" class="add" @click="upMd">批量导入</Button>
      </div>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    </div>
    <div class="page">
      <Page :total="totalNum"   show-total show-elevator @on-change="pageChange"/>
    </div>
    <!--添加课程信息-->
    <Modal class="change-modal"
           title="添加学生"
           width="900"
           @on-ok="sureAdd"
           @on-cancel="cancel"
           v-model="addMessage"
           :mask-closable="false">
      <div style="display: flex">
        <p><span class="first-title">学生姓名:</span><Input v-model="addMessageData.name" size="large" placeholder="课程名称" style="width: 200px" /></p>
        <p><span class="first-title">所属站点:</span>
          <Select v-model="addMessageData.branchName" style="width:200px">
            <Option v-for="item in siteList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">类别:</span>
          <Select v-model="addMessageData.categoryName" style="width:200px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">专业:</span>
          <Select v-model="addMessageData.professionalName" style="width:200px">
            <Option v-for="item in Profession" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">层次:</span>
          <Select v-model="addMessageData.educationalName" style="width:200px">
            <Option v-for="item in CcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">批次:</span>
          <Select v-model="addMessageData.batchName" style="width:200px">
            <Option v-for="item in PcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">电话:</span><Input v-model="addMessageData.phone" size="large" placeholder="电话" style="width: 200px" /></p>
        <p><span class="first-title">学校:</span>
          <Select v-model="addMessageData.schoolName" style="width:200px">
            <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">学生状态:</span>
          <Select v-model="addMessageData.studentStatusName" style="width:200px">
            <Option v-for="item in studentStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">QQ:</span><Input v-model="addMessageData.qq" size="large" placeholder="电话" style="width: 200px" /></p>
        <p><span class="first-title">性别:</span>
          <Select v-model="addMessageData.sex" style="width:200px">
            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">所属老师:</span>
          <Select v-model="addMessageData.adminName" style="width:200px">
            <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.userName }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">省份证:</span><Input v-model="addMessageData.cardNumber" size="large" placeholder="省份证" style="width: 200px" /></p>
        <p><span class="first-title">注册端口:</span>
          <Select v-model="addMessageData.registerPointId" style="width:200px">
            <Option v-for="item in RegisterPoints" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">考籍号:</span><Input v-model="addMessageData.examNumber" size="large" placeholder="考籍号" style="width: 200px" /></p>
      </div>
    </Modal>
    <!--修改课程信息-->
    <Modal class="change-modal"
           title="修改信息"
           width="900"
           @on-ok="sureChange"
           @on-cancel="cancel"
           v-model="changeMessage"
           :mask-closable="false">
      <div style="display: flex">
        <p><span class="first-title">学生姓名:</span><Input v-model="changeMessageData.name" size="large" placeholder="课程名称" style="width: 200px" /></p>
        <p><span class="first-title">所属站点:</span>
          <Select v-model="changeMessageData.branchName" style="width:200px">
            <Option v-for="item in siteList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">类别:</span>
          <Select v-model="changeMessageData.categoryName" style="width:200px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">专业:</span>
          <Select v-model="changeMessageData.professionalName" style="width:200px">
            <Option v-for="item in Profession" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">层次:</span>
          <Select v-model="changeMessageData.educationalName" style="width:200px">
            <Option v-for="item in CcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">批次:</span>
          <Select v-model="changeMessageData.batchName" style="width:200px">
            <Option v-for="item in PcList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">电话:</span><Input v-model="changeMessageData.phone" size="large" placeholder="电话" style="width: 200px" /></p>
        <p><span class="first-title">学校:</span>
          <Select v-model="changeMessageData.schoolName" style="width:200px">
            <Option v-for="item in schoolList" :value="item.id" :key="item.name">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">学生状态:</span>
          <Select v-model="changeMessageData.studentStatusName" style="width:200px">
            <Option v-for="item in studentStatus" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">QQ:</span><Input v-model="changeMessageData.qq" size="large" placeholder="电话" style="width: 200px" /></p>
        <p><span class="first-title">性别:</span>
          <Select v-model="changeMessageData.sex" style="width:200px">
            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </p>
        <p><span class="first-title">所属老师:</span>
          <Select v-model="changeMessageData.adminName" style="width:200px">
            <Option v-for="item in teacherList" :value="item.id" :key="item.id">{{ item.userName }}</Option>
          </Select>
        </p>
      </div>
      <div style="display: flex">
        <p><span class="first-title">考籍号:</span><Input v-model="changeMessageData.examNumber" size="large" placeholder="电话" style="width: 200px" /></p>
        <p><span class="first-title">省份证:</span><Input v-model="changeMessageData.cardNumber" size="large" placeholder="电话" style="width: 200px" /></p>
      </div>
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
    </Modal>
    <!--批量添加-->
    <Modal class="change-modal"
           title="批量导入学生"
           v-model="moreMd"
           @on-ok=""
           @on-cancel=""
           :mask-closable="false">
      <Upload
        multiple
        type="drag"
        :action="actionUrl" ref="upload"  :on-progress="handleProgress" :on-success="handleSuccess" :data="updata">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>学生批量导入</p>
        </div>
      </Upload>
      <a style="display: block" href="#">查看批量导入模板</a>
    </Modal>

  </div>
</template>

<script>
  export default {
    name:'TeacherStudent',
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getStudentList();
    },
    data () {
      return {
        studyMd:false,
        updata:{file:''},
        actionUrl:'',
        addData:{
          fileName :'',
          filePath  :'',
          systemStudentFileDataTypeId:'2',
        },
        moreMd:false,
        modal: false,
        addMessage:false,
        changeMessage:false,
        searchType:'',
        totalNum:'',
        typeList:[],
        currentPage:1,
        add:false,
        changeMessageData:{
          name:'',
          branchName: '',
          categoryName:'',
          professionalName:'',
          educationalName:'',
          studentStatusName:'',
          batchName:'',
          phone:'',
          sex:'',
          adminName:'',
          qq:'',
          schoolName:'',
          id:'',
          cardNumber:'',
          examNumber:''
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
            title: '学生姓名',
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
            title: '所属站点',
            key: 'branchName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.branchName)
              ]);
            }
          },
          {
            title: '所属老师',
            key: 'branchName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.adminName)
              ]);
            }
          },
          {
            title: '考籍号',
            key: 'examNumber'
          },
          {
            title: '类别',
            key: 'categoryName'
          },
          {
            title: '层次',
            key: 'educationalName'
          },
          {
            title: '专业',
            key: 'professionalName'
          },
          {
            title: '批次',
            key: 'batchName'
          },
          {
            title: '报考学校',
            key: 'schoolName'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除'),
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
                      this.study(params.index)
                    }
                  }
                }, '学习记录'),
              ]);
            }
          }
        ],
        data6: [],
        currentPage:'1',
        siteList:[],
        CcList:[],
        categoryId:'',
        PcList:[],
        schoolList:[],
        studentStatus:[],
        sex:[
          {name:'男',value:'1'},
          {name:'女',value:'0'}
        ],
        teacherList:[],
        Profession:[],
        RegisterPoints:[],
        addMessageData:{
          name:'',
          schoolName:'',
          branchName: '',
          categoryName:'',
          professionalName:'',
          educationalName:'',
          batchName:'',
          phone:'',
          sex:'',
          adminName:'',
          qq:'',
          cardNumber:'',
          examNumber:'',
          registerPointId:''
        },
        studyData:[]
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
        _this.changeMessageData.adminName=_this.data6[index].adminId;
        _this.changeMessageData.batchName=_this.data6[index].batchId;
        _this.changeMessageData.branchName=_this.data6[index].branchId;
        _this.changeMessageData.categoryName=_this.data6[index].categoryId;
        _this.changeMessageData.educationalName=_this.data6[index].educational;
        _this.changeMessageData.name=_this.data6[index].name;
        _this.changeMessageData.phone=_this.data6[index].phone;
        _this.changeMessageData.professionalName=_this.data6[index].professionalId;
        _this.changeMessageData.qq=_this.data6[index].qq;
        _this.changeMessageData.schoolName=_this.data6[index].schoolId;
        _this.changeMessageData.studentStatusName=_this.data6[index].studentStatusId;
        _this.changeMessageData.sex=_this.data6[index].sex;
        _this.changeMessageData.id=_this.data6[index].id;
        _this.changeMessageData.cardNumber=_this.data6[index].cardNumber;
        _this.changeMessageData.examNumber =_this.data6[index].examNumber;
        _this.getTypeList();
        _this.getZdList();
        _this.getCcList();
        _this.getPcList();
        _this.getSchoolList();
        _this.getStudentStateList();
        _this.getTeacherList();
        _this.showProfession();
        _this.selectRegisterPoints();

      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/updateStudentInfos',
          data: {
            id :_this.changeMessageData.id,
            name:_this.changeMessageData.name,
            cardNumber :_this.changeMessageData.cardNumber,
            examNumber:_this.changeMessageData.examNumber,
            adminId:_this.changeMessageData.adminName,
            professionalId:_this.changeMessageData.professionalName,
            schoolId:_this.changeMessageData.schoolName,
            categoryId:_this.changeMessageData.categoryName,
            branchId:_this.changeMessageData.branchName,
            studentStatusId:_this.changeMessageData.studentStatusName,
            sex:_this.changeMessageData.sex,
            nation :' ',
            batchId:_this.changeMessageData.batchName,
            phone :_this.changeMessageData.phone,
            educational:_this.changeMessageData.educationalName,
            qq :_this.changeMessageData.qq,
            email:' ',
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
              _this.getStudentList();
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
      addMd(index){
        this.addMessage=true;
        var _this=this;
        _this.getTypeList();
        _this.getZdList();
        _this.getCcList();
        _this.getPcList();
        _this.getSchoolList();
        _this.getStudentStateList();
        _this.getTeacherList();
        _this.showProfession();
        _this.selectRegisterPoints();
      },
      /*确定添加课程*/
      sureAdd(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/addStudentInfos',
          data: {
            name :_this.addMessageData.name,
            cardNumber :_this.addMessageData.cardNumber,
            examNumber :_this.addMessageData.examNumber,
            adminId : _this.addMessageData.adminName,
            professionalId:_this.addMessageData.professionalName,
            schoolId :_this.addMessageData.schoolName,
            categoryId  :_this.addMessageData.categoryName,
            branchId:_this.addMessageData.branchName,
            registerPointId:_this.addMessageData.registerPointId,
            studentStatusId :_this.addMessageData.studentStatusName,
            sex:_this.addMessageData.sex,
            nation :'',
            batchId  :_this.addMessageData.batchName,
            phone:_this.addMessageData.phone,
            educational :_this.addMessageData.educationalName,
            qq:_this.addMessageData.qq,
            email :'',
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
              _this.getStudentList();

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
      getStudentList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudentInfosByTeacher',
          data: {
            name:'',
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
              _this.totalNum=res.data.pageSize;
              _this.data6=[];
              _this.data6=res.data.list;
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
        this.getStudentList();
      },
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        _this.currentPage=1;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudentInfosByTeacher',
          data: {
            pageIndex :_this.currentPage,
            name:_this.searchType
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
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCategorysPage',
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
      /*站点列表*/
      getZdList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectBranchsPage',
          data: {
            pageIndex:1,
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.siteList=[];
              _this.siteList=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*层次列表*/
      getCcList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectEducationals',
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
              _this.CcList=[];
              _this.CcList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取批次列表*/
      getPcList(){
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
              for(var i=0;i<res.data.length;i++){
                _this.PcList.push(res.data[i]);
              }
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*获取学校列表*/
      getSchoolList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolPage',
          data: {
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
              _this.pageSize=res.data.pageSize;
              _this.schoolList=[];
              for(var i=0;i<res.data.list.length;i++){
                if(res.data.list[i].categoryId==1){
                  _this.schoolList.push(res.data.list[i]);
                  _this.schoolList[i].categoryId='自考';
                }
                else if(res.data.list[i].categoryId==2){
                  _this.schoolList.push(res.data.list[i]);
                  _this.schoolList[i].categoryId='成考';
                }
                else if(res.data.list[i].categoryId==4){
                  _this.schoolList.push(res.data.list[i]);
                  _this.schoolList[i].categoryId='全日制自考';
                }
                else if(res.data.list[i].categoryId==8){
                  _this.schoolList.push(res.data.list[i]);
                  _this.schoolList[i].categoryId='职业培训';
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
      /*获取学生状态列表*/
      getStudentStateList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectStudentStatus',
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
      /*显示专业*/
      showProfession(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolProfession',
          data: {
            schoolId:1
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.Profession=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*注册端口*/
      selectRegisterPoints(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/system/selectRegisterPoints',
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
              _this.RegisterPoints=res.data;
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
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/delStudentInfo',
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
                  _this.getStudentList();
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
        this.updata.file=res.data;
      },
      handleProgress ( event, file, fileList) {

      },
      /*上传弹框*/
      upMd(){
        var userId=sessionStorage.getItem('userId');
        this.moreMd=true;
        this.actionUrl='http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/importStudentInfoExcel';
      },
      /*学习记录*/
      study(index){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var studentDate=JSON.stringify({name:this.data6[index].name,profession:this.data6[index].professionalName});
        localStorage.setItem('studentDate',studentDate);
        this.$router.push({ name:'studentState'});
        /*var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/study/selectStudentStudyRecords',
          data: {
            loginName:_this.data6[index].loginName,
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
              _this.studyData=res.data.list;
              console.log(res)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});*/
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
