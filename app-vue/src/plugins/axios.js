import Vue from 'vue'
import axios from 'axios'

const Axios = axios.create({
  baseURL: `${process.env.VUE_APP_URL}/`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('financeiro:token')
  }
})

Vue.prototype.$axios = Axios

export default Axios
