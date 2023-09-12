import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    // let token = ref('');
    // let isLogin = ref(false);
    // let name = ref('');

    let token = '';
    let isLogin = false;
    let name = '';

    function setToken(string) {
        this.token = string;
    }
    function setIsLogin() {
        isLogin = true;
    }
    function setLogout() {
        tihs.isLogin = false;
    }
    function setName(String) {
        name = String;
    }

    return {token, isLogin, name, setToken, setIsLogin, setLogout, setName}
})