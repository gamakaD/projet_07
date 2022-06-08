<template>
    <div class="login-box">
        <h2 v-if="mode === 'login'">Login</h2>
        <h2 v-else>Créez votre compte</h2>
        <form @submit.prevent="submitForm">
            <div class="user-box">
                <input v-model="userMail" type="email" name="email">
                <span class="error-msg" v-if="v$.userMail.$error">
                    {{ v$.userMail.$errors[0].$message }}
                </span>
                <label>Email</label>
            </div>
            <div class="user-box">
                <input v-model="userPassword.password" type="password" name="password">
                <span class="error-msg" v-if="v$.userPassword.password.$error">
                    {{ v$.userPassword.password.$errors[0].$message }}
                </span>
                <label>Mot de passe</label>
            </div>
            <div v-if="mode === 'register'" class="user-box">
                <input v-model="userPassword.confirm" type="password" name="password">
                <label>Cofirmer mot de passe</label>
                <span class="error-msg" v-if="v$.userPassword.password.$error">
                    {{ v$.userPassword.confirm.$errors[0].$message }}
                </span>
            </div>
            <div class="form__bottom">
                <button class="form-btn" v-if="mode === 'login'">
                    Connection
                </button>
                <button class="form-btn" v-else>
                    S'inscrire
                </button>
                <p @click="switchToRegister" v-if="mode === 'login'">Créer un compte</p>
                <p @click="switchToLogin" v-else>Se connecter</p>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import axios from 'axios'
export default {
    data() {
        return {
            mode: 'login',
            v$: useVuelidate(),
            userMail: '',
            userPassword: {
                password: '',
                confirm: ''
            },
        };
    },
    validations() {
        return {
            userMail: { required, email },
            userPassword: {
                password: { required, minLength: minLength(8) },
                confirm: { required, sameAs: sameAs(this.userPassword.password) }
            },
        }
    },
    methods: {
        switchToRegister() {
            this.mode = 'register';
        },
        switchToLogin() {
            this.mode = 'login';
        },
        postRegistration() {
            axios.post('http://127.0.0.1:4000/api/auth/register', { email: this.userMail, password: this.userPassword.password })
                .then(response => console.log(response))
                .catch(err => console.log(err));
        },
        submitForm() {
            this.v$.$validate()
            if (!this.v$.$error) {
                //     alert('success')
                // } else {
                //     alert('failed')
                // }
                if (this.mode === "login") {
                    // this.$router.push("dashboard");
                }
                else {
                    console.log(this.mode);
                    this.postRegistration();
                    // this.switchToLogin();
                }
            }
        },
    }
}
</script>

<style scoped>
.login-box {
    position: relative;
    max-width: 25rem;
    aspect-ratio: 2/1;
    background-color: var(--primary-clr);
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border: 2px solid var(--secondary-clr);
    border-radius: 10px;
    margin: 0 auto;
    padding: 1rem;
    top: 200px;
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: var(--tertiary-clr);
    text-align: center;
}

.user-box {
    position: relative;
    margin-bottom: 30px;
}

input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;

    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

input:focus~label,
input:valid~label {
    top: -20px;
    left: 0;
    color: var(--tertiary-clr);
    font-size: 13px;
}

.error-msg {
    font-size: .7rem;
}

.form__bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.form__bottom p {

    align-self: center;
}

.form__bottom p:hover {
    color: rgb(20, 20, 139);
    cursor: pointer;
}

.form-btn {
    width: 45%;
    padding: 5px;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 3px;
    color: var(--tertiary-clr);
    border: 2px solid var(--secondary-clr);
    border-radius: 50px;
    background-color: transparent;
    cursor: pointer;
}

.form-btn:hover {
    background: var(--secondary-clr);
    box-shadow: 0 0 5px var(--secondary-clr),
        0 0 15px var(--secondary-clr),
        0 0 25px var(--secondary-clr),
        0 0 50px var(--secondary-clr);
}
</style>