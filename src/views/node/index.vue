<template>
  <div class="node-container">
    <el-card class="box-card">
      <detail-tab :tabOption="tabOption" :currentView="currentView" @click="swtichTab"
        style="background:#fff;margin:20px;">
        <div :slot="currentView">
          <template v-for="item in tabOption">
            <component v-if="currentView == item.name" :is="item.name" :key="item.name" :ref="item.name"></component>
          </template>
</div>
</detail-tab>
</el-card>
</div>
</template>

<script>
    import DetailTab from "@/components/DetailTab";
    import applicationModule from "./components/applicationModule"
    import supportStaff from "./components/supportStaff"
    export default {
        name: "",
        components: {
            DetailTab,
            applicationModule,
            supportStaff
        },
        props: {},
        data() {
            return {
                shopingCarts: [{
                    goodsName: '',
                    price: '',
                    quantity: ''
                }],
                currentView: "applicationModule",
                tabOption: [{
                    label: "系统应用模块", //tab组件中的名字
                    name: "applicationModule", // tab组件的对应项
                    view: ""
                }, {
                    label: "系统支撑人员",
                    name: "supportStaff",
                    view: ""
                }],
            };
        },
        computed: {
            totalPrice: function() {
                let total = 0;
                this.shopingCarts.forEach(function(item, index) {
                    let subtotal = item.price * item.quantity;
                    total += subtotal;
                });
                return total;
            }

        },
        // watch: {
        //     firstName(newName, oldName) {
        //         this.fullName = newName + ' ' + this.lastName;
        //         console.log('this.fullName', this.fullName)
        //     }
        // },
        created() {},
        mounted() {},
        methods: {
            add: function() {
                this.shopingCarts.push({
                    goodsName: '',
                    price: '',
                    quantity: ''
                });
            },
            remove: function(index) {
                this.shopingCarts.splice(index, 1);
            },

            swtichTab(tab) {
                this.currentView = tab.name;
            },
        }
    };
</script>

<style scoped lang="less">
    .aaa {
        color: red
    }
    
    .bbb {
        color: yellow
    }
</style>