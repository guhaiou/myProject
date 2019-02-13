<template>
  <div>
    <Row class="answer" v-if="row.optionsList">
      <Col span="4" v-for="(item,index) in row.optionsList">
        <span class="expand-key">{{String.fromCharCode(65+index)}}:</span>
        <span class="expand-value" v-html="item.name" style="display: inline-block"></span>
      </Col>

    </Row>
    <Row class="analysis" v-if="row.rightAnswer">
      <Col span="24">
        <span class="expand-key">正确答案: </span>
        <span class="expand-value" v-html="row.rightAnswer" style="display:inline-block"></span>
      </Col>
    </Row>
    <Row class="analysis" v-if="row.analysis">
      <Col span="24">
        <span class="expand-key">解析: </span>
        <span class="expand-value" v-html="row.analysis" style="display: inline-block"></span>
      </Col>
    </Row>
    <Row class="analysis" v-if="row.examPoint">
      <Col span="24">
        <span class="expand-key">考点: </span>
        <span class="expand-value" v-html="row.examPoint" style="display:inline-block"></span>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "TableExpand",
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
    padding-top: 20px;
    border-top: 1px solid #dcdcdc;
  }
  .answer{
    padding-bottom: 20px;
  }
  .expand-key{
    color: #2d8cf0;
  }
</style>
