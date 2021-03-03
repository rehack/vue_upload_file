<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-03-02 21:28:11
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-03-03 21:25:15
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
      <el-button @click="send" type="primary" style="width: 100px;">上传</el-button>
    </p>

    <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

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
        name: '', // 用户名
        fileList: []
        // fileList: [
        //   {name: 'food.jpeg', 
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, 
        //   {name: 'food2.jpeg', 
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }]
      }
    },
    created(){

      this.$axios.get('http://localhost:9000/data0')
          .then(function (res) {
            console.log('上传成功：', res);
            alert('上传成功!')
          })
          .catch(function (err) {
            console.log("上传失败", err);
          });

    },
    methods: {
      handleChange(file, fileList) {
        console.log('file, fileList',file, fileList,this.fileList);
        // this.fileList = fileList.slice(-3);
        this.fileList.push(file)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log("handleRemove",file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
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
        this.$axios.post('http://localhost:9000/fileUpload',
          aa,
          {
            headers: { "Content-Type": "multipart/form-data" }
          })
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