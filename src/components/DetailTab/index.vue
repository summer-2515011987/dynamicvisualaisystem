<template>
  <div>
    <el-tabs @tab-click="handleClick" v-model="activeName" class="tab-detail-console" :type="type" :stretch="stretch">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabOption" :key="item.name">
        <slot v-if="item.name" :name="item.name">
        </slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        props: {
            tabOption: [Array, Object],
            currentView: [String],
            type: [String],
            stretch: [Boolean]
        },
        data() {
            return {
                activeName: this.currentView
            }
        },
        watch: {
            currentView(val) {
                this.activeName = val
            }
        },

        methods: {
            handleClick(tab, event) {
                this.activeName = tab.name
                this.$emit('click', tab)
            }
        },
        created() {
            if (!this.currentView) {
                this.activeName = this.tabOption[0].name
            }
        }
    }
</script>

<style lang="less" scoped>
    .tab-detail-console {
        padding-top: 20px;
        padding-left: 10px;
    }
</style>