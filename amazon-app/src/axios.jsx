import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});
//"https://amazon-backend-app.herokuapp.com"
export default instance;