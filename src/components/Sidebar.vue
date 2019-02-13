<template>
  <Row>
    <Col span="8" class="aside">
      <Menu :theme="theme" active-name="1-1" :open-names="['1','2','3','4','5','6','0']">
        <Submenu v-for="(item,index) in functions" :name="index+''">
          <template slot="title">
            <Icon type="ios-paper"/>
            {{item.title}}
          </template>
          <MenuItem :name="getName(index,index1)" v-on:click="getName(index,index1)" v-for="(item,index1) in item.children"><router-link :to="item.url">{{item.title}}</router-link></MenuItem>
        </Submenu>
      </Menu>
    </Col>
  </Row>
</template>

<script>
  export default {
    data () {
      return {
        theme: 'dark',
        functions:[],
      }
    },
    created() {
      this.functions=JSON.parse(localStorage.getItem('functions'));
    },
    methods:{
      getName(index,index1){
        return index+"+"+index1
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-menu-item-selected a{
  color: white;
}
  .ivu-menu-item a{
    width: 100%;
    display: block;
    color: white;
  }
  .aside{
    width: 100%!important;
  }
</style>
