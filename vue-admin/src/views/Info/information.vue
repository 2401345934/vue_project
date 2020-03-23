<template>
  <div id="mation">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr style="margin: 30px -30px"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="11">
          <div class="category-wrap">
            <div class="category" v-for="(item,index) in category.item" :key="item.id">
              <!--一级分类-->
              <h4>
                <svg-icon icon-class="plus"/>
                {{ item.category_name }}
                <div class="buttonS">
                  <el-button size="mini" round type="danger" @click="editCategory({name:item , type:'first',id:item})">
                    编辑
                  </el-button>
                  <el-button size="mini" round type="success">添加子级</el-button>
                  <el-button size="mini" round @click="deleteCategoryBtnConfirm(item.id)">删除</el-button>
                </div>
              </h4>
              <!-- 子级分类 -->
              <ul v-if="item.children">
                <li v-for="children in item.children" :key="children.id">
                  {{children.category_name}}
                  <div class="buttonS">
                    <el-button size="mini" round type="danger">编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <h4 class="menu-title">
            一级分类编辑
          </h4>
          <el-form :label-position="labelPosition" label-width="142px" class="fromW" ref="categoryFrom">
            <el-form-item label="一级分类名称: " v-if="firstName">
              <el-input v-model="form.catname" :disabled="first_input"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称: " v-if="lastName">
              <el-input v-model="form.secname" :disabled="last_input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit" :loading="loading" :disabled="first_btn">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>


</template>

<script>
  import { reactive, ref, isRef, onMounted, onBeforeMount, watch } from "@vue/composition-api";
  import { AddFirstCategory, getCategory, DeleteCategory, EditCategory } from "@/api/news";
  import { global } from "@/utils/global";
  import { common } from "@/api/common";

  export default {
    name: "information",
    setup(props, { root, refs }) {


      const { getInfo, categoryInfo } = common();
      //global

      const { confirm } = global();

      //------------------------------------------------------------------------------
      const labelPosition = ref("center");
      const firstName = ref(true);
      const lastName = ref(true);
      let loading = ref(false);
      let first_input = ref(true);
      let last_input = ref(true);
      let first_btn = ref(true);
      // 确定按钮的类型
      const submit_button_type = ref("");


      let id = ref("");

      /*!reactive*/
      const form = reactive({
        catname: "",
        secname: ""
      });


      let category = reactive({
        item: [],
        current: []
      });


      const categoryFrom = ref(null);

      //添加
      const add = () => {
        if (!form.catname) {
          root.$message({
            message: "分类名称不能为空",
            type: "error"
          });
          return;
        }
        ;

        loading.value = true;

        AddFirstCategory({ categoryName: form.catname })
          .then((res) => {
            if (res.data.resCode === 0) {
              root.$message({
                message: res.data.message,
                type: "success"
              });
              category.item.push(res.data.data);
              loading.value = false;
              form.catname = "";
            }
            ;
          })
          .catch((err) => {
            loading.value = false;
            form.catname = "";
          });
      };

      //提交的时候
      const submit = () => {
        if (submit_button_type.value === "add") {
          add();
        } else if (submit_button_type.value === "first") {
          editFirstCategory();
        }
        ;
      };


      //添加一级分类的按钮显示
      const addFirst = () => {
        lastName.value = false;
        first_input.value = false;
        first_btn.value = false;
        submit_button_type.value = "add";
      };


      //删除
      const deleteCategoryBtnConfirm = (categoryId) => {
        id.value = categoryId;
        console.log(id.value);

        confirm({
          content: "确认删除信息 ?",
          fn: deleteCategory,
          tip: "警告",
          catchFn: () => {
            id.value = "";
          }
        });
      };

      const deleteCategory = () => {
        DeleteCategory({ categoryId: id.value })
          .then((res) => {

            if (res.data.resCode === 0) {
              root.$message({
                message: res.data.message,
                type: "success"
              });
              let index = category.item.findIndex((item) => item.id === id.value);
              category.item.splice(index, 1);
            }
          })
          .catch((err) => {
          });
      };

      //编辑
      const editCategory = (data) => {
        lastName.value = false;
        first_input.value = false;
        first_btn.value = false;
        //存储点击的时候的数据
        category.current = data;
        submit_button_type.value = data.type;
        form.catname = data.name.category_name;
      };


      const editFirstCategory = () => {
        if (!form.catname) {
          root.$message({
            message: "未选择分类",
            type: "error"
          });
          return;
        }
        ;

        let data = category.current.name;
        EditCategory({ id: data.id, categoryName: form.catname })
          .then((res) => {
            let response = res.data.data.data;
            root.$message({
              message: res.data.message,
              type: "success"
            });
            category.current.name.category_name = response.categoryName;
            //清空input 内容
            form.catname = "";
            category.current = [];
          });
      };


      //DOM对象挂载完成
      onMounted(() => {
        getInfo();
      });


      //监听分类
      watch(() => categoryInfo.item, (value) => {
        category.item = value;
      });

      return {
        labelPosition,
        form,
        submit,
        addFirst,
        firstName,
        lastName,
        category,
        loading,
        first_input,
        last_input,
        first_btn,
        categoryFrom,
        deleteCategory,
        deleteCategoryBtnConfirm,
        editCategory
      };
    }

  };
</script>

<style scoped lang="scss">
  @import "../../styles/main";

  #mation {

    .menu-title {
      line-height: 44px;
      background: #f3f3f3;
      padding-left: 22px;
    }

    .category-wrap {
      div:first-child {
        &:before {
          top: 20px;
        }
      }
      div:last-child {
        &:before {
          bottom: 21px;
        }
      }
    }

    .category {
      line-height: 44px;
      position: relative;
      cursor: pointer;

      &:before {
        content: "";
        position: absolute;
        width: 32px;
        border-left: 1px dotted #000;
        top: 0;
        bottom: 0;
        left: 19px;
      }
      h4 {
        padding-left: 40px;
        position: relative;
        .svg-icon {
          color: #000 !important;
          position: absolute;
          font-size: 16px;
          background: #fff;
          left: 12px;
          top: 13px;
        }
      }

      li {
        padding-left: 40px;
        position: relative;
        margin-left: 20px;
        &:before {
          content: "";
          position: absolute;
          width: 32px;
          border-bottom: 1px dotted #000;
          top: 22px;
          left: 0;
        }
      }

      h4, li {
        &:hover {
          background: #f3f3f3;
          .buttonS {
            display: block;
          }
        }
        @include webkit(transition, .5s ease 0s)
      }
    }

    .buttonS {
      position: absolute;
      right: 11px;
      z-index: 2;
      font-size: 12px;
      top: 0;
      display: none;
    }

    .fromW {
      width: 410px;
      margin-top: 26px;
    }

  }

</style>