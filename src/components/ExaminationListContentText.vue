<template>
  <Row class="analysis">
    <Col span="24">
      <span class="expand-key">知识点: </span>
      <span class="expand-value" v-html="row.contents"></span>
    </Col>
  </Row>
</template>
<script>
    export default {
        name: "ExaminationListContentText",
        props: {
          row: Object
        }
    }
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
  .answer{
    padding-bottom: 20px;
  }
  .expand-key{
    color: #2d8cf0;
  }
</style>
