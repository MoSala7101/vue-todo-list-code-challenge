export default {
    namespaced: true,
    state: {
        /* this todos will be loaded from the localStorage 
        after trigging 'loadStoredTodos' action  */
        todos: []
    },
    getters: {
        /* this function is to get all stored todos count */
        getTodosCount: (state) => {
            return state.todos.length
        },
        /* this function is to get the count of completed todos only */
        getCompletedTodosCount: (state) => {
            let completedTodos = state.todos.filter(todo => todo.isCompleted == true)
            return completedTodos.length || 0
        }
    },
    mutations: {
        /* get all stored todos and add it to the state todos array  */
        LOAD_STORED_TODOS: (state) => {
            /* get stored todos from local storage or 
            create an empty array to be the state todos*/
            let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            /* update the state todos array */
            state.todos = storedTodos;
        },
        /* add a new todo to the stored todos 
        then update the state todos array   */
        ADD_NEW_TODO: (state, todoTitle) => {
            /* get stored todos from local storage or assign it to an empty array */
            let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            /* push the new todo to the storedTodos  */
            storedTodos.push({
                    title: todoTitle,
                    isCompleted: false
                })
                /* update localStorage todos variable to equal the updated todo list   */
            localStorage.setItem("todos", JSON.stringify(storedTodos))
                /* update the state todos array */
            state.todos = storedTodos;
        },
        /* complete the targeted specific todo */
        COMPLETE_TODO: (state, todoIndex) => {
            /* get all saved todos from the local storage */
            let storedTodos = JSON.parse(localStorage.getItem("todos"));
            /* complete the targeted task */
            storedTodos[todoIndex].isCompleted = true;
            /* update localStorage todos variable to equal the updated todo list   */
            localStorage.setItem("todos", JSON.stringify(storedTodos))
                /* update the state todos array */
            state.todos = storedTodos;
        },
        /* uncomplete the targeted specific todo */
        UNCOMPLETE_TODO: (state, todoIndex) => {
            /* get all saved todos from the local storage */
            let storedTodos = JSON.parse(localStorage.getItem("todos"));
            /* uncomplete the targeted task */
            storedTodos[todoIndex].isCompleted = false;
            /* update localStorage todos variable to equal the updated todo list   */
            localStorage.setItem("todos", JSON.stringify(storedTodos))
                /* update the state todos array */
            state.todos = storedTodos;
        },
        /* delete the targeted specific todo */
        DELETE_TODO: (state, todoIndex) => {
            /* get all saved todos from the local storage */
            let storedTodos = JSON.parse(localStorage.getItem("todos"));
            /* remove the targeted task from the array*/
            storedTodos.splice(todoIndex, 1)
                /* update localStorage todos variable to equal the updated todo list   */
            localStorage.setItem("todos", JSON.stringify(storedTodos))
                /* update the state todos */
            state.todos = storedTodos;
        },
        /* clear the completed todos */
        CLEAR_COMPLETED: (state) => {
            /* get all saved todos from the local storage */
            let storedTodos = JSON.parse(localStorage.getItem("todos"));
            /* get the uncompleted todos */
            const uncompletedTodos = storedTodos.filter(todo => todo.isCompleted == false)
                /* update localStorage todos variable to equal the updated todo list   */
            localStorage.setItem("todos", JSON.stringify(uncompletedTodos))
                /* update the state todos */
            state.todos = uncompletedTodos;
        }
    },
    actions: {
        loadStoredTodos: (context) => {
            context.commit('LOAD_STORED_TODOS')
        },
        addNewTodo: (context, todoTitle) => {
            context.commit('ADD_NEW_TODO', todoTitle)
        },
        completeTodo: (context, todoIndex) => {
            context.commit('COMPLETE_TODO', todoIndex)
        },
        uncompleteTodo: (context, todoIndex) => {
            context.commit('UNCOMPLETE_TODO', todoIndex)
        },
        deleteTodo: (context, todoIndex) => {
            context.commit('DELETE_TODO', todoIndex)
        },
        clearCompleted: (context) => {
            context.commit('CLEAR_COMPLETED')
        }
    },
}