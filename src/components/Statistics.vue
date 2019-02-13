<template>
  <div class="container">
    <div class="top-head"><Icon class="top-left-icon" size="20" type="ios-home-outline" /><span>当前位置:</span><span>教务管理</span>&gt;<span>数据统计</span></div>
    <div style="margin:0 20px ">
      <Row style="padding:10px;display: flex;justify-content: space-around" >
      <Col span="6">
        <Card :bordered="false" style="padding:5%;box-shadow: #dcdee2 0px 1px 1px 2px">
          <p slot="title" style="font-size: 22px;color: #515a6e">本站点总人数</p>
          <p style="color:#ff9900;font-size: 30px">8637(个)</p>
        </Card>
      </Col>
      <Col span="6" offset="2">
        <Card :bordered="false" style="padding:5%;box-shadow: #dcdee2 0px 1px 1px 2px">
          <p slot="title" style="font-size: 22px;color: #515a6e">自考总人数</p>
          <p style="color:#2b85e4;font-size: 30px">6965(个)</p>
        </Card>
      </Col>
      <Col span="6" offset="2">
          <Card :bordered="false" style="padding:5%;box-shadow: #dcdee2 0px 1px 1px 2px">
            <p slot="title" style="font-size: 22px;color: #515a6e">成考总人数</p>
            <p style="color:#19be6b;font-size: 30px">1672(个)</p>
          </Card>
        </Col>
      </Row>
    </div>
    <div style="display: flex;justify-content: space-around;flex-flow: row nowrap">
      <div id="myChart" :style="{width: '40%', height: '350px',marginTop:'20px',marginLeft:'10px'}"></div>
      <div style="width: 50%">
        <p style="text-align: center;font-size: 18px;font-weight: bold;padding: 20px 0">老师招生排行榜</p>
        <Table border :columns="columns1"  :data="data1.dataTeacherVos" width="100%" height="280"></Table>
      </div>
    </div>
    <div style="display: flex;justify-content: space-around;width: 100%">
      <div id="myChart1" :style="{width: '40%', height: '350px',marginTop:'20px',}"></div>

      <Tabs value="name1" style="width: 50%">
        <TabPane label="题库刷题" name="name1" style="width: 100%"> <div id="myChart2" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="在线课堂" name="name2"><div id="myChart3" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="考试大纲" name="name3"><div id="myChart4" style="width: 100%;height: 300px"></div></TabPane>
        <TabPane label="真题模拟" name="name4"><div id="myChart5" style="width: 100%;height: 300px"></div></TabPane>
      </Tabs>
    </div>
    <div>
      <h2 style="text-align: left;margin-left: 20px;margin-top: 30px">本批次课程通过率:</h2>
      <Tabs value="name1" style="margin: 0 20px">
        <TabPane label="交通土建工程" name="name1" style="width: 100%"> <Table :columns="columns2" :data="data2" style="width: 100%"></Table></TabPane>
        <TabPane label="工程造价管理" name="name2"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
        <TabPane label="电子商务" name="name3"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
        <TabPane label="软件工程" name="name4"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
        <TabPane label="会计" name="name5"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
        <TabPane label="交通土建" name="name6"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
        <TabPane label="工商企业管理" name="name7"><Table :columns="columns2" :data="data2" style="margin: 20px;width: 100%"></Table></TabPane>
      </Tabs>
    </div>
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
    name: "Statistics",
    data () {
      return {
        columns2: [
          {
            title: '专业',
            key: 'name1',
            align:'center'
          },
          {
            title: '课程',
            key: 'name2',
            align:'center'
          },
          {
            title: '科目',
            key: 'name3',
            align:'center'
          },
          {
            title: '参考课次',
            key: 'name4',
            align:'center'
          },
          {
            title: '作弊课次',
            key: 'name5',
            align:'center'
          },
          {
            title: '有效课次',
            key: 'name6',
            align:'center'
          },
          {
            title: '通过课次',
            key: 'name7',
            align:'center'
          },
          {
            title: '通过率',
            key: 'name8',
            align:'center'
          },
        ],
        data2: [
          {
            name1: '人力资源',
            name2: '公共关系学',
            name3: '00182',
            name4: '328',
            name5: '55',
            name6: '17',
            name7: '256',
            name8: '224',
            name8: '87.50%',
          },
          {
            name1: '会计',
            name2: '市场营销策划',
            name3: '00184',
            name4: '19',
            name5: '4',
            name6: '0',
            name7: '15',
            name8: '13',
            name8: '86.67%',
          },
          {
            name1: '交通土建',
            name2: '工程监理',
            name3: '06086',
            name4: '2175',
            name5: '378',
            name6: '45',
            name7: '1752',
            name8: '1378',
            name8: '78.65%',
          },
          {
            name1: '交通土建',
            name2: '公路工程CAD',
            name3: '06288',
            name4: '181',
            name5: '18',
            name6: '2',
            name7: '161',
            name8: '115',
            name8: '71.43%',
          },
          {
            name1: '公共课程',
            name2: '管理学原理',
            name3: '00054',
            name4: '167',
            name5: '39',
            name6: '6',
            name7: '122',
            name8: '103',
            name8: '84.43%',
          },
        ],
        msg: 'Welcome to Your Vue.js App',
        other1:'',
        columns1: [
          {
            align:'center',
            title: '老师姓名',
            key: 'teacherName'
          },
          {
            align:'center',
            title: '招生人数',
            key: 'studentTotal'
          },
          {
            type:'index',
            align:'center',
            title: '排名',
          }
        ],
        data1: []
      }
    },
    created() {
      this.$store.state.showBottomNav = false;
      this.$store.state.showLogin = true;
      this.getList();
      this.other();
      console.log(this.other1)
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        let myChart3 = this.$echarts.init(document.getElementById('myChart3'));
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
        let myChart5 = this.$echarts.init(document.getElementById('myChart5'));
        // 绘制图表
        myChart.setOption({
          title : {
            text: '本站点学生总人数',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data:['自考人数','成考人数','其他']
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
                {value:this.data1.zikaoTotal, name:'自考人数'},
                {value:this.data1.chengkaoTotal, name:'成考人数'},
                {value:this.data1.otherTotal, name:'其他'},
              ]
            }
          ]
        });
        myChart1.setOption({
          title : {
            text: '各专业学生人数占比',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : 'left',
            data:['交通土建工程(湖南)','成教专科','交通土建工程(海南)','成教本科','其他']
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
                {value:this.data1.dataProfessionVos[0].professionPeople, name:'交通土建工程(湖南)'},
                {value:this.data1.dataProfessionVos[1].professionPeople, name:'成教专科'},
                {value:this.data1.dataProfessionVos[2].professionPeople, name:'交通土建工程(海南)'},
                {value:this.data1.dataProfessionVos[3].professionPeople, name:'成教本科'},
                {value:this.other1, name:'其他'},
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
      getList(){
        var _this=this;
        var token=sessionStorage.getItem('token');
        var userId=sessionStorage.getItem('userId');
        $.ajax({
          url: 'http://api-erp.juwenjiaoyu.com:9000/api/user/'+userId+'/teacher/selectData',
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
              _this.data1=[];
              _this.data1=res.data;
            }
            else{
              alert(res.message)
            }
          },
          error: function () {
          }});
      },
      other(){
        this.other1=this.data1.zikaoTotal+this.data1.chengkaoTotal+this.data1.otherTotal-this.data1.dataProfessionVos[0].professionPeople-this.data1.dataProfessionVos[1].professionPeople-this.data1.dataProfessionVos[2].professionPeople-this.data1.dataProfessionVos[3].professionPeople;
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
