<template>
  <div>

    <el-table :data="data.tableData" border style="width: 100%" @selection-change="handlerSelectionChange">
      <!--多选框-->
      <el-table-column type="selection" width="50" v-if="data.tableConfig.selectionShow"></el-table-column>

      <template v-for=" (item,index) in  data.tableConfig.tHead">
        <!-- v-slot -->
        <el-table-column :key="item.field" v-if="item.columnType === 'slot'" :prop="item.field" :width="item.width"
                         :label="item.label">
          <template slot-scope="scope">
            <slot :data="scope.row" :name="item.slotName"></slot>
          </template>
          <template slot-scope="scope">
            <slot :data="scope.row" :name="item.slotName"></slot>
          </template>

        </el-table-column>

        <!-- 文本数据渲染 -->
        <el-table-column :key="item.field" :prop="item.field" :width="item.width" :label="item.label"
                         v-else></el-table-column>
      </template>

    </el-table>

    <div class="table-footer">
      <el-row>
        <el-col :span="4">
          <slot name="tableFooterLeft"></slot>
        </el-col>
        <el-col :span="20">
          <el-pagination
                  v-if="data.tableConfig.paginationShow"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageData.currentPage"
                  background
                  :page-sizes="pageData.pageList"
                  :page-size="pageData.pageSize"
                  :layout=data.tableConfig.paginationLayout
                  :total="pageData.total"
                  :style="{textAlign: data.tableConfig.textAlign}">
          </el-pagination>


        </el-col>
      </el-row>
    </div>


  </div>

</template>

<script>
  import { reactive, ref, isRef, onBeforeMount, watch } from "@vue/composition-api";
  import { requestUrl } from "@/api/requestUrl";
  import { loadTableData } from "@/api/common";
  import { tableLoadData } from "./loadTabData";
  import { initTable } from "./initTable";
  import { paginationPage } from "./paginationPage";
  import { userDelete, actives, role } from "@/api/user";

  export default {
    name: "tableVue",
    props: {
      config: {
        type: Object,
        default: () => {
        }
      },
      tableRowData: {
        type: Object,
        default: () => {
        }
      }
    },
    setup(props, { root, emit }) {
      const data = reactive({
        tableData: [],
        tableConfig: {
          tHead: [],             // 表头信息
          selectionShow: true,   // 是否有全选 按钮
          recordCheckbox: true, //翻页记录
          requestData: "", //请求地址
          paginationShow: true,
          paginationLayout: "total, sizes, prev, pager, next, jumper",
          textAlign: "left"
        }

      });

      //当select 发生变化就会触发
      const handlerSelectionChange = (val) => {
        let tabledata = {
          id: val.map((item) => item.id)
        };
        emit("update:tableRowData", tabledata);
      };

      //加载分页
      const { pageData, handleSizeChange, handleCurrentChange, totalCount } = paginationPage();

      //加载数据请求
      const { Data, tableLoad } = tableLoadData({ root });

      //初始化Tab数组
      const { initTabData } = initTable();


      //父组件调用的方法刷新数据
      const gxTabDataList = () => {
        initTabData({ data: data.tableConfig, res: props.config });
        tableLoad(data.tableConfig.requestData);
      };

      //带参数刷新数据
      const gxTabData = (params) => {
        data.tableConfig.requestData.data = params;
        tableLoad(data.tableConfig.requestData);
      };

      //监听值的改变
      watch(() => Data.item, (newValue, oldValue) => {
          data.tableData = newValue;
        }
      );

      //数据渲染
      watch([
        () => Data.item,
        () => Data.total
      ], ([dataData, total]) => {
        data.tableData = dataData;
        totalCount(total);
      });

      //页码监听
      watch([
        () => pageData.pageSize,
        () => pageData.currentPage
      ], ([pageSize, currentPage]) => {
        //赋值
        let requestData = data.tableConfig.requestData;
        if (requestData.data) {
          // 更新值
          requestData.data.pageNumber = currentPage;
          requestData.data.pageSize = pageSize;
          tableLoad(requestData);
        }
        ;
      });
      onBeforeMount(() => {
        initTabData({ data: data.tableConfig, res: props.config });
        tableLoad(data.tableConfig.requestData);
      });
      return {
        data,
        pageData, handleSizeChange, handleCurrentChange, handlerSelectionChange,
        gxTabDataList, tableLoad, gxTabData
      };
    }
  }
  ;
</script>

<style scoped lang="scss">
  .table-footer {
    margin: 15px 0;
  }
</style>