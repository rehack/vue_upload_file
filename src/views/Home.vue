<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-03-03 01:22:06
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-03-03 01:24:44
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <fileUpload/>
  </div>
</template>

<script>
// @ is an alias to /src
import fileUpload from '@/components/fileUpload.vue';

export default {
  name: 'Home',
  components: {
    fileUpload,
  },
};
</script>
