<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>真题管理</span>&gt;<span>题型管理</span></div>
    <div class="search">
      <Button type="primary" class="add" @click="addMessage=true">添加题型</Button>
    </div>
    <div>
      <div class="table-container" style="margin: 0 20px">
        <Table border ref="selection" :columns="columns7" :data="data6"></Table>
      </div>
    </div>
    <!--修改信息-->
    <Modal class="change-modal"
           title="添加题型"
           width="310px"
           v-model="addMessage"
           @on-ok="sureAdd"
           @on-cancel="cancelAdd"
           :mask-closable="false">
      <p><span class="first-title">题型名称:</span><Input v-model="addData[0].name" size="large" placeholder="题型名称" style="width: 200px" /></p>
      <p><span class="first-title">题目类型:</span>
        <Select v-model="addData[1].type" style="width:200px;margin-left: -3px">
          <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">排序:</span><Input v-model="addData[2].sort" size="large" placeholder="排序" style="width: 200px" /></p>
    </Modal>
    <!--修改信息-->
    <Modal class="change-modal"
           title="修改信息"
           width="310px"
           v-model="changeMessage"
           @on-ok="sureChange"
           @on-cancel="cancelChange"
           :mask-closable="false">
      <p><span class="first-title">题型名称:</span><Input v-model="changeData[0].name" size="large" placeholder="题型名称" style="width: 200px" /></p>
      <p><span class="first-title">题目类型:</span>
        <Select v-model="changeData[1].type" style="width:200px;margin-left: -3px">
          <Option v-for="item in type" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </p>
      <p><span class="first-title">排序:</span><Input v-model="changeData[2].sort" size="large" placeholder="排序" style="width: 200px" /></p>
    </Modal>
  </div>
</template>

<script>
    export default {
        name: "questionType",
        data(){
          return {
            index:'',
            addMessage:false,
            changeMessage:false,
            columns7: [
              {
                type: 'index',
                width: 60,
                align: 'center'
              },
              {
                title: '题型名称',
                key: 'name',
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
                title: '题目类型',
                key: 'name'
              },
              {
                title: '排序',
                key: 'listOrder',
                width: 150,
                align:'center'
              },
              {
                title: '操作',
                key: 'action',
                width: 300,
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
            data6: [],
            type:[
              {name:'单选题',value:1},
              {name:'填空题',value:2},
              {name:'判断题',value:3},
              {name:'简单题',value:4},
              {name:'多选题',value:5},
              {name:'论述题',value:6},
              {name:'名词解释',value:7},
              {name:'计算题',value:8},
              {name:'案列分析题',value:9},
            ],
            changeData:[
              {name:''},
              {type:''},
              {sort:''},
            ],
            addData:[
              {name:''},
              {type:''},
              {sort:''},
            ]
          }
        },
        created() {
          this.$store.state.showBottomNav = false;
          this.$store.state.showLogin = true;
          this.getTypeList();
        },
        methods:{
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
                  _this.data6=[];
                  _this.data6=res.data;
                  console.log(res.data)
                }
                else{
                  alert(res.message)
                }
              },
              error: function () {
              }});
          },
          /*修改*/
          change(index){
              this.index=index;
              this.changeMessage=true;
              this.changeData[0].name=this.data6[index].name;
              this.changeData[1].type=this.data6[index].id;
              this.changeData[2].sort=this.data6[index].listOrder;
          },
          /*确定修改*/
          sureChange(){
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/updateExamPaperInfoQuestionType',
              data: {
                examPaperInfoQuestionTypeId :_this.data6[_this.index].examPaperInfoQuestionTypeId,
                examQuestionBankTypeId :_this.changeData[1].type,
                name:_this.changeData[0].name,
                score :100,
                listOrder:_this.changeData[2].sort
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
                  _this.getTypeList()
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

          },
          /*添加题型*/
          sureAdd(){
            var _this=this;
            var token=sessionStorage.getItem('token');
            var userId=sessionStorage.getItem('userId');
            $.ajax({
              url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/addExamPaperInfoQuestionType',
              data: {
                examPaperInfoId:localStorage.getItem('paperId'),
                examQuestionBankTypeId:_this.addData[1].type,
                name:_this.addData[0].name,
                score :100,
                listOrder:_this.addData[2].sort
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
                  _this.getTypeList();
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
            this.$Message.info('取消添加!');
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
                  url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/data/delExamPaperInfoQuestionType',
                  data: {
                    examPaperInfoQuestionTypeId :_this.data6[index].examPaperInfoQuestionTypeId,
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
    height: 30px;
  }
  .search-input{
    margin-left: 20px;
  }
  .add{
    display: block!important;
    float: right;
    margin-right: 20px;
  }
  .first-title{
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 5px;
  }
  .change-modal p{
    margin-bottom: 5px;
  }

</style>
