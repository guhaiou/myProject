<template>
  <div>
    <Row class="answer">
      <Col span="6">
        <span class="expand-key">A: </span>
        <span class="expand-value">{{ row.question1 }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">B: </span>
        <span class="expand-value">{{ row.question2 }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">C: </span>
        <span class="expand-value">{{ row.question3 }}</span>
      </Col>
      <Col span="6">
        <span class="expand-key">D: </span>
        <span class="expand-value">{{ row.question4 }}</span>
      </Col>
    </Row>
    <Row class="analysis">
      <Col span="24">
        <span class="expand-key">解析: </span>
        <span class="expand-value">{{ row.analyse}}</span>
      </Col>
    </Row>
    <Row class="analysis">
      <Col span="24">
        <span class="expand-key">考点: </span>
        <span class="expand-value">{{ row.examinationSite}}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "ExamPaperText",
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
