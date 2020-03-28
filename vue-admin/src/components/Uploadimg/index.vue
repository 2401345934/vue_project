<template>
  <div>
    <el-upload
            class="avatar-uploader"
            action="http://up.qiniup.com"
            :data="data.uploadKey "
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
      <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>

</template>

<script>
  import { reactive, ref, isRef, onMounted, watch } from "@vue/composition-api";
  import { getCategory, getList, editInfo, uploadImgToken } from "@/api/news";

  export default {
    name: "Uploadimg",
    props: {
      imgUrl: {
        type: String,
        default: ""
      }
    },
    setup(props, { root }) {

      //定义总变量
      const data = reactive({
        imageUrl: "",  //缩略图
        uploadKey: {  //七牛云
          token: "",
          key: ""
        }
      });

      //监听
      watch(() => props.imgUrl ,(value) => {
        console.log(value);
      })


      //七牛云

      const qiniuYun = () => {
        let date = {
          "accessKey": "GVnd4nxKVwnm3zQUALHjmWCNGAQEVbch642U17bJ",
          "secretKey": "U9Nl4uwiCDBt6Pq9WRfDtzs4V3GBiB0C_4GRCoqL",
          "buckety": "2401345934test"
        };
        uploadImgToken(date).then((res) => {
          data.uploadKey.token = res.data.data.token;
        });
      };


      //上传图片
      const handleAvatarSuccess = (res, file) => {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res);
      };
      const beforeAvatarUpload = (file) => {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          root.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          root.$message.error("上传头像图片大小不能超过 2MB!");
        }

        //文件转码
        let suffix = file.name;
        let key = encodeURI(`${suffix}`);
        data.uploadKey.key = key;

        return isJPG && isLt2M;
      };


      //挂载后
      onMounted(() => {
        qiniuYun();
      });

      return {
        handleAvatarSuccess,
        beforeAvatarUpload,
        data
      };
    }
  };
</script>

<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 2px dashed deepskyblue;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>