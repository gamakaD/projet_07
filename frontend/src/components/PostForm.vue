<template>
    <div>
        <form @submit.prevent="handlePost" class="user-form-box">
            <CustomTextarea ref="textarea" v-model="userMsg" placeholder="Quoi de neuf ?" />
            <div class="input-wrapper">
                <label class="label-img fas fa-paperclip" for="picture"></label>
                <input @change="onFileChange" 
                        class="input-img" 
                        type="file" 
                        id="picture" 
                        name="image"
                        accept="image/*" 
                />
                <button type="submit" 
                        class="submit-btn"
                        :class="{active: isUserMsgEmpty}" 
                        :disabled="!isUserMsgEmpty">
                            Envoyer
                </button>
            </div>
        </form>

        <output :class="{'output-preview': previewUrl}">
            <img class="preview-img" :src="previewUrl" v-if="previewUrl">
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
            file: null,
        };
    },
    components: {
        CustomTextarea,
    },
    computed: {
        token() {
            return this.$store.getters.token
        },
        user() {
            return this.$store.getters.user
        },
        isUserMsgEmpty() {
            return this.userMsg
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
        async newPost(post) {
            await axios.post('posts', post, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token
                }
            })
                .then(() => { this.$router.back() })
                .then(() => { console.log('SUCCESS!!'); })
                .catch(() => { console.log('FAILURE!!'); })
        },
        async modifyPost(post) {
            await axios.put('posts/' + this.$route.params.id, post, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + this.token
                }
            })
                .then(() => { this.$router.back() })
                .then(() => { console.log('SUCCESS!!'); })
                .catch(() => { console.log('FAILURE!!'); })
        },
        handlePost() {
            let formData = new FormData()
            formData.append('author', this.user)
            formData.append('message', this.$refs.textarea.value.trim())
            formData.append('image', this.file)
            formData.append('createdAt', new Date())
            if (this.$route.path === '/dashboard') {
                this.newPost(formData)
            } else {
                this.modifyPost(formData)  
            }
        },
        async getPostInfo() {
            let id = this.$route.params.id
            const response = await axios.get('posts/' + id, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
            this.$refs.textarea.value = response.data.message
            this.userMsg = response.data.message
            this.previewUrl = response.data.imageUrl
            this.$nextTick(() => {
                this.$refs.textarea.$el.focus()
            })
        },
    },
    beforeMount() {
        if (this.$route.params.id) {
            this.getPostInfo()
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
    aspect-ratio: 9/1;
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

.active:hover {
    background: var(--primary-clr);
    box-shadow: 0 0 5px var(--primary-clr),
        0 0 15px var(--primary-clr),
        0 0 25px var(--primary-clr),
        0 0 50px var(--primary-clr);
    color: black;
}

.output-preview {
    display: flex;
    justify-content: center;
    margin-bottom: .55rem;
    border: 2px solid black;
    background-color: rgb(255, 255, 255);
    border-radius: .7rem;
    overflow: hidden;
}

.preview-img {
    max-width: fit-content;
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