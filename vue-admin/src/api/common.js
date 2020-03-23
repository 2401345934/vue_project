import { reactive  , ref} from "@vue/composition-api"
import { getCategory } from "./news";


export function common() {

  const categoryInfo = reactive({
        item: []
  })

  const getInfo = () => {
        getCategory({})
          .then((res) => {
            categoryInfo.item = res.data.data.data
          })
          .catch((err) => {})
  };

  return {
    getInfo,
    categoryInfo
  }
}