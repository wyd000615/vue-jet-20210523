<template>

  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
    <h2>欢迎来到vueadmin</h2>
    <el-image :src="require('@/assets/qrcode_gimg2.baidu.com.png') " style="width: 180px;height: 180px" > </el-image>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm" style="width: 380px">
          <el-input v-model="ruleForm.yzm" style="width: 170px ;float:left"></el-input>
          <el-image class="captchaImg" :src="captchaImg"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {

  name: "Login",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
       yzm:'',
        token:''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],

      },
      captchaImg:null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          this.$axios({method:'post',url:'/login'}).then(res=>{
            const jwt =res.headers['authorization']
            this.$store.commit('SET_TOKEN',jwt)
            this.$router.push("/index")
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha(){
      var that=this
      //this.$axios({method:'get',url:'/captcha'}).then(res=>{
      this.$axios.get('/captcha').then(res=>{
        console.log(res)
        this.ruleForm.token=res.data.data.token
        this.captchaImg=res.data.data.captchaImg
      })
    },
    //result -code msg

  },
  created() {
    this.getCaptcha()
  }
}
</script>
<!--scoped很重要-->
<style scoped>
  .el-row{
    background-color: #fafafa;
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .el-divider{
    height: 200px;
  }
  .captchaImg{
    float: left;
    margin-left: 8px;
    border-radius: 40px;
  }
</style>
