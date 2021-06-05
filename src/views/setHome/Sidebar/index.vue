<template>
  <el-menu style="border-right: none" :default-active="$route.path" router background-color="#002033" text-color="#fff"
    active-text-color="#ffd04b" :collapse-transition="false">
    <el-menu-item index="1">
      <i class="el-icon-s-home"></i>
      <span slot="title">边缘节点</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-chat-round"></i>
        <span>镜像管理</span>
      </template>
<el-menu-item>用户管理</el-menu-item>
<el-menu-item>市场镜像</el-menu-item>
</el-submenu>
<el-submenu index="3">
    <template slot="title">
        <i class="el-icon-chat-round"></i>
        <span>容器管理</span>
      </template>
    <el-menu-item>容器模板</el-menu-item>
    <el-menu-item>容器部署</el-menu-item>
</el-submenu>
<el-submenu index="4">
    <template slot="title">
        <i class="el-icon-chat-round"></i>
        <span>云边消息</span>
      </template>
    <el-menu-item>节点配置</el-menu-item>
    <el-menu-item>消息下发</el-menu-item>
</el-submenu>
<el-menu-item index="/home/dataAnalysis">
    <i class="el-icon-chat-dot-round"></i>
    <span slot="title">数据分析</span>
</el-menu-item>
</el-menu>
</template>
<script>
    // import { mapGetters } from "vuex";

    export default {
        computed: {
            // ...mapGetters(["routers", "sidebar"]),
            // routes() {
            //   // return this.routers;
            // },
            // isCollapse() {
            //   return false;
            // }
        },
        methods: {
            // hasOneShowingChildren(children) {
            //   const showingChildren = children.filter(item => {
            //     return !item.hidden;
            //   });
            //   return showingChildren.length === 1;
            // }
        }
    };
</script>

<style scoped lang="less"></style>