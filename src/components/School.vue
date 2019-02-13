<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>院校管理</span>&gt;<span>院校管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入学校名字" style="width: auto" />
      <Button type="primary" class="add" @click="addMessage">添加院校</Button>
    </div>
    <div class="table-container">
      <Table border ref="selection" :columns="columns7" :data="schoolList"></Table>
    </div>
    <div class="page">
      <Page :total="pageSize"  show-total show-elevator  @on-change="pageChange"/>
    </div>
<!-------------------------------------------------------------------->
    <Modal class="change-modal"
           title="修改信息"
           v-model="changeMessage"
           @on-ok="sureChange"
           @on-cancel="cancel"
           :mask-closable="false">
      <p><span class="first-title">学校名称:</span><Input v-model="changeData.name" size="large" placeholder="学校名称" style="width: 200px" /></p>
      <p>
        <span class="first-title">类别:</span>
        <Select v-model="typeDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">备注:</span><Input v-model="changeData.description" size="large" placeholder="备注" style="width: 200px" /></p>
    </Modal>
    <!--添加学校-->
    <Modal class="change-modal"
           title="添加学校"
           v-model="add"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">学校名称:</span><Input v-model="addData.name" size="large" placeholder="学校名称" style="width: 200px" /></p>
      <p>
        <span class="first-title">类别:</span>
        <Select v-model="addData.typeDefault" style="width:200px;margin-left: -3px">
          <Option v-for="item in typeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">备注:</span><Input v-model="addData.description" size="large" placeholder="备注" style="width: 200px" /></p>
    </Modal>
    <!--专业-->
    <Modal
      title="专业"
      v-model="profession"
      width="1000"
      @on-ok="selectProfession"
      @on-cancel="cancelSelect"
      :mask-closable="false">
      <CheckboxGroup v-model="selectedProfession" @on-change="checkAllGroupChange">
        <Checkbox v-for="item in allProfession" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>
  export default {
    name:'School',
    data () {
      return {
        modal:false,
        index:'',
        totalNum:10,
        selectPage:1,
        changeMessage:false,
        add:false,
        searchType:'',
        pageSize:'',
        currentPage:'',
        profession:false,
        professionList:[],
        selectedProfession:[],
        indeterminate:false,
        checkAll:false,
        changeType:'',
        checkAllGroup: [],
        allProfession:'',
        schoolList:[],
        typeList:[],
        typeDefault:'',
        changeData:{
          id:'',
          name: '',
          number: '',
          school:'长沙理工大学',
          state:'启动',
          description:'',
        },
        addData:{
          name:'',
          description: '',
          typeDefault:'',
        },
        columns7: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '院校名称',
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
            title: '类别',
            key: 'categoryId'
          },
          {
            title:'专业' ,
            key:'profession',
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
                      this.showProfession(params.index)
                    }
                  }
                }, '专业'),
              ]);
            }
          },
          {
            title: '备注',
            key: 'description'
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
        data6: [
          {
            name: '长沙理工大学',
            type: '自考',
            state: false,
            note:'这是自考'
          },
          {
            name: '湖南大学',
            type: '成考',
            state: false,
            note:'这是成考'
          },
          {
            name: '中医药大学',
            type: '自考',
            state: false,
            note:'这是自考'
          },
          {
            name: '交通职业技术学院',
            type: '成考',
            state: false,
            note:'这是成考'
          }
        ]
      }
    },
    created() {
        this.$store.state.showBottomNav = false,
        this.$store.state.showLogin = true,
        this.getSchoolList();
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
      change(index){
        this.getTypeList();
        this.changeMessage=true;
        this.changeData.name=this.schoolList[index].name;
        this.changeData.id=this.schoolList[index].id;
        this.changeData.description=this.schoolList[index].description;
        this.typeDefault=this.schoolList[index].categoryId;
      },
      addMessage(index){
        this.typeList=[];
        this.addData=[];
        this.getTypeList();
        this.add=true;
      },
      /*全选*/
      handleCheckAll (index) {
        if (this.indeterminate) {
          this.checkAll = true;
        } else {
          this.checkAll = !this.checkAll;
        }
        if (this.checkAll) {
          this.checkAllGroup = this.schoolList;
        }else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length ===this.schoolList.length) {
          this.indeterminate = true;
          this.checkAll = true;
        }
      },
      /*确定选择*/
      ok(){
        console.log(this.checkAllGroup)
      },
      /*专业列表*/
      getSchoolList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolPage',
          data: {
            pageIndex:_this.selectPage

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
      /*分页*/
      pageChange(page){
        this.currentPage=page;
        this.getSchoolList();
      },
      /*禁用和启用*/
      forbidden(value,index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var status=false;
        if(value==false){
          status=2;
        }
        else{
          status=1;
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/setSchoolStatus',
          data: {
            id:_this.schoolList[index].id,
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
              alert(res.message);
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
      /*确认修改*/
      sureChange(){
        let _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var categoryId='';
        if(_this.typeDefault=='自考'){
          categoryId=1
        }
        else if(_this.typeDefault=='成考'){
          categoryId=2
        }
        else if(_this.typeDefault=='全日制自考'){
          categoryId=4
        }
        else if(_this.typeDefault=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/updateSchool',
          data: {
            id :_this.changeData.id,
            name:_this.changeData.name,
            description:_this.changeData.description,
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
              _this.getSchoolList();
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
      /*确定添加课程*/
      sureAdd(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var categoryId='';
        if(_this.addData.typeDefault=='自考'){
          categoryId=1
        }
        else if(_this.addData.typeDefault=='成考'){
          categoryId=2
        }
        else if(_this.addData.typeDefault=='全日制自考'){
          categoryId=4
        }
        else if(_this.addData.typeDefault=='职业培训'){
          categoryId=8
        }
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/addSchool',
          data: {
            name:_this.addData.name,
            description:_this.addData.description,
            status: 1,
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
              _this.$Message.info('添加成功!');
              _this.schoolList=[];
              _this.getSchoolList();

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
      /*搜索*/
      search(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var page=1;
        var name=_this.searchType;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolByNamePage',
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
              _this.schoolList=res.data.list;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*显示专业*/
      showProfession(index){
        this.profession=true;
        console.log( this.profession)
        this.index=index;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectSchoolProfession',
          data: {
            schoolId:_this.schoolList[_this.index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.allProfession=res.data;
              _this.selectedProfession=[];
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.selectedProfession.push(res.data[i].id);
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
      selectProfession(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/setSchoolProfession',
          data: {
            schoolId  :_this.  schoolList[_this.index].id,
            professionStrIds :_this.selectedProfession.join(','),
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
      /*取消选择专业*/
      cancelSelect(){
        this.$Message.info('专业设置失败!');
      }
    },
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
