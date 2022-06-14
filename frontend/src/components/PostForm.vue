<template>
    <div>
        <form @submit.prevent="handlePost" class="user-form-box">
            <CustomTextarea v-model="userMsg" placeholder="Quoi de neuf ?" />
            <div class="input-wrapper">
                <label class="label-img fas fa-paperclip" for="picture"></label>
                <input @change="onFileChange" class="input-img" type="file" id="picture" name="image"
                    accept="image/*" />
                <button class="submit-btn" type="submit">Envoyer</button>
            </div>
        </form>

        <output>
            <p> {{ userShowMsg }} </p>
            <img :src="previewUrl" v-if="previewUrl">
            <!-- <p v-else>No image...</p> -->
        </output>
    </div>
</template>

<script>
import CustomTextarea from './CustomTextarea.vue';
import axios from 'axios';
export default {
    data() {
        return {
            userMsg: '',
            previewUrl: null,
            file: null
        };
    },
    components: {
        CustomTextarea,
    },
    computed: {
        userShowMsg() {
            return this.userMsg.replace(/\n/g, "<br/>");
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0]
            this.file = file
            if (!file) {
                return false
            }
            if (!file.type.match('image.*')) {
                return false
            }
            const reader = new FileReader()
            const that = this
            reader.onload = function (e) {
                that.previewUrl = e.target.result
            }
            reader.readAsDataURL(file)
        },
        handlePost() {
            console.log(this.userMsg)
            console.log(this.file)
            let formData = new FormData()
            formData.append('message', this.userMsg)
            formData.append('image', this.file)
            axios.post('posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(() => { console.log('SUCCESS!!'); })
                .catch(() => { console.log('FAILURE!!'); })
        }
    },
    
}
</script>

<style scoped>
.user-form-box {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--secondary-clr);
    margin: 10px auto;
    padding: .5rem;
    border-radius: .7rem;
    gap: 2rem;
    /* max-width: 60rem; */
    aspect-ratio: 9/1;
}

.user-text-input {
    width: 100%;
    height: 3rem;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: .3rem;
    font-size: 1.2em;
    overflow-wrap: break-word;
    resize: vertical;
}

.user-show-msg {
    width: 100%;
    border: 1px solid var(--tertiary-clr);
    overflow-wrap: break-word;
    background-color: #fff;
    padding: .2rem;
    border-radius: .4rem;
    font-size: 1.2em;
}

.input-wrapper {
    display: flex;
    justify-content: space-around;
}

.input-img {

    display: none;
}

.label-img {
    padding: .8rem;
    border-radius: 50%;
    background-color: var(--tertiary-clr);
    display: flex;
    justify-content: center;
    align-items: center;
}

.label-img:hover {
    color: aqua;
}

.submit-btn {
    min-width: 30%;
    padding: .5rem;
    border-radius: 5rem;
    border: 3px solid var(--primary-clr);
    border: none;
    font-size: 1.1em;
    text-transform: uppercase;
    background-color: var(--primary-clr);
    color: var(--tertiary-clr);
}

.submit-btn:hover {
    background: var(--primary-clr);
    box-shadow: 0 0 5px var(--primary-clr),
        0 0 15px var(--primary-clr),
        0 0 25px var(--primary-clr),
        0 0 50px var(--primary-clr);
    color: black;
}

@media (min-width: 600px) {

    .label-img {
        width: 25%;
        border-radius: 5rem;
        text-align: center;
        text-transform: lowercase;
    }

    .label-img::before {
        content: 'Ajouter une image';
        font-size: .8rem;
    }
}
</style>