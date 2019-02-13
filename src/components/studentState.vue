<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>数据统计</span><div style="display: inline-block;margin-left: 20px">学生姓名:{{name}}<span>专业：{{profession}}</span></div><Button style="float: right;margin-right: 30px;margin-top: 10px" type="primary" @click="jl">查看学习记录</Button></div>
    <div style="display: flex;justify-content: space-around;flex-flow: row nowrap">
      <div id="myChart" :style="{width: '40%', height: '350px',marginTop:'20px',marginLeft:'10px'}"></div>
      <div style="width: 50%">
        <p style="text-align: center;font-size: 18px;font-weight: bold;padding: 20px 0">学生题库刷题排行榜</p>
        <Tabs value="name1">
          <TabPane label="工程机械" name="name1">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="公路工程CAD" name="name2">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="工程项目管理" name="name3">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="马克思主义基本原理概论" name="name4">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="工程数学" name="name5">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="工程投标与合同管理" name="name6">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="桥涵水文" name="name7">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="工程监理" name="name8">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="中国近代史纲要" name="name9">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="交通工程经济分析" name="name10">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="工程造价与管理" name="name10">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="桥梁工程" name="name11">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
          <TabPane label="交通工程" name="name12">
            <Table border :columns="columns7"  :data="data6" width="100%" height="280"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <div style="display: flex;justify-content: space-around;width: 100%">
      <div style="width:40%;padding:2%;">
        <h2 style="text-align: left;margin-top: 30px;margin-bottom: 20px">课程学成进度</h2>
        <Tabs value="name1">
          <TabPane label="工程机械" name="name1">
            <p><span style="display: inline-block">在线课堂:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库练习:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="公路工程CAD" name="name2">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="工程项目管理" name="name3">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="马克思主义基本原理概论" name="name4">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="工程数学" name="name5">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="工程投标与合同管理" name="name6">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="桥涵水文" name="name7">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="工程监理" name="name8">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="中国近代史纲要" name="name9">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="交通工程经济分析" name="name10">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="工程造价与管理" name="name10">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="桥梁工程" name="name11">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
          <TabPane label="交通工程" name="name12">
            <p><span style="display: inline-block">视频:</span><Progress :percent="10" status="active" /></p>
            <p><span style="display: inline-block">题库:</span><Progress :percent="20" status="active" /></p>
            <p><span style="display: inline-block">自动组卷:</span><Progress :percent="30" status="active" /></p>
            <p><span style="display: inline-block">历年真题:</span><Progress :percent="5" status="active" /></p>
            <p><span style="display: inline-block">考试大纲:</span><Progress :percent="11" status="active" /></p>
          </TabPane>
        </Tabs>
      </div>
      <Tabs value="name1" style="width: 50%;margin-top:60px">
        <TabPane label="题库刷题" name="name1" style="width: 100%"> <div id="myChart2" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="在线课堂" name="name2"><div id="myChart3" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="考试大纲" name="name3"><div id="myChart4" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="真题模拟" name="name4"><div id="myChart5" style="width: 100%;height: 300px"></div></TabPane>
      </Tabs>
    </div>
    <!--学习记录-->
    <Drawer title="学习记录" :closable="false" v-model="studyMd">
      <Timeline>
        <TimelineItem>
          <p class="time">2019-01-03 22:00:00</p>
          <p class="content">进行题库练习</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-03 22:06:00</p>
          <p class="content">观看视频</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-03 22:30:00</p>
          <p class="content">进行题库练习</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-04 09:03:00</p>
          <p class="content">进行真题模拟</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-04 10:00:00</p>
          <p class="content">进行考试大纲的学习</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-03 22:00:00</p>
          <p class="content">进行题库练习</p>
        </TimelineItem>
        <TimelineItem>
          <p class="time">2019-01-03 22:06:00</p>
          <p class="content">观看视频</p>
        </TimelineItem>

      </Timeline>
    </Drawer>
  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "studentState",
    data () {
      return {
        studyMd:false,
        studyData:[],
        name:'',
        profession:'',
        msg: 'Welcome to Your Vue.js App',
        other1:'',
        columns1: [
          {
            align:'center',
            title: '课程名称',
            key: 'name'
          },
          {
            align:'center',
            title: '学习类型',
            key: 'type'
          },
          {
            align:'center',
            title: '学习数据',
            key: 'data'
          }
        ],
        data1: [],
        data2: [
          {name:'工程项目管理',type:'题库练习',data:'30'},
          {name:'工程项目管理',type:'视屏观看',data:'200分钟'},
          {name:'工程项目管理',type:'真题测试',data:'2套'},
          {name:'工程项目管理',type:'自动组卷',data:'15套'},
          {name:'工程项目管理',type:'错题集',data:'120'},
        ],
        columns7: [
          {
            type:'index',
            title: '排名',
            align:'center',
            key: 'name1',
          },
          {
            title: '姓名',
            align: 'center',
            key: 'name2'
          },
          {
            title: '类别',
            align: 'center',
            key: 'name3'
          },
          {
            title: '题库刷题数',
            align: 'center',
            key: 'name4'
          },
          {
            title: '所属老师',
            align: 'center',
            key: 'name5'
          },
          {
            title: '学习记录',
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
                      this.show(params.index)
                    }
                  }
                }, '学习记录')
              ]);
            }
          }
        ],
        data6: [
          {
            name2: '赵静雯',
            name3: '自考',
            name4: '150',
            name5:'鲁小红'
          },
          {
            name2: '赵腾',
            name3: '自考',
            name4: '80',
            name5:'王基权'
          },
          {
            name2: '陈李杰',
            name3: '自考',
            name4: '60',
            name5:'尹刚'
          },
          {
            name2: '陈伟',
            name3: '自考',
            name4: '58',
            name5:'王雄'
          },
          {
            name2: '赵晓芳',
            name3: '自考',
            name4: '34',
            name5:'鲁小红'
          }
        ]
      }
    },
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.name=JSON.parse(localStorage.getItem('studentDate')).name;
      this.profession=JSON.parse(localStorage.getItem('studentDate')).profession;
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
        let myChart5 = this.$echarts.init(document.getElementById('myChart5'));
        // 绘制图表
        myChart.setOption({
          title : {
            text: 'APP和PC学习占比',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data:['APP学习比例','PC学习比例']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                  funnel: {
                    x: '25%',
                    width: '50%',
                    funnelAlign: 'right',
                    max: 1548
                  }
                }
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:600, name:'APP学习比例'},
                {value:100, name:'PC学习比例'},
              ]
            }
          ]
        });
        myChart2.setOption({
          title : {
            text: '近七日学生题库刷题数',
            x:'center'
          },
          xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        });
        myChart3.setOption({
          title : {
            text: '近七日学生在线课堂观看时长',
            x:'center'
          },
          xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [100, 300, 200, 400, 230, 500, 600],
            type: 'line'
          }]
        });
        myChart4.setOption({
          title : {
            text: '近七日学生考试大纲学习数目',
            x:'center'
          },
          xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [300, 400, 300, 934, 500, 600, 580],
            type: 'line'
          }]
        });
        myChart5.setOption({
          title : {
            text: '近七日学生真题刷题套数',
            x:'center'
          },
          xAxis: {
            type: 'category',
            data: ['', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [300, 400, 300, 400, 420, 560, 580],
            type: 'line'
          }]
        });
      },
      jl(){
        var userId=sessionStorage.getItem('userId');
        this.studyMd=true;
        var _this=this;
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/study/selectStudentStudyRecords',
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
              _this.studyData=res.data.list;
              console.log(res)
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      show(){
        this.studyMd=true;
      }
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
