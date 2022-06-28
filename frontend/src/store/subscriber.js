import store from "."

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'setToken':
            if (mutation.payload) {
                sessionStorage.setItem('token', mutation.payload)
            } else {
                sessionStorage.removeItem('token')
            }
            break
    }
})