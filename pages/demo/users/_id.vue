<template>
  <div class="container">
    This Id is {{ id }}
  </div>
</template>
<script>
export default {
  async asyncData ({ params }) {
    console.log(params)
    return {
      id: params.id
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
