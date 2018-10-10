<template>
  <div class="container">
    <ul>
      <li v-for="(user, index) in users" :key="index">{{ user.name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
    // 你可能想要在服务器端获取并渲染数据。Nuxt.js添加了asyncData方法使得你能够在渲染组件之前异步获取数据。
    async asyncData (app) {
    let { data } = await app.$axios.get('/api/v1/users').then(res => {
      return res
    })
    console.table(data)
    return {
      users: data
    }
  }
}
</script>
