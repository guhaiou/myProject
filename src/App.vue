<template>
  <div id="app">
    <div class="container">
      <Header v-if="$store.state.showLogin"></Header>
      <Row v-if="$store.state.showLogin">
        <Col span="3"><Sidebar class="side"></Sidebar></Col>
        <Col id="right-container" span="21"><router-view/></Col>
      </Row>
      <router-view v-if="$store.state.showBottomNav"/>
    </div>

  </div>
</template>

<script>
import Header from './components/Header'
import Sidebar from './components/Sidebar'
export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
  }
}
</script>

<style>
  .side{
    width: 100% !important;
  }
  .ivu-menu{
    width: 100%!important;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .content{
    display: flex;
    justify-content: space-between;
  }
</style>
