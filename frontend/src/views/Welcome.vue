<template>
    <div>
        <h3> {{ user }}</h3>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            user: ''
        }
    },
    async created() {
            const response = await axios.get('auth/user' + sessionStorage.getItem('token'))
            this.user = response.data    
    },
}
</script>