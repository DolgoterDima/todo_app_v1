<template>
<li class="todo_li  " :class="{ animate__hinge: delete_li_class, heightAnimation: delete_li_class }">
    <div v-if="is_editing" :class="{'is_editing': is_editing}">
        <div class="row">

            <h6 class="col s12 ">
                Editing mode
            </h6>
            <div class="input-field col s12 ">
                <input type="text" v-model="new_title" :id="'edited_title_' + index" /><label class="active" :for="'edited_title_' + index">new title</label>
            </div>
            <div class="input-field col s12">
                <input type="text" v-model="new_description" :id="'edited_description_' + index" /><label class="active" :for="'edited_description_' + index">new description</label>
            </div>
            <div class="input-field col s12">
                <select type="text" v-model="new_status" :id="'status_todo' + index">
                    <option v-for="status in statuses_arr" :key="status" :value="status">
                        {{ status }}
                    </option>
                </select>
                <label>Status</label>
            </div>
        </div>

        <button class="waves-effect waves-light btn-small" @click="updateTodoItem(index)">
            <i class="fas fa-save"></i>
        </button>
        <button class="waves-effect waves-light btn-small" @click="is_editing = !is_editing">
            <i class="far fa-times-circle"></i>
        </button>
    </div>

    <div class="todo_header collapsible-header" @click="open_description=!open_description" :class="{ todo_done: checked_status, todo_done: todo_item_arr.status=='done' }" v-if="!is_editing">
        <div class="todo_meta">
            <span class="todo_number"> {{ index + 1 }} </span>
            <span class="todo_checkbox">
                <label> <input type="checkbox" @change.stop='update_status(index)' v-model="checkbox_done" /> <span></span></label>
            </span>

        </div>

        <span class="todo_title">{{ todo_item_arr.title }}</span>
        <span class="todo_btns">
            <span class="todo_status tooltipped" :style="statusClass" data-position="left" :data-tooltip="todo_item_arr.status"></span>
            <a v-if="todo_item_arr.description" class="todo_arrow" :class="{'rotateble':open_description}"><i class="fas fa-chevron-down"></i></a>
            <button class='dropdown-trigger  ' @click.stop=""   :data-target='"dropdown_"+index'><i class="fas fa-ellipsis-v"></i></button>
            <ul :id='"dropdown_"+index' class='dropdown-content'>
                <li> <button class="waves-effect  btn" @click="edtitElement"> <i class="fas fa-pencil-alt"></i> </button> </li>
                <li v-if="!pinned"> <button class="waves-effect  btn" @click.stop="$emit('pinElement', index)"> <i class="far fa-star"></i> </button> </li>
                <li v-if="pinned"> <button class="waves-effect  btn" @click.stop="$emit('unPinElement', index)"> <i class="fas fa-star"></i> </button> </li>
                <li class="divider" tabindex="-1"></li>
                <li><button class="waves-effect  btn" @click.stop="removeTodo(index)"> <i class="far fa-trash-alt"></i> </button></li>
            </ul>

        </span>
    </div>
    <div v-if="!is_editing" class="todo_description " :class="{ 'is_open': open_description, 'collapsible-body': todo_item_arr.description }">
        {{ todo_item_arr.description == null ? "" : todo_item_arr.description }}
    </div>
</li>
</template>

<script>
import M from "materialize-css";

export default {
    props: ["todo_item_arr", "index", "statuses", "pinned"],
    emits: ["toggleItemDescription", "pinElement", "unPinElement"],
    inject: ["statuses_arr"],

    data() {
        return {
            is_editing: false,
            callLoading: false,
            is_formValid: false,
            title_todo: null,
            status_todo: "pending",
            description_todo: null,
            open_description: false,
            checkbox_done: this.todo_item_arr.status=="done" ? true : false,

            delete_li_class: false,

            new_title: this.todo_item_arr.title,
            new_description: this.todo_item_arr.description,
            new_status: this.todo_item_arr.status,
        };
    },
    methods: {
        update_status(index) {
             this.$store.state.currentUser[0].ueser_todo[index].status = this.new_status
 
            this.$store.dispatch("updateTodoItem")
        },
        edtitElement() {
            this.is_editing = !this.is_editing;
            setTimeout(() => {
                M.AutoInit();
            }, 50);
            console.log("ssssss");
        },
        updateTodoItem(index) {
            this.$store.state.currentUser[0].ueser_todo[index] = {
                id: this.todo_item_arr.id,
                title: this.new_title,
                description: this.new_description,
                status: this.new_status,
                is_deleted: false,
            };
            this.is_editing = !this.is_editing;
            this.$store.dispatch("updateTodoItem");
        },
        toggleDescription() {
            this.open_description = !this.open_description;
            // button.closest(".todo_li").querySelector(".todo_description").classList.toggle('is_open')
        },
        removeTodo(index) {
            this.delete_li_class = !this.delete_li_class;
            setTimeout(() => {
                this.$store.dispatch({
                    type: "deleteTodoItem",
                    idx: index,
                });
            }, 1000);

            //this.$store.state.todos.splice(index, 1)
            //this.$store.commit('putInfo');

            // this.$store.commit('getInfo');
        },
        // updateInfo() {
        //     this.$store.commit('putInfo', 4);

        // },
        // getInfo() {

        //     this.$store.commit('getInfo');

        // }
    },
    watch: {
        checkbox_done(val) {
            if (val) {
                this.new_status = "done"
            } else {
                this.new_status = "pending"
            }

        }
    },
    mounted() {
        M.AutoInit();
    },
    computed: {
        head_clcik() {
            return this.$refs.list_header.preventDefault();

        },
        checked_status() {
            return this.checkbox_done;
        },
        statusClass() {
            switch (this.new_status) {
                case "pending":
                    return "background-image:linear-gradient(90deg, rgba(255,255,255,1) 0%, #bdbdbd 19%, #bdbdbd 100%);";
                    //return "#bdbdbd";

                case "failed":
                    return "background-image:linear-gradient(90deg, rgba(255,255,255,1) 0%, #f44336 19%, #f44336 100%);";

                case "done":
                    return "background-image:linear-gradient(90deg, rgba(255,255,255,1) 0%, #4caf50 19%, #4caf50 100%);";

                default:
                    return "background-image:linear-gradient(90deg, rgba(255,255,255,1) 0%, #212121 19%, #212121 100%);";
            }
        },
    },
};
</script>

<style scoped>
.is_editing button {
    margin: 0 5px;
}

.is_editing {
    padding-bottom: 30px;
    border: 2px solid #37474f;
}

.todo_number {
    width: 25px;
    height: 100%;

}

.dropdown-content li {
    display: flex;
    align-items: center;
    justify-content: center;
}

span.todo_checkbox span {
    position: relative;
    top: 3px;
}

.todo_ul i {
    margin-right: 0;
    font-size: 14px;
}

.todo_arrow i {
    transition: all .3s;
    transform: rotate(0deg);
}

.todo_arrow.rotateble i {
    transform: rotate(180deg);
    transition: all .3s;
}

@keyframes heightAnim {
    0% {
        max-height: 300px;
        opacity: 1;
        transition: all 0.3s;
    }

    100% {
        max-height: 0px;
        opacity: 0;
        transition: all 0.3s;
    }
}

.heightAnimation {
    animation: heightAnim 0.5s forwards;
}

.todo_header {
    transition: all .3s;
    position: relative;
}

.todo_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.todo_status {
    position: absolute;
    height: 100%;
    width: 10px;
    right: 0;
    top: 0;
}

@keyframes overline {
    from {
        width: 0%
    }

    to {
        width: 100%
    }

}

.dropdown-trigger{
    border: none;
    background-color: transparent;
}

.todo_done {
    transition: all .3s;
    box-shadow: 2px 2px 2px inset #5e5656;
    background-color: #9e9e9ea6;
    position: relative;

}

.todo_meta {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>
