import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const app ={
    data() {
      return {
        api:{
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'tsaitsai',
        },
        products: [],
        temp: [],
        isLoaded:false,
      }
    },
    methods: {
      checkAdmin() {
        axios.post(`${this.api.url}/api/user/check`)
          .then((response) => {
            if (response.data.success) {
              this.getData();
            } else {
              window.location = 'login.html';
            }
          })
          .catch((err) => {
            alert(err.data.message)
            window.location = 'login.html';
          })
      },
      getData() {
        axios.get(`${this.api.url}/api/${this.api.path}/admin/products`)
          .then((response) => {
            if (response.data.success) {
              this.products = response.data.products;
            }
          })
          .catch((err) => {
            alert(err.data.message);
          })
          .then(()=>{
              this.isLoaded = true
          })
      },
      showDetail(item) {
        this.temp = item;
      },
      switchEnabled(item){
        item.is_enabled = !item.is_enabled;
      },
    },
    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.checkAdmin()
    }
  }
createApp(app).mount('#app');
