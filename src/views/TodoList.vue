<template>
<div>
    <div class="container">
        <div class="row">
        <h1>Add todo</h1>
    </div>
        <form action="" class="row" @submit.prevent="is_formValid">
            <div class="input-field col s12 l5">
                <input id="title_todo" type="text" v-model="title_todo" class="validate">
                <label for="title_todo">Title</label>
                 
            </div>
            <div class="input-field col s12 l5">
                <input id="description_todo" type="text" v-model="description_todo" class="validate">
                <label for="description_todo">Description</label>
            </div>

            <div class="input-field col s12 l2">
                <select v-model="status_todo" id="status_todo">
                    <option v-for="status in statuses_arr" :key="status" :value="status">{{status}}</option>
                </select>
                <label>Status</label>
            </div>
            <button @click="addTodo()" class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="fas fa-paper-plane"></i> 
            </button>
        </form>

        <div class="row todo">
            <h3 class="todo_ul   pinned_list_heading " v-if="pinned_list.length">
                Favorites list <i class="fas fa-star"></i>
            </h3>
            <ul class="todo_ul collapsible  pinned_list " v-if="pinned_list.length">
                <TodoListItem :pinned="true" @unPinElement="unPinElement" :statuses="statuses_arr" v-for="(todo, index) in pinned_list" :key="index" :todo_item_arr="todo" :index="index"></TodoListItem>

            </ul> 


              <h3 class="todo_ul   pinned_list_heading " v-if="pinned_list.length">
               Todo list
            </h3>
           <ul class="todo_ul collapsible  " v-if="check_user.length">
                <TodoListItem @pinElement="pinThisList" :statuses="statuses_arr" v-for="(todo, index) in $store.state.currentUser[0].ueser_todo" :key="todo.id" :todo_item_arr="todo" :index="index"></TodoListItem>
            </ul> 

<!-- 
<div class="todo_is_empty "  v-else-if='$store.state.currentUser[0].ueser_todo.length'>
  todo is empty
  </div>  -->
  

  <div class="todo_is_empty "  v-else>
  todo is empty
  </div> 
<!-- <div class="progress"  v-else>
      <div class="indeterminate"></div>
  </div>  -->

 
   <!-- Modal Trigger -->
  <a class="waves-effect waves-light btn red modal-trigger" href="#modal1">Delete todos? <i class="fas fa-trash-alt"></i></a>

  <!-- Modal Structure -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Delete all todos?</h4>
      <p>
          <a class="modal-close btn-small waves-effect waves-red  waves-effect waves-light green white-text">No</a>
             <button type="button" class="modal-close   btn-small waves-effect waves-light red" @click="delete_all_todos">Delete all todos <i class="fas fa-trash-alt"></i></button>
      </p>
     </div>
    <div class="modal-footer">
     </div>
  </div>
        



        </div>
    </div>

</div>
</template>

<script>
import M from 'materialize-css'

import TodoListItem from "../components/TodoListItem.vue"
export default {
    data() {
        return {
            pinned_list: [],
check_user: this.$store.state.currentUser[0].ueser_todo ||=[],
            callLoading: false,
            is_formValid: false,
            title_todo: null,
            description_todo: null,
            status_todo: "pending",
            currrentUserId: null,
            delete_modal: null,
            error: {
                title: {

                }
            },
            statuses_arr: ["pending", "done", "failed"]
        }
    },
    methods: {
        delete_all_todos(){
            console.log( this.$store.state.currentUser[0].ueser_todo )
            this.$store.state.currentUser[0].ueser_todo=null 
            this.$store.dispatch("updateTodoItem")

        },
        unPinElement(value) {
            this.pinned_list.splice(value, 1);

        },
        pinThisList(value) {

            this.pinned_list.push(this.$store.state.currentUser[0].ueser_todo[value])
        },

        addTodo() {
            if (this.title_todo) {
                this.$store.state.currentUser[0].ueser_todo ||=[]

                this.$store.state.currentUser[0].ueser_todo.push({
                    id: this.$store.state.currentUser[0].ueser_todo.length + 1,
                    title: this.title_todo,
                    description: this.description_todo,
                    status: this.status_todo,
                    is_deleted: false
                })
                this.currrentUserId = this.$store.state.currentUser

                this.$store.commit('putInfo', this.$store.state.currentUser);
                this.title_todo = ""
                this.description_todo = ""
            } else {
                console.log("no dataw")
            }

            //this.$store.commit('getInfo');
        }, 
        toggleDescription(event) {
            let button = event.target;
            button.closest(".todo_li").querySelector(".todo_description").classList.toggle('is_open')
        },
        // removeTodo(index) {
        //     this.$store.commit({
        //         type: 'deleteInfo',
        //         idx: index
        //     })

        //     //this.$store.state.todos.splice(index, 1)   
        //     //this.$store.commit('putInfo');

        //     // this.$store.commit('getInfo');
        // }
        // updateInfo() {
        //     this.$store.commit('putInfo', 4);

        // },
        // getInfo() {

        //     this.$store.commit('getInfo');

        // }

    },
    mounted() {
           M.AutoInit()
 
  
        // this.$store.dispatch('getCurrentUserData', {
        //    id: this.$store.state.currentUser
        //     });

    },
    components: {
        TodoListItem,
    },
    computed: { 
//         check_user() {
 
//              if(this.$store.state.currentUser){
//  return this.$store.state.currentUser[0].ueser_todo.length
//              }
//             return  false
//         }
        // check_done_state(){
        //   return  this.$store.state.todos.length 
        // },

    },
    provide() {
        return {
            statuses_arr: this.statuses_arr,
        }
    },

}
</script>

<style scoped>
.todo_is_empty{
    padding: 50px;
    font-size: 20px;
}
 </style>
