<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-03-02 21:28:11
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-03-03 01:34:26
-->
<!-- multiple多个文件上传 accept文件类型-->
<template>
  <div style="text-align: left; border: 1px solid red;">
    <p>文件上传：</p>
    <p>
      上传人：<input v-model="name">
    </p>
    <p>
      图片：<input type="file" name="file" @change="addFile" ref="inputer">
    </p>
    <p>
      <button @click="send" style="width: 100px;">上传</button>
    </p>

    <!-- 
      accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
      <p>支持文件格式：.ppt .pptx .doc .docx .pdf ，单个文件不能超过20M.</p> 
    -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 存放上传数据
        formData: new FormData(),
        file: {}, //文件数据  
        name: '' // 用户名
      }
    },
    methods: {
      //上传文件
      addFile() {
        let inputDOM = this.$refs.inputer;
        console.log('inputDOM:', inputDOM);
        this.file = inputDOM.files[0];
        console.log('this.file', this.file);
        let size = Math.floor(this.file.size / 1024);
        if (size > 20 * 1024 * 1024) {
          alert("请选择20M以内的图片！");
          return false;
        }
        this.formData.append("file", this.file)
      },
      // 发送给后台
      send() {
        // 收集用户信息,所有数据都存在this.formData里
        this.formData.append("name", this.name);

        // this.$axios.get('/api/aa')
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        var aa = this.formData
        this.$axios.post('/api/fileUpload',
          aa,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        )
          .then(function (res) {
            console.log('上传成功：', res);
            alert('上传成功!')
          })
          .catch(function (err) {
            console.log("上传失败", err);
          });

      }
    }
  }
</script>

<style scoped>
  p {
    height: 35px;
  }
</style>