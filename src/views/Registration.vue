<template>
<div>
    <div class="row">
        <h1>Registration</h1>
    </div>

    <form action="" class="row" @submit.prevent="">

        <div class="input-field col l3 s12">
            <i class="fas fa-user-astronaut prefix"></i>
            <input id="user_login" type="text" v-model="user_login" @input="form_validation" :class="{'validate':!errors.user_login, 'invalid':errors.user_login}">
            <label for="user_login">Login</label>
            <span class="helper-text" data-success="good" :data-error="errors.user_login" v-if="errors.user_login">{{errors.user_login}}</span>
        </div>

        <div class="input-field col l3 s12">
            <i class="fas fa-unlock-alt  prefix"></i>
            <input id="user_password" type="password" autocomplete v-model="user_password" @input="form_validation" :class="{'validate':!errors.user_password, 'invalid':errors.user_password}">
            <label for="user_password">Password</label>
            <span class="helper-text" data-success="good" :data-error="errors.user_password" v-if="errors.user_password">{{errors.user_password}}</span>
        </div>

        <div class="input-field col l3 s12">
            <i class="far fa-user    prefix"></i>
            <input id="user_name" type="text" v-model="user_name" @input="form_validation" :class="{'validate':!errors.user_name, 'invalid':errors.user_name}">
            <label for="user_name">Name</label>
            <span class="helper-text" data-success="good" :data-error="errors.user_name" v-if="errors.user_name">{{errors.user_name}}</span>
        </div>

        <div class="input-field col l3 s12">
            <i class="far fa-envelope prefix"></i>
            <input id="user_email" type="text" autocomplete v-model="user_email" @input="form_validation" :class="{'validate':!errors.user_email, 'invalid':errors.user_email}">
            <label for="user_email">Email</label>
            <span class="helper-text" data-success="good" :data-error="errors.user_email" v-if="errors.user_email">{{errors.user_email}}</span>
        </div>

        <div class="row tabs_section">
            <div class="col center-alig  s12 l8 offset-l2">
                <ul class="tabs ">
                    <li class="tab col s12  l6"><a class="active" href="#test1">Paste image url...</a></li>
                    <li class="tab col s12  l6"><a href="#test2">... or select your avatar</a></li>

                </ul>
            </div>
            <div id="test1" class="col s12 m6 offset-m3 tabs_content">
                <div class="input-field col s12">
                    <i class="fas fa-portrait prefix"></i>
                    <input id="user_avatar" type="url" v-model="user_avatar" @input="form_validation" :class="{'validate':!errors.user_avatar, 'invalid':errors.user_avatar}">
                    <label for="user_avatar" :class="{'active':avatar_label_class }">Avatar image url</label>
                    <span class="helper-text" data-success="good" :data-error="errors.user_avatar" v-if="errors.user_avatar">{{errors.user_avatar}}</span>
                </div>
            </div>
            <div id="test2" class="col s12 m6 offset-m3 tabs_content">
                <div class="input-field col   s12">
                    <i class="fas fa-portrait prefix"></i>

                    <select class="icons" @change="avatar_selected" v-model="user_avatar_select">
                        <option value="" disabled selected>Choose your simpsons avatar</option>
                        <option v-for="avatar_option in avatars_arr" :key="avatar_option.value" :value="avatar_option.image" :data-icon="avatar_option.image">{{avatar_option.value}}</option>
                    </select>

                    <label for="user_avatar">Images in select</label>

                </div>

            </div>

        </div>

        <button type="submit" :disabled="!allowSendBtn" @click="createUser" class="btn waves-effect waves-light" v-html='allowSendBtn ?  `Become a part of this cool thing <i class="fas fa-user-plus"></i>`: `fill this  form at first`'></button>
      
  
    </form>

</div>
</template>

<script>
import M from 'materialize-css'
export default {
    data() {
        return {
            user_login: null,
            user_password: null,
            user_name: null,
            user_email: null,

            user_avatar: null,

            errors: {
                user_login: null,
                user_password: null,
                user_name: null,
                user_email: null,

                user_avatar: null,
            },
             

            avatar_label_class: false,
            user: null,

            callLoading: false,
            is_registration_formValid: false,
            custom_avatar: false,
            title_todo: null,
            description_todo: null,
            status_todo: "pending",
            error: {
                title: {

                }
            },
            avatars_arr: [{
                    value: "Bart",
                    image: "https://i1.sndcdn.com/avatars-sqky2IbwKcB8cLrx-uftfPw-t500x500.jpg"
                },
                {
                    value: "Homer",
                    image: "https://avatarfiles.alphacoders.com/246/thumb-246531.jpg"
                },
                {
                    value: "Marge",
                    image: "https://pngimg.com/uploads/simpsons/simpsons_PNG91.png"
                },
                {
                    value: "Lisa",
                    image: "https://www.pngitem.com/pimgs/m/481-4813038_simpson-lisa-png-download-lisa-simpson-png-transparent.png"
                },
                {
                    value: "Maggie",
                    image: "https://pbs.twimg.com/profile_images/766239153428324352/Em50tbAE_400x400.jpg"
                },

            ]
        }
    },
    methods: {

        avatar_selected(){
           this.user_avatar=this.user_avatar_select
            this.errors.user_login = false
            this.avatar_label_class=true
           if (this.user_avatar !== null) {
                this.user_avatar_select=this.user_avatar
                if (this.user_avatar.match(/\w+\.(jpg|jpeg|gif|png|webp|tiff|bmp)$/gi)) {
                    this.errors.user_avatar = false
                } else {
                    console.log(typeof this.errors.user_avatar)
                    this.errors.user_avatar = "this is not image url! jpeg|jpg|gif|png|webp"
 
                }
                 
            }

        },
        form_validation() {

            if (this.user_login !== null) {
                if (this.user_login.length < 2) {
                    this.errors.user_login = "too short name"
                } else {
                    this.errors.user_login = false
                }

            }

            if (this.user_password !== null) {
                if (this.user_password.length < 5) {
                    this.errors.user_password = "too short pass. You need at least 5 chars"
                } else {
                    this.errors.user_password = false

                }

            }

            if (this.user_name !== null) {
                if (this.user_name.length < 2) {
                    this.errors.user_name = "too short name"
                } else {
                    this.errors.user_name = false
                }
            }

            if (this.user_avatar !== null) {
                this.user_avatar_select=this.user_avatar
                if (this.user_avatar.match(/\w+\.(jpg|jpeg|gif|png|webp|tiff|bmp)$/gi)) {
                    this.errors.user_avatar = false
                } else {
                    console.log(typeof this.errors.user_avatar)
                    this.errors.user_avatar = "this is not image url! jpeg|jpg|gif|png|webp"
 
                }
                 
            }

            let is_email_valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.user_email);
            console.log(is_email_valid)
            if (this.user_email !== null) {
                if (!is_email_valid) {
                    this.errors.user_email = "wrong email form"

                } else {
                    this.errors.user_email = false
                }
            }


        },
        createUser() {
            this.$store.state.users ||=[]
            this.user = Object.keys(this.$store.state.users).map((key) => {return {id: key,...this.$store.state.users[key][0]}})
            .filter(item => item.user_login == this.user_login)
            if (this.user.length) {
                /* такой пользователь есть */
                M.toast({html: '<span>login already used</span> '});
            } else {
                
                if (this.allowSendBtn) {
                    this.$store.commit('createUser', [{
                        user_login: this.user_login,
                        user_password: this.user_password,
                        user_name: this.user_name,
                        user_email: this.user_email,
                        user_avatar: this.user_avatar,
                    }]);

                    this.$router.push('login')
                M.toast({html: `<span>Registration successfuly <br> Your login: ${this.user_login} <br>  Your password: ${this.user_password} <br> </span> `});
                } else {
                    M.toast({html: '<span>Error</span> '});

                }

            }

        },

    },
    computed: {
        allowSendBtn(){
            
            if (
                this.errors.user_login == false &&
                this.errors.user_password == false &&
                this.errors.user_name == false &&
                this.errors.user_email == false && 
                this.errors.user_avatar == false
            ) {
                return true

            }
            return false
        },
        user_login_validation() {
            if (this.user_login !== null && this.user_login.length < 2) {
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

<style scoped>
.tabs_content {
    margin-top: 30px;
}

.input-field .prefix {

    left: 15px;
}

/* width */
.tabs::-webkit-scrollbar {
    width: 10px;
    height: 5px;
}

/* Track */
.tabs::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.tabs::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
.tabs::-webkit-scrollbar-thumb:hover {
    background: #555;
}

@media screen and (max-width:600px) {
    ul.tabs {
        height: auto !important;
    }

    li.tab {
        margin-bottom: 10px;
        width: 100%;
    }

    .indicator {
        bottom: 10px !important;
        margin-bottom: 20px;
    }

}
</style>
