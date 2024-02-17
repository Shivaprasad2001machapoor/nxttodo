import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    newTodoInput: '',
    editingTodoId: null,
  }

  addTodo = () => {
    this.setState(prevState => {
      const {newTodoInput} = prevState
      let [title, count] = newTodoInput.split(/ (\d+)$/)

      title = title.trim()
      count = parseInt(count, 10) || 1

      if (title === '') {
        alert('Please enter a valid title for the new todo.')
        return null
      }

      const newTodos = Array.from({length: count}, (_, index) => ({
        id: prevState.todosList.length + index + 1,
        title,
      }))

      return {
        todosList: [...prevState.todosList, ...newTodos],
        newTodoInput: '',
      }
    })
  }

  editTodo = id => {
    this.setState({
      editingTodoId: id,
    })
  }

  saveTodo = (id, updatedTitle) => {
    this.setState(prevState => {
      const updatedTodosList = prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: updatedTitle} : todo,
      )

      return {
        todosList: updatedTodosList,
        editingTodoId: null,
      }
    })
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  handleCheckboxChange = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  handleInputChange = event => {
    this.setState({
      newTodoInput: event.target.value,
    })
  }

  render() {
    const {todosList, newTodoInput, editingTodoId} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              placeholder="New Todo"
              value={newTodoInput}
              onChange={this.handleInputChange}
            />
            <button type="button" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
                saveTodo={this.saveTodo}
                isEditing={editingTodoId === eachTodo.id}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos

/*
class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: updatedTodosList,
    })
  }

  render() {
    const {todosList} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
*/
