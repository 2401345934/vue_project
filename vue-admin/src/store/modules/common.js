import { getCategory } from "@/api/news";

const actions = {
  getInfoCategory(content,requestData) {
    return new Promise((resolve, reject) => {
      //接口  token  username
      getCategory({}).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};


export default {
  namespaced:true,
  actions,
};