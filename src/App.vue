<template>

<div>
  <nav>
   
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo"> Todo</router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="fas fa-bars"></i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <!-- <li><router-link to="/about">About</router-link></li> -->
        <li  v-if="$store.state.currentUser"><router-link to="/todo">Todo</router-link></li>
        <li v-if="!$store.state.currentUser"><router-link to="/Registration">Registration</router-link></li>
        <li v-if="!$store.state.currentUser"><router-link to="/Login">Login</router-link></li>
        <li  class="user_avatar_li" v-if="$store.state.currentUser"><router-link to="/Profile"> Profile <img :src="$store.state.currentUser[0].user_avatar" :alt="$store.state.currentUser[0].user_name" class="user_avatar"> </router-link></li>
        <li  v-if="$store.state.currentUser"><a @click="logout">Log out</a></li> 
      </ul>
    </div>
  </nav> 
  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Home</router-link></li>
    <!-- <li><router-link to="/about">About</router-link></li> -->
    <li><router-link to="/todo">Todo</router-link></li>
    <li><router-link to="/Registration">Registration</router-link></li>
    <li><router-link to="/Login">Login</router-link></li>
    <li><router-link to="/Profile">Profile</router-link></li>
  </ul> 
 
 
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
        <component :is="Component" />
    </transition>
</router-view>
 
   </div>
 
</template>

<script>
import M from 'materialize-css'

//import axios from 'axios'
 export default {
    data() {
        return {
            varData: 2,
                show: true

            // is_formValid: false,
            // title_todo: null,
            // status_todo: "pending",
            // description_todo: null,
        }
    },
    methods: {
          logout(){
            this.$store.state.currentUser=null
            localStorage.removeItem("current_user")
            this.$router.push('/')
          }
        // addTodo() {
        //     this.$store.state.todos.push({
        //         id: this.$store.state.todos.length + 1,
        //         title: this.title_todo,
        //         description: this.description_todo,
        //         status: this.status_todo,
        //         is_deleted: false
        //     })
        //      this.$store.commit('putInfo');
        //      this.$store.commit('getInfo');
        // },
        // updateInfo() {
        //     this.$store.commit('putInfo', 4);

        // },
        // getInfo() {

        //     this.$store.commit('getInfo');

        // }
    },
    mounted() {
        // this.$store.commit('getInfo');
         M.AutoInit()
 
  
  
         /*check if user logged */
         if(localStorage.getItem("current_user")){
           
            this.$store.commit('getCurrentUserInfo', localStorage.getItem("current_user"))
        }
  

    },
        beforeMount() {
    


    },
    components:{
       
    }
}
</script>

<style>
 .user_avatar_li{
   position: relative;
   padding-right: 50px;
 }
 .user_avatar{
   top: 50%;
   transform: translateY(-50%);
   right: 0;
   width: 50px;
       position: absolute;
 }
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}


.fade-enter-active,
.fade-leave-active {
          animation: page_anim_to .5s forwards;

}

a.router-link-active.router-link-exact-active {
    color: #fff;
}
.home {
    text-align: left;
    padding: 5%;
}
.home ul li{
   list-style:auto !important;
}
.home ul  {
padding-left:40px !important;}
a.router-link-active.router-link-exact-active.brand-logo {
    background-color: transparent;
}
.fade-enter-from,
.fade-leave-to {
     animation: page_anim_from .5s forwards;
    
}
@keyframes page_anim_to{
     100% { opacity: 1; }

}
@keyframes page_anim_from {
     100% {  opacity: 0; }
}
.router-link-active{
  background-color: brown;
}
</style>
