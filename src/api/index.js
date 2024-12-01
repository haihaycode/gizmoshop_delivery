// api/index.js
import { createStore } from "vuex";
import Axios from "@/api/axios";
import { HOST } from "./config";

export default createStore({
  modules: {},
});
export const testApi = async () => {
  try {
    const response = await Axios.get(`${HOST}/posts/1`);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`Lỗi khi test API: ${error.data}`);
  }
};
