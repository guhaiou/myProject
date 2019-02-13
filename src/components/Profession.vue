<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>院校管理</span>&gt;<span>专业管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="searchType" @on-change="search" placeholder="请输入专业名字" style="width: auto" />
      <Button type="primary" class="add" @click="addMessage">添加专业</Button>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="professionList"></Table>
    </div>
    <div class="page">
      <Page :total="pageSize" show-total show-elevator @on-change="pageChange" />
    </div>
    <!--选择课程-->
    <Modal
      title="选择课程"
      v-model="modal"
      width="1000"
      @on-ok="changeCourse"
      @on-cancel="cancelCourse"
      :mask-closable="false">
        <CheckboxGroup v-model="selectedCourse" >
          <Checkbox v-for="item in allCourse" :label="item.id">{{item.name}}</Checkbox>
        </CheckboxGroup>
    </Modal>
    <!--修改信息-->
    <Modal class="change-modal"
      title="修改信息"
      v-model="changeMessage"
      @on-ok="sureChange"
      @on-cancel="cancelChange"
      :mask-closable="false">
      <p><span class="first-title">专业名称:</span><Input v-model="changeData.name" size="large" placeholder="专业名称" style="width: 200px" /></p>
      <p><span class="first-title">专业代码:</span><Input v-model="changeData.number" size="large" placeholder="专业代码" style="width: 200px" /></p>
      <p><span class="first-title">类别:</span>
        <Select v-model="changeData.typDefault" style="width:200px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">所属学校:</span>
        <Select v-model="changeData.schoolId" style="width:200px">
          <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
    <!--添加专业-->
    <Modal class="change-modal"
           title="添加专业"
           v-model="add"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">专业名称:</span><Input v-model="addData.name" size="large" placeholder="专业名称" style="width: 200px;" /></p>
      <p><span class="first-title">专业代码:</span><Input v-model="addData.number" size="large" placeholder="专业代码" style="width: 200px" /></p>
      <p><span class="first-title">类别:</span>
        <Select v-model="addData.typDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">所属学校:</span>
        <Select v-model="addData.schoolDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'Profession',
    created() {
        this.$store.state.showBottomNav = false;
        this.$store.state.showLogin = true;
        this.getProfessionList();
    },
    data () {
      return {
        modal: false,
        index:'',
        changeMessage:false,
        searchType:'',
        typeList:[],//类别列表
        schoolList:[],
        pageSize:'',
        selectPage:'1',
        professionList:[],//专业列表
        allCourse:[],
        selectedCourse:[],
        add:false,
        checkAllGroup: [
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
        changeData:{
          name: '',
          number: '',
          type: '',
          state:'',
          schoolId:'',
          typDefault:'',
          schoolDefault:''
        },
        addData:{
          name:'',
          number: '',
          state:'',
          school:'',
          typDefault:'',
          schoolDefault:''
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '专业名称',
            key: 'school-name',
            align: 'center',
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
            title: '专业代码',
            key: 'code',
            align: 'center',
          },
          {
            title: '所属类别',
            key: 'categoryId',
            align: 'center',
          },
          {
            title: '所属院校',
            key: 'schoolName',
            align: 'center',
          },
          {
            title:'课程' ,
            key:'course',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    margin: '5px'
                  },
                  on: {
                    click: () => {
                      this.course(params.index)
                    }
                  }
                }, '课程'),
              ]);
            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
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
        ]
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
      course(index){
        this.modal=true;
        this.index=index;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectProfessionCurriculum',
          data: {
            professionId :_this.professionList[index].id

          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.allCourse=res.data;
              _this.selectedCourse=[];
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.selectedCourse.push(res.data[i].id);
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
      /*修改弹框*/
      change(index){
          this.getTypeList();
          this.getSchoolList();
          this.changeMessage=true;
          this.changeData.name=this.professionList[index].name;
          this.changeData.id=this.professionList[index].id;
          this.changeData.number =this.professionList[index].code ;
          this.changeData.categoryId  =this.professionList[index].categoryId;
          this.changeData.schoolId  =this.professionList[index].schoolId;
          this.changeData.typDefault  =this.professionList[index].categoryId;
          this.changeData.schoolDefault  =this.professionList[index].schoolName;
      },
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var categoryId='';
        console.log(_this.professionList)
        if(_this.changeData.typDefault=='自考'){
          categoryId=1

        }
        else if(_this.changeData.typDefault=='成考'){
          categoryId=2
        }
        else if(_this.changeData.typDefault=='全日制自考'){
          categoryId=4
        }
        else if(_this.changeData.typDefault=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/updateProfession',
          data: {
            id :_this.changeData.id,
            code :_this.changeData.code,
            name:_this.changeData.name,
            description:_this.changeData.description,
            categoryId:categoryId,
            schoolId:_this.changeData.schoolId,
            code: _this.changeData.number

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
              _this.getProfessionList();
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
      addMessage(index){
        this.add=true;
        this.getSchoolList();
        this.getTypeList();
      },
      /*确定添加*/
      sureAdd(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        var categoryId='';
        if(_this.addData.typDefault=='自考'){
          categoryId=1
        }
        else if(_this.addData.typDefault=='成考'){
          categoryId=2
        }
        else if(_this.addData.typDefault=='全日制自考'){
          categoryId=4
        }
        else if(_this.addData.typDefault=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/addProfession',
          data: {
            name :_this.addData.name,
            code :_this.addData.number,
            categoryId:categoryId,
           status:1,
          schoolId:_this.addData.schoolDefault
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
              _this.getProfessionList();
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
      /*全选*/
      handleCheckAll (index) {
        if (this.checkAllGroup[index].indeterminate) {
          this.checkAllGroup[index].checkAll = true;
        } else {
          this.checkAllGroup[index].checkAll = !this.checkAllGroup[index].checkAll;
        }
        if (this.checkAllGroup[index].checkAll) {
          this.checkAllGroup[index].allSelect =this.checkAllGroup[index].typeList;
        } else {
          this.checkAllGroup[index].allSelect=[]
        }
      },
      /*确定选择*/
      ok(){
        console.log(this.checkAllGroup)
      },
      /*专业列表*/
      getProfessionList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        var pageIndex=_this.selectPage;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectProfessionsPage',
          data: {
            pageIndex:pageIndex

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
              _this.professionList=[];
              for(var i=0;i<res.data.list.length;i++){
                if(res.data.list[i].categoryId==1){
                  _this.professionList.push(res.data.list[i]);
                  _this.professionList[i].categoryId='自考';
                }
                else if(res.data.list[i].categoryId==2){
                  _this.professionList.push(res.data.list[i]);
                  _this.professionList[i].categoryId='成考';
                }
                else if(res.data.list[i].categoryId==4){
                  _this.professionList.push(res.data.list[i]);
                  _this.professionList[i].categoryId='全日制自考';
                }
                else if(res.data.list[i].categoryId==8){
                  _this.professionList.push(res.data.list[i]);
                  _this.professionList[i].categoryId='职业培训';
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
        this.selectPage=page;
        this.getProfessionList();
      },
      /*禁止和启用*/
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
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/setProfessionStatus',
          data: {
            id:_this.professionList[index].id,
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
      /*获取学校列表*/
      getSchoolList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchools',
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
              _this.schoolList=[];
              for(var i=0;i<res.data.length;i++){
                _this.schoolList.push(res.data[i]);
              }
              console.log( _this.schoolList)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectProfessionsByNamePage',
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
            _this.pageSize=res.data.pageSize;
            if(res.status==200){
              _this.professionList=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*修改专业下课程*/
      changeCourse(index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/updateProfessionCurriculum',
          data: {
            professionId :_this.professionList[_this.index].id,
            curriculumStrIds:_this.selectedCourse.join(',')
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('课程设置成功!');
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*取消专业下课程*/
      cancelCourse(){
        this.$Message.info('课程设置失败!');
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
  .tip-title{
    display: inline-block;
    margin: 5px;
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
