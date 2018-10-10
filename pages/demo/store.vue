<template>
  <div class="continaer">
    <ul>
      <li v-for="(user, index) in list" :key="index">{{ user.name }}</li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  fetch ({store, params}) {
    return store.dispatch('getList')
  },
  computed: {
    ...mapState({
      list: state => state.list
    })
  }
}
</script>
<style lang="scss" scoped>

</style>

