<template>
  <div class="main_contain">
    <div class="headerd">
      <span class="el-icon-caret-right"></span>
      边缘节点-详情
      <el-button
        type="primary"
        class="searchBtn"
        style="float: right; margin-top: 10px; margin-right: 10px"
        @click="$router.go(-1)"
        >返回</el-button
      >
      <el-button
        type="primary"
        class="freshBtn"
        style="float: right; margin-top: 10px; margin-right: 10px"
        @click="handlerefreshData()"
        >刷新</el-button
      >
    </div>
    <div class="myTable">
      <el-form class="demo-form-inline" style="text-align: left">
        <el-row>
          <el-col :span="5">
            <el-form-item label="设备ID："
              ><span style="font-weight: 600">{{
                deviceId
              }}</span></el-form-item
            >
          </el-col>
          <el-col :span="4">
            <el-form-item label="IP："
              ><span style="font-weight: 600">{{ip}}</span></el-form-item
            >
          </el-col>
          <el-col :span="4">
            <el-form-item label="CPU："
              ><span style="font-weight: 600">{{ cpu }}</span></el-form-item
            >
          </el-col>
          <el-col :span="4">
            <el-form-item label="memory："
              ><span style="font-weight: 600">{{ memory }}</span></el-form-item
            >
          </el-col>
          <el-col :span="4">
            <el-form-item label="storeage："
              ><span style="font-weight: 600">{{storeage}}</span></el-form-item
            >
          </el-col>
          
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="应用列表" name="first"></el-tab-pane>
        <el-tab-pane label="任务列表" name="second"></el-tab-pane>
      </el-tabs>
      <el-table
        v-show="activeName == 'first'"
        ref="adminTable"
        :height="tableHeight"
        header-row-class-name="light_grey_table"
        :data="appList"
        style="width: 100%"
        v-loading="listLoading"
        stripe
        border
      >
        <el-table-column label="" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="60px" height="60px" />
          </template>
        </el-table-column>
        <el-table-column label="应用名称：">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="应用描述：">
          <template slot-scope="scope">{{ scope.row.brief }}</template>
        </el-table-column>
        <el-table-column label="CPU：" prop="cpu"></el-table-column>
        <el-table-column label="部署方式：" prop="deploy_way"></el-table-column>
        <!-- <el-table-column label="部署状态">
          <template slot-scope="scope">
            <span v-if="scope.row.deploy_status == 1">未部署</span>
            <span v-else>已部署</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作"  >
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delNode(scope.$index, scope.row)">卸载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="activeName == 'second'"
        ref="adminTable"
        :height="tableHeight"
        header-row-class-name="light_grey_table"
        :data="taskList"
        style="width: 100%"
        v-loading="listLoading"
        stripe
        border
      >
        <el-table-column label="视频流名称">
          <template slot-scope="scope">{{ scope.row.streamName }}</template>
        </el-table-column>
        <el-table-column label="边缘节点名称">
          <template slot-scope="scope">{{ scope.row.edgeName }}</template>
        </el-table-column>
        <el-table-column label="应用能力">
          <template slot-scope="scope">{{ scope.row.appName }}</template>
        </el-table-column>
        <el-table-column label="抽帧频率" width="160">
          <template slot-scope="scope">{{ scope.row.frequency }}</template>
        </el-table-column>
        <el-table-column label="任务状态" width="140">
          <template slot-scope="scope">
            {{ scope.row.status }}
            <!-- <span v-if="scope.row.status == 0">未下发</span> -->
            <!-- <span v-else>已下发</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import service from "@/api/mobileApi";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1,
};

export default {
  name: "adminList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null,
      tableHeight: document.documentElement.clientHeight - 380 + "px",
      labelPosition: "right",
      formLabelAlign: {
        name: "20",
        region: "30",
        type: "40",
      },
      activeName: "first",
      nodeId: sessionStorage.getItem("nodeId"),
      cpu: "",
      memory: "",
      storeage: "",
      ip:"",
      deviceId: "",
      appList:null,
      taskList:null

    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      service.nodeDetail({ id: parseInt(this.nodeId) }).then((response) => {
         this.listLoading = false;
        if(response.code == 0){
           this.listLoading = false;
          var data = response.data;
          this.appList = data.app_list;
          this.taskList = data.task_list;
          this.deviceId = data.deviceId;
          this.cpu = data.cpu;
          this.memory = data.memory;
          this.storeage = data.storeage;
          this.ip = data.ip;
        }
        // this.list = response.data.list;
        // this.total = response.data.total;
        // this.listLoading = false;
      });
    },handlerefreshData(){
      this.getList();
    },delNode(index, row){
       this.$confirm('是否要卸载该应用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
         var param = {appId: row.id,edgeId:parseInt(this.nodeId)};
         service.undeployApp(param).then(response => {
           console.log(response)
          if(response.code==0){
            this.$message({
              message:response.message,
              type: 'success'
            });
          }
          // this.listLoading = false;
          // this.getList();
          setTimeout(() => {
            this.getList();
            this.listLoading = false;
          }, 2000);
      }).catch(error => {
        this.listLoading = false;
      })
      });
    },
    // timer() {
    //   return setTimeout(() => {
    //     this.getList();
    //   }, 5000);
    // },
  },
  watch: {
    // appList() {
    //   this.timer();
    // },
    // taskList(){
    //    this.timer();
    // }
  },
  // destroyed() {
    // clearTimeout(this.timer);
  // },
};
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>