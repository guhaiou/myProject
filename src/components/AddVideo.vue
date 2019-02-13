
<template>
  <div style="width: 100%;">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>资料管理</span>&gt;<span>视频管理</span></div>
    <div class="search">
      <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入视频名字" style="width: auto" />
      <Button type="primary" class="add" @click="addFatherModal=true">添加视频</Button>
    </div>
    <div class="layout">
    <Layout>
      <Header style="padding: 0;background: #2d8cf0;color: #fff;">
        <Row style="font-size: 16px;">
          <Col span="4">工程造价</Col>
          <Col span="4">视频简介</Col>
          <Col span="3">添加者</Col>
          <Col span="1">排序</Col>
          <Col span="1">视频数</Col>
          <Col span="11">操作</Col>
        </Row>
      </Header>
      <Content>
        <div class="video_box"  v-for="(parent,index) in parent_video_group" >
          <Row class="video_content" style="line-height: 100px;font-size: 14px;margin: 10px 0">
            <Col span="4">
              <div style="width: 150px;height: 100px;border:1px solid #000;margin: 0 auto;line-height: 50px;"><img style="width:100%;height: 100%" :src="parent.imageUrl"></div>
            </Col>
            <Col span="4">{{parent.name}}</Col>
            <Col span="3">{{parent.operatorName}}</Col>
            <Col span="1">{{parent.listOrder}}</Col>
            <Col span="1">{{parent.parent_number}}</Col>
            <Col span="11">
              <Button type="primary" @click="showAddSonModal(index)">追加子视频</Button>
              <Button :size="buttonSize" type="primary" @click="changeParenMd(index)">编辑</Button>
              <Modal
                v-model="parent.modalbj"
                title="视频专辑"
                @on-ok="okbj(parent)"
                @on-cancel="cancel">
                <p class="ln-g">  <Row>
                  <Col span="6">视频名：</Col>
                  <Col span="18"><Input v-model="value" placeholder="请输入视频名" style="width: 100%" /></Col>
                </Row></p>
                <br>
                <p class="ln-g"><Row>
                  <Col span="6">视频介绍：</Col>
                  <Col span="18">
                    <Input v-model="valueIntroduction" type="textarea" placeholder="视频介绍..." style="width: 100%" />
                  </Col>
                </Row></p>
                <br>
                <p class="ln-g"><Row>
                  <Col span="6">缩略图地址：</Col>
                  <Col span="18"><Input v-model="valueadd" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
                </Row></p>
                <br>
                <p class="ln-g"><Row>
                  <Col span="6">添加者：</Col>
                  <Col span="18"><Input v-model="tianjiazhe" placeholder="" style="width: 100%" /></Col>
                </Row></p>
                <br>
                <p class="ln-g"><Row>
                  <Col span="6">排序：</Col>
                  <Col span="18"><Input v-model="valueSort" placeholder="" style="width: 100%" /></Col>
                </Row></p>
                <br>
                <p class="ln-g"><Row>
                  <Col span="6">状态：</Col>
                  <Col span="18"><Input v-model="zhuantai" placeholder="" style="width: 100%" /></Col>
                </Row></p>
              </Modal>
              <Button :size="buttonSize" @click="showProfession(index)" type="primary">设置专业</Button>
              <Button :size="buttonSize" @click="getSetCourseList(index)" type="primary">设置课程</Button>
              <Modal
                title="选择课程"
                v-model="modal"
                width="1000"
                :mask-closable="false">
                <span class="tip-title">交通土建:</span>
                <CheckboxGroup>
                  <Checkbox label="中国近代史"></Checkbox>
                  <Checkbox label="马克思主义基本理论概论"></Checkbox>
                  <Checkbox label="桥梁工程"></Checkbox>
                  <Checkbox label="桥梁工程（实践）"></Checkbox>
                  <Checkbox label="工程监理"></Checkbox>
                  <Checkbox label="工程项目管理"></Checkbox>
                  <Checkbox label="交通工程经济分析"></Checkbox>
                  <Checkbox label="桥涵水文"></Checkbox>
                  <Checkbox label="结构设计原理（二）"></Checkbox>
                  <Checkbox label="工程招标与合同管理"></Checkbox>
                  <Checkbox label="交通工程"></Checkbox>
                  <Checkbox label="工程机械"></Checkbox>
                  <Checkbox label="工程教学"></Checkbox>
                  <Checkbox label="工程应用英语"></Checkbox>
                  <Checkbox label="公路工程CAD"></Checkbox>
                  <Checkbox label="现代施工技术"></Checkbox>
                  <Checkbox label="工程造价与管理"></Checkbox>
                  <Checkbox label="交通土建工程毕业设计"></Checkbox>
                </CheckboxGroup>
                <span class="tip-title">工程造价:</span>
                <CheckboxGroup>
                  <Checkbox label="中国近代史"></Checkbox>
                  <Checkbox label="马克思主义基本理论概论"></Checkbox>
                  <Checkbox label="桥梁工程"></Checkbox>
                  <Checkbox label="桥梁工程（实践）"></Checkbox>
                  <Checkbox label="工程监理"></Checkbox>
                  <Checkbox label="工程项目管理"></Checkbox>
                  <Checkbox label="交通工程经济分析"></Checkbox>
                  <Checkbox label="桥涵水文"></Checkbox>
                  <Checkbox label="结构设计原理（二）"></Checkbox>
                  <Checkbox label="工程招标与合同管理"></Checkbox>
                  <Checkbox label="交通工程"></Checkbox>
                  <Checkbox label="工程机械"></Checkbox>
                  <Checkbox label="工程教学"></Checkbox>
                  <Checkbox label="工程应用英语"></Checkbox>
                  <Checkbox label="公路工程CAD"></Checkbox>
                  <Checkbox label="现代施工技术"></Checkbox>
                  <Checkbox label="工程造价与管理"></Checkbox>
                  <Checkbox label="交通土建工程毕业设计"></Checkbox>
                </CheckboxGroup>
              </Modal>
              <Button :size="buttonSize" type="primary" v-on:click="showhide(index)">子视频</Button>
              <Button :size="buttonSize" type="primary"  @click="deleteParentVideo(index)">删除</Button>
            </Col>
          </Row>
          <div>
            <Row>
              <transition name="fade">
                <p v-if="parent.show" class="sonContent"  style="height: 100px;background-color: white">
                  <Row class="solid" style="background:#f8f8f9;font-weight: bold">
                    <Col  span="6">视频名字</Col>
                    <Col  span="5">视频描述</Col>
                    <Col  span="3">添加者</Col>
                    <Col  span="2">排序</Col>
                    <Col  span="2">老师</Col>
                    <Col  span="6">操作</Col>
                  </Row>
                  <Row class="solid" style="background: #fff;"  v-for="(item,index1) in parent.sonList">
                    <Col  span="6">{{item.name}}</Col>
                    <Col  span="5">{{item.descriptions}}</Col>
                    <Col  span="3">{{item.operatorName}}</Col>
                    <Col  span="2">{{item.listOrder}}</Col>
                    <Col  span="2">{{item.teacherName}}</Col>
                    <Col  span="6">
                      <Button :size="buttonSize" type="primary" ghost @click="changeChildMd(index,index1)">编辑</Button>
                      <Button :size="buttonSize" type="primary" ghost  @click="deletecz(item.id,index1)">删除</Button>
                </Col>
                   </Row>
            </p>
            </transition>
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
      <div class="page">
        <Page :total="pageSize" show-total show-elevator @on-change="pageChange" />
      </div>
    </div>

    <!--========================================================-->
    <!--添加父视频弹框-->
    <Modal
      v-model="addFatherModal"
      title="添加父视频"
      @on-ok="parenVideoaddSure"
      @on-cancel="cancelAdd">
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频名称：</Col>
        <Col span="14"><Input v-model="addParentData.name" placeholder="视频介绍" style="width: 100%" /></Col>
      </Row></p>
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频介绍：</Col>
        <Col span="14"><Input v-model="addParentData.descrptions" placeholder="视频介绍" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">缩略图地址：</Col>
        <Col span="14"><Input v-model="addParentData.imageUrl" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">添加者：</Col>
        <Col span="14"><Input v-model="addParentData.operatorName" placeholder="" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">排序：</Col>
        <Col span="14"><Input v-model="addParentData.listOrder" placeholder="" style="width: 100%" /></Col>
      </Row></p>
    </Modal>
    <!--添加子视频弹框-->
    <Modal
      v-model="sonModal"
      title="添加子视频"
      @on-ok="addchildVideo">
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">子视频名：</Col>
        <Col span="14"><Input v-model="addChildVideoData.name" placeholder="请输入子视频名" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频介绍：</Col>
        <Col span="14"><Input v-model="addChildVideoData.descriptions " placeholder="请输入子视频介绍" style="width: 100%" /></Col>
      </Row></p>
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">讲课老师：</Col>
        <Col span="14"><Input v-model="addChildVideoData.teacherName " placeholder="请输入子视频介绍" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">子视频地址：</Col>
        <Col span="14"><Input v-model="addChildVideoData.videoPath " placeholder="请输入子视频地址" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">添加者：</Col>
        <Col span="14"><Input v-model="addChildVideoData.operatorName" placeholder="添加者" style="width: 100%" /></Col>
      </Row>
      </p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">排序：</Col>
        <Col span="14"><Input v-model="addChildVideoData.listOrder " placeholder="排序" style="width: 100%" /></Col>
      </Row></p>



    </Modal>
    <!--编辑子视频-->
    <Modal
      v-model="childMd"
      title="编辑子视频"
      @on-ok="sureChangeChildeVideo">
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">子视频名：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.name" placeholder="请输入子视频名" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频介绍：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.descriptions " placeholder="请输入子视频介绍" style="width: 100%" /></Col>
      </Row></p>
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">讲课老师：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.teacherName " placeholder="请输入子视频介绍" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">子视频地址：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.videoPath " placeholder="请输入子视频地址" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">添加者：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.operatorName" placeholder="添加者" style="width: 100%" /></Col>
      </Row>
      </p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">排序：</Col>
        <Col span="14"><Input v-model="changeChildVideoData.listOrder " placeholder="排序" style="width: 100%" /></Col>
      </Row></p>



    </Modal>
    <!--编辑父视频弹框-->
    <Modal
      v-model="changeFatherModal"
      title="编辑父视频"
      @on-ok="parenVideoChangeSure"
      @on-cancel="cancel">
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频名称：</Col>
        <Col span="14"><Input v-model="changeParentData.name" placeholder="视频介绍" style="width: 100%" /></Col>
      </Row></p>
      <p class="ln-g">  <Row>
        <Col span="4" offset="3">视频介绍：</Col>
        <Col span="14"><Input v-model="changeParentData.descrptions" placeholder="视频介绍" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">缩略图地址：</Col>
        <Col span="14"><Input v-model="changeParentData.imageUrl" placeholder="请输入缩略图地址" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">添加者：</Col>
        <Col span="14"><Input v-model="changeParentData.operatorName" placeholder="" style="width: 100%" /></Col>
      </Row></p>

      <p class="ln-g"><Row>
        <Col span="4" offset="3">排序：</Col>
        <Col span="14"><Input v-model="changeParentData.listOrder" placeholder="" style="width: 100%" /></Col>
      </Row></p>
<!--
      <p class="ln-g"><Row>
        <Col span="4" offset="3">状态：</Col>
        <Col span="14">
          <Select v-model='changeParentData.status' style="width:100%;text-align: left">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row></p>-->
    </Modal>
    <!--专业选择-->
    <Modal
      title="专业"
      v-model="profession"
      width="1000"
      @on-ok="setP"
      @on-cancel="setCancel"
      :mask-closable="false">
      <CheckboxGroup v-model="checkAllGroup">
        <Checkbox v-for="item in professionList" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
    <!--课程选择-->
    <Modal
      title="课程"
      v-model="courseMd"
      width="1000"
      @on-ok="setC"
      @on-cancel="setCancel"
      :mask-closable="false">
      <CheckboxGroup v-model="selectedcourse">
        <Checkbox v-for="item in course" :label="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script>

  export default {
    name: "AddVideo",
    data () {
      return {
        searchType:'',
        addFatherModal:false,
        addParentData:{
          name:'',
          descrptions:'',
          imageUrl:'',
          operatorName:'',
          listOrder:'',
          status:''

        },
        profession:false,
        courseMd:false,
        selectedcourse:[],
        course:'',
        indeterminate:false,
        selectType:'',
        checkAll:false,
        checkAllGroup: [],
        professionList:[],
        index:'',//父视频
        index1:'',//子视频
        cityList:[
          {name:'启用',value:1},
          {name:'禁止',value:2}
        ],
        sonVideoMd:false,
        childMd:false,
        currentPage:1,//当前分页数
        searchType:'',
        fatherModal:false,/*父视频弹框*/
        sonModal: false,/*子视频弹框*/
        changeFatherModal:false,/*编辑父视频*/
        value13: '',//搜索视频名称
        select3: '',//选择视频状态
        value:"",//视频编辑名称
        valueIntroduction:"",//视频介绍
        valueadd:"",//视频地址
        tianjiazhe:"",//添加者
        valueSort:"",//排序
        zhuantai:"",//状态
        modal:false,
        buttonSize: 'large',
        pageSize:'',
        parent_video_group:[],//视频编辑数组
        sonVideoData:[],
        changeParentData:{descrptions:'',operatorName:'',listOrder:'',imageUrl:'',status:'',name:''},
        addChildVideoData:{
          name:'',
          operatorName:'',
          teacherName:'',
          descriptions:'',
          videoPath:'',
          duration:'1',
          listOrder:'',
          thumbPath :'www.baidu.com',
          status:1
        },
        changeChildVideoData:{
          name:'',
          operatorName:'',
          teacherName:'',
          descriptions:'',
          videoPath:'',
          duration:'1',
          listOrder:'',
          thumbPath :'',
          status:1
        },
      }
    },
    created() {
      this.$store.state.showBottomNav = false,
      this.$store.state.showLogin = true,
      this.getParentList();
    },
    methods: {
      /*确定修改*/
      parenVideoChangeSure (parent) {
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateSystemvideo',
          data: {
            id  :_this.parent_video_group[_this.index].id,
            name:_this.changeParentData.name,
            imageUrl:_this.changeParentData.imageUrl,
            descriptions :_this.changeParentData.descrptions ,
            operatorName  :_this.changeParentData.operatorName  ,
            listOrder   :_this.changeParentData.listOrder   ,
            status    :1,

          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('编辑成功！');
              _this.getParentList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*确定添加*/
      parenVideoaddSure(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addSystemVideo',
          data: {
            name:_this.addParentData.name,
            imageUrl:_this.addParentData.imageUrl,
            descriptions :_this.addParentData.descrptions ,
            operatorName  :_this.addParentData.operatorName  ,
            listOrder   :_this.addParentData.listOrder   ,
            status    :1,

          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('添加成功！');
              _this.getParentList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      ok2 (parent) {
        parent.sub_video.push({
            sub_name:this.value,//子视频名
            sub_introduction:this.valueIntroduction,//子视频简介
            sub_adder:this.tianjiazhe,//添加者
            sub_sort:this.valueSort,//排序
            sub_url:this.valueadd
        })
      },
      okbj (parent){
          parent.parent_name=this.value,
          parent.parent_introduction=this.valueIntroduction,
          parent. parent_adder=this.tianjiazhe,
          parent.parent_sort=this.valueSort,
            parent.parent_witch="禁用",
            parent.valueadd=this.valueadd,
            parent.modal2=false,
          parent. modalbj=false,
          // parent.sub_video=[],
          parent.parent_number=10

      },
      okzbj(sub){
        sub.sub_name=this.value,//子视频名
          sub.sub_introduction=this.valueIntroduction,//子视频简介
          sub.sub_adder=this.tianjiazhe,//添加者
          sub.sub_sort=this.valueSort,//排序
          sub.sub_url=this.valueadd
      },
      /*取消编辑*/
      cancelAdd(){
        this.$Message.info('取消添加！');
      },
      cancel (parent) {
        this.$Message.info('取消修改！');
      },
      Switch(parent){
        if(parent.parent_witch=="禁用"){
          parent.parent_witch="启用"
        }else {
          parent.parent_witch="禁用"
        }

      },
      showhide(index){
        this.sonVideoMd= !this.sonVideoMd;
        this.index=index;
        this.sonVideoList();
       if(this.parent_video_group[index].show==false){
         this.parent_video_group[index].show=true;
       }
       else{
         this.parent_video_group[index].show=false;
       }
      },
      deletec(index){
        this.parent_video_group.splice(index,1)


      },
      /*删除子视频*/
      deletecz(id,index1){
        this.$Modal.confirm({
          title: '删除内容',
          content: '<p>请确认是否删除？</p>',
          onOk: () => {
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            var _this=this;
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delSystemVideoDetail',
              data: {
                id:id,
                status:2
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
                  _this.sonVideoList();
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
      /*显示添加父课程的弹框*/
      showAddFatherModal(){
        this.fatherModal=true;
      },
      /*显示添加子课程的弹框*/
      showAddSonModal(index){
        this.sonModal=true;
        this.index=index;
        this.addChildVideoData=[];
      },
      /*搜索事件*/
      search(){

      },
      /*视频列表借口*/
      getParentList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSystemVideoPage',
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
              _this.parent_video_group=[];
              _this.pageSize=res.data.pageSize;
              for(let i=0;i<res.data.list.length;i++){
                _this.parent_video_group.push(res.data.list[i])
                _this.$set(_this.parent_video_group[i],"show",false);
                _this.$set(_this.parent_video_group[i],"sonList",[]);
                if(res.data.list[i].status==1){
                  _this.parent_video_group[i].status='启用'
                }
                else{
                  _this.parent_video_group[i].status='禁用'
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
      /*子视频列表*/
      sonVideoList(){
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSystemVideoDetails',
          data: {
            systemVideoId :_this.parent_video_group[_this.index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
             _this.parent_video_group[_this.index].sonList=[];
            _this.parent_video_group[_this.index].sonList=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*编辑子视频*/
      changeChildMd(index,index1){
        this.index1=index1;
        this.index=index;
        this.childMd=true;
        this.changeChildVideoData.name=this.parent_video_group[index].sonList[index1].name;
        this.changeChildVideoData.operatorName=this.parent_video_group[index].sonList[index1].operatorName;
        this.changeChildVideoData.teacherName=this.parent_video_group[index].sonList[index1].teacherName;
        this.changeChildVideoData.descriptions=this.parent_video_group[index].sonList[index1].descriptions;
        this.changeChildVideoData.videoPath=this.parent_video_group[index].sonList[index1].videoPath;
        this.changeChildVideoData.listOrder=this.parent_video_group[index].sonList[index1].listOrder;
      },
      /*确定编辑子视频*/
      sureChangeChildeVideo(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateSystemVideoDetail',
          data: {
            id  :_this.parent_video_group[_this.index].sonList[_this.index1].id,
            name  :_this.changeChildVideoData.name,
            operatorName:_this.changeChildVideoData.operatorName,
            teacherName :_this.changeChildVideoData.teacherName,
            descriptions:_this.changeChildVideoData.descriptions,
            videoPath   :_this.changeChildVideoData.videoPath,
            duration    :'',
            listOrder   :_this.changeChildVideoData.listOrder,
            thumbPath   :'',
            status :1
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
              _this.sonVideoList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*修改父视频*/
      changeParenMd(index){
        this.changeFatherModal=true;
        this.changeParentData.descrptions=this.parent_video_group[index].descrptions;
        this.changeParentData.operatorName=this.parent_video_group[index].operatorName;
        this.changeParentData.listOrder=this.parent_video_group[index].listOrder;
        this.changeParentData.imageUrl=this.parent_video_group[index].imageUrl;
        this.changeParentData.name=this.parent_video_group[index].name;
        this.index=index;
      },
      /*显示专业弹框*/
      showProfession(index){
        this.profession=true;
        this.index=index;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectVideoProfession',
          data: {
            systemVideoId :_this.parent_video_group[index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.checkAllGroup=[];
              _this.professionList=[];
              _this.professionList=res.data;
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.checkAllGroup.push(res.data[i].id)
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
      setP(index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setSystemVideoProfession',
          data: {
            systemVideoId:_this.parent_video_group[_this.index].id,
            professionStrIds:_this.checkAllGroup.join(','),
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('设置专业成功!');
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*设置失败*/
      setCancel(){
        this.$Message.info('设置失败!');
      },
      /*获取设置课程的课程列表*/
      getSetCourseList(index){
        this.courseMd=true;
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        _this.index=index;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectVideoCurriculum',
          data: {
            systemVideoId :_this.parent_video_group[index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'GET',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.selectedcourse=[];
              _this.course=res.data;
              for(var i=0;i<res.data.length;i++){
                if(res.data[i].isSelect==1){
                  _this.selectedcourse.push(res.data[i].id)
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
      /*设置课程*/
      setC(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/setSystemVideoCurriculum',
          data: {
            curriculumStrIds    :_this.selectedcourse.join(','),
            systemVideoId  :_this.parent_video_group[_this.index].id
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('设置课程成功!');
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
        this.getParentList();
      },
      /*删除视频*/
      deleteParentVideo(index){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delSystemVideo',
          data: {
            id:_this.parent_video_group[index].id,
            status :2
          },
          beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
          },
          async: false,//请求是否异步，默认为异步
          type: 'POST',
          dataType:'json',
          success: function (res) {
            if(res.status==200){
              _this.$Message.info('删除成功!');
              _this.getParentList();
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      /*添加子视频*/
      addchildVideo(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addSystemVideoDetail',
          data: {
            systemVideoId :_this.parent_video_group[_this.index].id,
            name  :_this.addChildVideoData.name,
            operatorName:_this.addChildVideoData.operatorName,
            teacherName :_this.addChildVideoData.teacherName,
            descriptions:_this.addChildVideoData.descriptions,
            videoPath   :_this.addChildVideoData.videoPath,
            duration    :'100',
            listOrder   :_this.addChildVideoData.listOrder,
            thumbPath   :'/',
            status :1
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
              _this.sonVideoList();
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
        var page=_this.currentPage;
        var name=_this.searchType;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/selectSystemVideoPage',
          data: {
            pageIndex :1,
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
              _this.parent_video_group=[];
              _this.pageSize=res.data.pageSize;
              for(let i=0;i<res.data.list.length;i++){
                _this.parent_video_group.push(res.data.list[i])
                _this.$set(_this.parent_video_group[i],"show",false);
                _this.$set(_this.parent_video_group[i],"sonList",[]);
                if(res.data.list[i].status==1){
                  _this.parent_video_group[i].status='启用'
                }
                else{
                  _this.parent_video_group[i].status='禁用'
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
    }

  }
</script>

<style scoped>
  .layout{
    padding: 0 20px;
  }
  .top-left-icon{
    margin:0 5px 4px 20px;
  }
  .top-head{
    height: 45px;
    line-height: 45px;
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
  .ln-g{
    line-height: 32px;
    text-align: right;
    margin-bottom: 5px;
  }
  .video_content>div{
    height: 100px;
  }
  .solid{
    border-bottom: 1px #eee solid;
  }
  .sonContent>div{
    height: 50px;
    line-height:50px;
  }
  .solid>div{
    height: 50px;
    line-height:50px;
  }
  .video_box{
    border: 1px solid #eee;
    background-color:#f0faff;
  }
</style>
