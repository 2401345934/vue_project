import { MessageBox } from "element-ui";
import { reactive, ref, isRef, onMounted } from "@vue/composition-api";



// 3.0写法
export function global() {
  // 逻辑
  const str = ref("")
  const confirm = (params) => {
    MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true
      }).then(() => {
        str.value = params.id || ""
        params.fn && params.fn(str.value);
      }).catch(() => {
       params.catchFn && params.catchFn()

      });
  }
  return {
    str,
    confirm
  }
}

// export default {
//   install(Vue, options) {
//     Vue.prototype.confirm = (params) => {
//       MessageBox.confirm(params.content, params.tip || "提示", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: params.type || "warning",
//         center: true
//       }).then(() => {
//
//         params.fn && params.fn(params.id);
//
//       }).catch(() => {
//         // root.$message({
//         //   type: "info",
//         //   message: "已取消删除"
//         // });
//
//       });
//     };
//   }
// };