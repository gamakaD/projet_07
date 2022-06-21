import store from "."
import axios from "axios"

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'setToken':
            if (mutation.payload) {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                sessionStorage.setItem('token', mutation.payload)
            } else {
                // axios.defaults.headers.common['Authorization'] = null
                sessionStorage.removeItem('token')
            }
            break
    }
})