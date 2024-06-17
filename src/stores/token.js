import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useTokenStore = defineStore('token', () => {
    const token = ref(localStorage.getItem('token') || '');
    const setToken = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }
    const removeToken = () => {
        token.value = '';
        localStorage.removeItem('token');
    }
    return {
        token, setToken, removeToken
    }
});