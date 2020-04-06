import { reactive, ref, isRef, onBeforeMount, watch } from "@vue/composition-api";

export function paginationPage() {

  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 100,
    pageList: [10,20,30,40]
  });

  const totalCount = (val) => {
    pageData.total =val
  }

  const handleSizeChange = (val) => {
    pageData.pageSize = val
  };
  const handleCurrentChange = (val) => {
    pageData.currentPage = val

  };
  return {
    pageData,
    handleSizeChange,
    handleCurrentChange,
    totalCount
  };
}