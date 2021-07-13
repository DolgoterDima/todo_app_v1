<template>
    <div>

<h1>Profile</h1>
 
     <ul class="collection with-header" v v-for="user_item in $store.state.currentUser" :key="user_item.id">
        <li class="collection-header"><h4>{{user_item.user_login ?  user_item.user_login : user_item.user_name   }} </h4></li>
     
        <li class="collection-item">Your id: {{user_item.id}}</li>
        <li class="collection-item">Your name: {{user_item.user_name}}</li>
        <li class="collection-item">Your pass: {{user_item.user_password}}</li>    
        <li class="collection-item">Your email: {{user_item.user_email}}</li>
        <li class="collection-item">Your avatar: <img :src="user_item.user_avatar" alt="avatar" width="100"></li>
       
 
      </ul>
 
     </div> 
</template>

<script>
    export default {
        data() {
            return {
                user:null,
                another:null
            }
        },
     
        mounted() {
             this.$store.commit('getInfo')
                
        },
    }
</script>

<style lang="scss" scoped>

</style>