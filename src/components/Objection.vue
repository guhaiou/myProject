<template>
    <div class="container">
      <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>招生管理</span>&gt;<span>学生异议</span></div>
      <div class="search">
        <Input suffix="ios-search" class="search-input" v-model="searchType"  @on-change="search" placeholder="请输入学生名字" style="width: auto" />
        <Button type="primary" class="add" style="visibility: hidden">添加客户</Button>
      </div>
      <Table border :columns="columns7" :data="data6" style="margin: 0 20px"></Table>
    </div>
</template>

<script>
    export default {
        name: "Objection",
      data () {
        return {
          searchType:'',
          columns7: [
            {
              type:'index',
              title: '排序',
              width:100,
              align:'center'
            },
            {
              title: '学生ID',
              key: 'studentName'
            },
            {
              title: '异议内容',
              key: 'objectionContent'
            },
            {
              title: '异议状态',
              align:'center',
              render: (h, params) => {
                let name='未处理';
                if(params.row.objectionStatus==2){
                  name='已处理'
                }
                return h('span', {
                  domProps: {
                    innerHTML:name
                  }
                })
              }
            },
            {
              title: '异议类别',
              align:'center',
              render: (h, params) => {
                let name='成绩异议';
                if(params.row.type==2){
                  name='报考异议'
                }
                return h('span', {
                  domProps: {
                    innerHTML:name
                  }
                })
              }
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                let name='处理';
                if(params.row.objectionStatus==2){
                    name='已处理'
                }
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
                        this.deal(params.index)
                      }
                    }
                  }, name),
                ]);
              }
            }
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
          currentPage:1,
        }
      },
      created() {
          this.$store.state.showBottomNav = false;
          this.$store.state.showLogin = true;
          this.getList();
      },
      methods: {
        deal (index) {
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/updateExaminationObjectionStatus',
            data: {
              id :_this.data6[index].id
            },
            beforeSend: function(request) {
              request.setRequestHeader("x-access-token", token);
            },
            async: false,//请求是否异步，默认为异步
            type: 'POST',
            dataType:'json',
            success: function (res) {
              if(res.status==200){
                _this.$Message.info('已处理!');
                _this.getList();
              }
              else{
                alert(res.message)
              }
            },
            error: function () {
            }});
        },
        remove (index) {
          this.data6.splice(index, 1);
        },
        /*获取类别列表*/
        getList(){
          var _this=this;
          var token=sessionStorage.getItem('token');
          var userId=sessionStorage.getItem('userId');
          $.ajax({
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectExaminationObjections',
            data: {
              pageIndex :_this.currentPage,
              branchId:sessionStorage.getItem('branchId')
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
                for(var i=0;i<res.data.list.length;i++){
                  _this.data6.push(res.data.list[i]);
                }
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
            url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/academy/selectCategoryByNamePage',
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
</style>
