<template>
    <div>这是内容模块</div>
</template>

<script>
    export default {
        name: "Index",
      created() {
        this.$store.state.showBottomNav = false,
          this.$store.state.showLogin = true
      }
    }
</script>

<style scoped>

</style>
