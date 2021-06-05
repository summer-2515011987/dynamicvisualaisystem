<template>
  <div class="userManagement">

    <el-button @click="test">用户管理</el-button>

  </div>
</template>

<script>
    import {
        getMenus
    } from "@/api/login";
    export default {
        name: "",
        components: {},
        props: {},
        data() {
            return {};
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        methods: {
            test() {
                console.log('333')
                getMenus()
                    .then(res => {
                        // console.log('333', res)
                        console.log("菜单接口-res.data.data", res.data.data);
                        const data = res.data.data
                            // if()
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        }
    };
</script>

<style scoped lang="less"></style>