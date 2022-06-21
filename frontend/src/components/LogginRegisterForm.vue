<template>
    <div class="login-box">
        <h2 v-if="mode === 'login'">Login</h2>
        <h2 v-else>Créez votre compte</h2>
        <form class="login-form" @submit.prevent="submitForm">
            <div class="user-box">
                <label for="email" class="label">Email</label>
                <input v-model="userEmail" type="email" name="email" id="email">
                <span class="error-msg" v-if="v$.userEmail.$error">
                    {{ v$.userEmail.$errors[0].$message }}
                </span>
            </div>
            <div class="user-box">
                <label for="password" class="label">Mot de passe</label>
                <input v-model="userPassword.password" type="password" name="password" id="password">
                <span class="error-msg" v-if="v$.userPassword.password.$error">
                    {{ v$.userPassword.password.$errors[0].$message }}
                </span>
            </div>
            <div v-if="mode === 'register'" class="user-box">
                <label for="confirm-password" class="label">Confirmer le mot de passe</label>
                <input v-model="userPassword.confirm" type="password" name="confirm-password" id="confirm-password">
                <span class="error-msg" v-if="v$.userPassword.confirm.$error">
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
                <p class="form__bottom-text" @click="switchToRegister" v-if="mode === 'login'">Créer un compte</p>
                <p class="form__bottom-text" @click="switchToLogin" v-else>Se connecter</p>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            mode: 'login',
            v$: useVuelidate(),
            userEmail: '',
            userPassword: {
                password: '',
                confirm: ''
            }
        }
    },
    validations() {
        return {
            userEmail: { required, email },
            userPassword: {
                password: { required, minLength: minLength(4) },
                confirm: { required, sameAs: sameAs(this.userPassword.password) }
            },
        }
    },
    methods: {
        ...mapActions({
            login: 'login'
        }),

        deleteFields() {
            this.userEmail = ''
            this.userPassword.password = ''
            this.userPassword.confirm = ''
        },
        switchToRegister() {
            this.mode = 'register'
            this.deleteFields()
        },
        switchToLogin() {
            this.mode = 'login'
            this.deleteFields()
        },
        async register(credentials) {
            await axios.post('auth/register', credentials)
                .then(alert('Compte Crée'))
        },
        submitForm() {
            this.v$.$validate()
            const credentials = { email: this.userEmail, password: this.userPassword.password }
            if (this.mode === 'register') {
                if (!this.v$.$error) {
                    this.register(credentials)
                }
            } else if (!this.v$.userEmail.$error && !this.v$.userPassword.password.$error) {
                this.login(credentials)
                    .then(() => this.$router.push({ name: 'welcome' }))
                    .catch(() => alert('Log Failed'))
            }
        },
    }
}
</script>

<style scoped>
.login-box {
    width: 35rem;
    margin: 0 auto;
    padding: .8rem;
    background-color: var(--primary-clr);
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border: 2px solid var(--secondary-clr);
    border-radius: 10px;
}

.login-box h2 {
    color: var(--tertiary-clr);
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2em;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.user-box {
    font-size: 1.2em;
}

input {
    width: 100%;
    margin-top: .2rem;
    padding: .4rem;
    font-size: .9em;
    color: #fff;
    border: 1px solid #fff;
    border-radius: .5rem;
    outline: none;
    background: transparent;
}

.label {
    font-size: .8em;
    font-weight: 600;
    color: #fff;
}

.error-msg {
    padding-left: .2rem;
    font-size: .7em;
}

.form__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: .7rem;
    margin-top: .8rem;
}

.form-btn {
    min-width: 50%;
    min-height: 2.9rem;
    padding: .5rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 2px;
    color: var(--tertiary-clr);
    border: 5px solid var(--secondary-clr);
    border-radius: 5rem;
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

.form__bottom-text {
    font-size: 1.1em;
}

.form__bottom-text:hover {
    color: rgb(20, 20, 139);
    cursor: pointer;
}
</style>