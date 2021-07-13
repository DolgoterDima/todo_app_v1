<template>
<div class="row">

    <form class="col s12  offset-s0 l6 offset-l3" @submit.prevent="checkUser(form)">
        <div class="row">
            <div class="s12">
                <h1>Login</h1> {{$store.state.currentUser}}
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12 l6">
                <input id="login" type="text" v-model="login" @input="on_input" :class="{'invalid': login_validation, 'valid':  !login_validation}">
                <label for="login">Login</label>
                <span class="helper-text" v-if="errors.login" :data-error="errors.login" data-success="">{{errors.login}}</span>
            </div>

            <div class="input-field col  s12 l6">
                <input id="password" type="text" v-model="password" @input="on_input" :class="{'invalid': password_validation, 'valid':  !password_validation}">
                <label for="password">Password</label>
                <span class="helper-text" v-if="errors.password" :data-error="errors.password" data-success="">{{errors.password}}</span>
            </div>

            <div class="input-field col  s12  ">
                <button type="submit" class="btn waves-effect waves-light" :disabled="disabled_button">Login <i class="fas fa-sign-in-alt"></i></button>
            </div>

        </div>
    </form>
</div>
</template>

<script>
import M from 'materialize-css'

export default {
    data() {
        return {
            user: null,

            login_disabled: true,
            login: null,
            password: null,
            errors: {
                login: false,
                password: false,
            },
        }
    },
    methods: {

        on_input() {
            this.login ? this.errors.login = "empty" : this.errors.login = null
            this.password ? this.errors.password = "empty" : this.errors.password = null
        },
        checkUser() {

            /* проверка есть ли юзер в бд*/
            this.$store.state.currentUser = this.changeDB_to_array.filter(item => item.user_login == this.login && item.user_password == this.password)

            if (this.$store.state.currentUser.length) { //user successfuly logged
                //this.$store.state.currentUser={...user}
                localStorage.setItem("current_user", this.$store.state.currentUser[0].id)
                M.toast({
                    html: '<span>Congratulations, you are logged</span> '
                });

                setTimeout(() => {
                    this.$router.push('profile')
                }, 200)
            } else {
                M.toast({
                    html: '<span>User with this login and password did not found</span> '
                });
            }
            // if (this.login && this.password) {
            //     this.login_disabled = false
            //     this.$router.push('home')
            //     M.toast({
            //         html: '<span>Congratulations, you are logged</span> '
            //     });
            // } else {
            //     M.toast({
            //         html: '<span>fill form</span> '
            //     });

            // }
        }
    },
    computed: {
        disabled_button() {
            if (this.login && this.password) {
                return false
            }
            return true
        },
        changeDB_to_array() {
            return Object.keys(this.$store.state.users).map((key) => {
                return {
                    id: key,
                    ...this.$store.state.users[key][0]
                }
            })
        },
        login_validation() {
            if (this.login) {
                return false
            }
            return true
        },
        password_validation() {
            if (this.password) {
                return false
            }
            return true
        }
    },
    mounted() {
        this.$store.commit('getInfo');
        M.AutoInit()

    },
}
</script>

<style   scoped>

</style>
