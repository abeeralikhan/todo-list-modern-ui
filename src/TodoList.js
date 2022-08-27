import { Component } from 'react';
import { v4 as uuid } from 'uuid';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

class TodoList extends Component {
    constructor(props) {
        super(props);
        // todos: an array of todo objects
        this.state = { todos: [] };

        // function bindings
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    /** adds a new todo object in the existing array of todos */
    addTodo(todo) {
        // id: to identify each todo uniquely
        // isEditing: shows the editing state of the task
        // isDone: shows the completion state of the task
        const newTodo = { ...todo, taskName: todo.taskName.trim(), id: uuid(), isEditing: false, isDone: false};

        // replacing the existing todo array with the updated one
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    /** removes an existing todo from the todos array */
    removeTodo(id) {
        // creating a new array of todo by filtering out the to be removed one
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id);

        // replacing the existing array with the updated one
        this.setState({ todos: updatedTodos });
    }

    /** toggles the passed property of the todo to be either true or false */
    // propertyName: the name of the property to change
    // newEditState: the new state of the intended property to change to
    toggleProperty(id, propertyName='isEditing', newEditState=true) {
        // creating a copy of the exisitng todos array
        const updatedTodos = this.state.todos;

        // looping through the todos array
        for( let todo of updatedTodos) {
            if ( todo.id === id ) {
                todo[propertyName] = newEditState;
            }
        }

        this.setState({ todos: updatedTodos });
    }

    /** updates the taskName of an exisitng todo in the todo array using its id */
    updateTodo(id, newTaskName) {
        // creating a copy of the exisitng todos array
        const updatedTodos = this.state.todos;

        // looping through the todos array
        for( let todo of updatedTodos) {
            if ( todo.id === id ) {
                todo.taskName = newTaskName;
                break;
            }
        }

        // setting the isEditing state of the todo back to false
        this.toggleProperty(id, 'isEditing', false);

        this.setState({ todos: updatedTodos });
    }

    /** toggles the isDone property of the task */
    toggleComplete(id) {
        let currentDoneState = this.state.todos.find(t => t.id === id).isDone;

        // passing the isDone property with an updated state to the toggleProperty()
        this.toggleProperty(id, 'isDone', !currentDoneState);
    }

    /** returns an array of Todo components generated from the todos array */
    generateTodos() {
        return this.state.todos.map(todo => {
            let id = todo.id;
            return <Todo key={ id } id={ id } taskName={ todo.taskName } isEditing={ todo.isEditing } removeTodoFn={ this.removeTodo } togglePropertyFn={ this.toggleProperty } updateTodoFn={ this.updateTodo } toggleCompleteFn={ this.toggleComplete } isDone={ todo.isDone }/>;
        });
    }

    render() {
        return (
            <div className='TodoList'>
                <h1>Todo List</h1>
                <NewTodoForm addTodoFn = { this.addTodo }/>
                { this.generateTodos() }
            </div>
        );
    }
}

export default TodoList;