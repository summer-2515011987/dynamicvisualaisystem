<template>
  <div class="login-container">
    <div class="login-box">
      <el-form :model="ruleForm" status-icon :rules="loginRules" ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <h3>视觉AI系统</h3>
        <el-form-item label="账号" prop="pass">
          <el-input type="password" v-model="ruleForm.mobile" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.verifycode" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登陆系统</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    // 在组件导入接口;
    import {
        getLogin
    } from "@/api/login";

    export default {
        name: "",
        components: {},
        props: {},
        data() {
            // 校验手机号
            let checkMobile = (rule, value, callback) => {
                // 校验逻辑   把value拿出来进行手机号的格式校验
                let valueCheck = /^1[3-9]\d{9}$/.test(value);
                if (!valueCheck) {
                    callback(new Error("手机号格式不正确"));
                }
            };
            return {
                loginData: {
                    username: "",
                    password: "",
                    rememberpwd: false
                },
                ruleForm: {
                    mobile: "13911111111",
                    verifycode: "246810"
                },
                // 表单验证规则对象
                loginRules: {
                    mobile: [{
                        validate: checkMobile,
                        trigger: "blur"
                    }, {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    }],
                    verifycode: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }, {
                        len: 6,
                        message: "请输入6位数字",
                        trigger: "blur"
                    }]
                },
                redirect: undefined,
                otherQuery: {}
            };
        },
        computed: {},
        watch: {
            $route: {
                handler: function(route) {
                    console.log('route', route)
                    const query = route.query
                    console.log('query2', query)
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        created() {},
        mounted() {},
        methods: {
            login() {

                // console.log("this.$refs.ruleForm.validate", this.$refs.ruleForm.validate);
                this.$refs.ruleForm.validate(valid => {
                    if (!valid) return false;
                    console.log('登陆')
                    this.$router.push({
                            path: this.redirect || '/',
                            query: this.otherQuery
                        })
                        // getLogin()
                        //     .then(res => {
                        //         this.$router.push({
                        //             path: this.redirect || '/',
                        //             query: this.otherQuery
                        //         })
                        //     })
                        //     .catch(err => {
                        //         console.log(err);
                        //     });

                });
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    console.log('acc', acc)
                    return acc
                }, {})
            }
        }
    };
</script>

<style scoped lang="less">
    .login-container {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: url("../../assets/images/login/loginBakg2.png") no-repeat center/cover;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .login-box {
            width: 380px;
            height: 340px;
            border: 6px solid #fff;
            border-radius: 5%;
            margin-right: 100px;
            .el-form-item {
                width: 90%;
            }
            h3 {
                text-align: center;
                font-size: 30px;
            }
            /deep/ .el-form-item__label {
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 18px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                box-sizing: border-box;
                font-weight: bold;
            }
            .el-button {
                width: 100%;
            }
        }
    }
</style>