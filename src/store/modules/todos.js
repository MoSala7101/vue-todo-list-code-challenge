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
        },
        /* search for typed text in the current todos */
        SEARCH_FOR_TODO: (state, text) => {
            /* convert all todos text to lower case to search effectivly */
            let theText = text.toLowerCase();
            /* get all of stored todos title to search in with the text */
            let todosTitles = state.todos.map(todo => todo.title.toLowerCase())
                /* to store the indexes of the todos that contain the text */
            let targetTodosIndexes = [];
            /* to store the todos items that have the targetTodosIndexes */
            let foundTodos = [];
            /* loop through the todos titles to find the item that contains the typed text */
            todosTitles.map(title => {
                    /* check if title contains the typed text */
                    if (title.includes(theText)) {
                        /* push the index of the current title that contains the typed word */
                        targetTodosIndexes.push({ index: todosTitles.indexOf(title) })
                    }
                })
                /* loop through the collected indexes to push the todo items into foundTodos array  */
            targetTodosIndexes.forEach(currentIndex => {

                    foundTodos.push(state.todos[currentIndex.index])
                })
                /* update state todos */
            state.todos = foundTodos
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
        },
        searchForTodo(context, text) {
            /* check the length of the typed word */
            if (text.length == 0) {
                /* load all of the stored todos */
                context.commit('LOAD_STORED_TODOS')
            } else {
                /* search for the typed word */
                context.commit('SEARCH_FOR_TODO', text)
            }
        },
    },
}