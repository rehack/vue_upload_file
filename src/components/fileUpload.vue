<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-03-02 21:28:11
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-03-03 21:58:00
-->
<!-- multiple多个文件上传 accept文件类型-->
<template>
  <div style="text-align: left;">
      <div style="border: 1px solid red;">
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
      </div>
    

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




    <!-- Demo2 Test -->
    <div style="border:1px solid blue;margin-top:100px;padding:20px;">
        <el-form>
            <div style="width:500px;margin:10px" v-for="(item,index) in dataList" :key="index">
                <el-input v-model="item.name"></el-input>
                <el-upload
                    ref='upload'
                    :auto-upload="false"
                    action="#"
                    multiple
                    :http-request="uploadHandle"
                    :on-change="handleChange"
                    :file-list="item.files"
                >
                    <el-button slot="trigger" size="small" @click="currentIndexFUN(index)" type="primary">选择文件</el-button>
                </el-upload>
            </div>
            <el-button @click="addItem">增加一组数据</el-button>
            <el-button @click="delItem">删除一组数据</el-button>
            <el-button @click="send2" type="primary">上传</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 存放上传数据
        currentIndex: 0,
        formData: new FormData(),
        file: {}, //文件数据  
        name: '', // 用户名
        fileList: [],
        dataList:[
            {
                name: '',
                files: [],
            }
        ]
      }
    },
    created(){

      this.$axios.get('http://localhost:5000/data0')
          .then(function (res) {
            console.log('上传成功：', res);
            alert('上传成功!')
          })
          .catch(function (err) {
            console.log("上传失败", err);
          });

    },
    methods: {
      currentIndexFUN(ind){
        this.currentIndex = ind;
        console.log('this.currentIndex',this.currentIndex);
      },
      handleChange(file, fileList) {
        console.log('file, fileList',file, fileList,this.dataList);
        this.dataList[this.currentIndex].files=fileList
        // this.fileList = fileList.slice(-3);
        // this.fileList.push(file)
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
        this.$axios.post('http://localhost:5000/upload',
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

      },



        // 手动上传
      uploadHandle(param){
          console.log(param);
        //   如何append ??
        // this.dataList[0].files.append('files[]', param.file) 

      },
      addItem(){
        this.dataList.push(
            {
                name: '',
                files: [],
            }
        )
      },
      delItem(){
          this.dataList.pop()
      },
    //  发送给后台
      send2(){
        // this.$refs.upload.submit() // 触发自定义上传方法 手动上传 

        var aa = this.dataList
        console.log(aa);
        this.$axios.post('/api/upload',
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