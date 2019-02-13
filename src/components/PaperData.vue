<template>
  <div class="all">
    <Row class="answer" v-if="row.options!=undefined">
      <span class="expand-key" style="margin-right: 20px">所有选项: </span>
      <Col v-for="(item,index) in row.options" style="display: inline-block;margin-right:40px">
        <span class="expand-key">{{String.fromCharCode(65+index)}}:</span>
        <span class="expand-value" style="display: inline-block" v-html="row.options[index].contents"></span>
      </Col>
    </Row>
    <Row class="analysis" v-if="row.optionsAnswer!=undefined">
      <Col span="24">
        <span class="expand-key" style="margin-right: 20px">正确答案: </span>
         <span v-for="(item,index) in row.optionsAnswer">
            <span class="expand-value" style="display:inline-block" v-if="row.optionsAnswer!=undefined" v-html="row.optionsAnswer[index].contents"></span>
         </span>
      </Col>
    </Row>
    <Row class="analysis" v-if="row.contentsAnswer!=undefined">
      <Col span="24">
        <span class="expand-key" style="margin-right: 20px">正确答案: </span>
        <span class="expand-value" style="display:inline-block"  v-html="row.contentsAnswer.answer"></span>
      </Col>
    </Row>
    <Row class="analysis" v-if="row.descriptions!=undefined">
      <Col span="24">
        <span class="expand-key" style="margin-right: 20px">题目解析: </span>
        <span class="expand-value" style="display:inline-block" v-html="row.descriptions"></span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object
    }
  }
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
  .analysis{

  }
  .answer{
    padding-bottom: 20px;
  }
  .expand-key{
    color: #2d8cf0;
  }
  .all>div{
    border-top: 1px solid #dcdcdc;
    padding:10px 0;
  }
  .all>div:nth-child(1){
    border-top:none;
  }
</style>
