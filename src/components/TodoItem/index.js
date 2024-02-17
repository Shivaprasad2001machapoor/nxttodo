// TodoItem.js
import {useState, useEffect} from 'react'
import './index.css'

const TodoItem = props => {
  const {
    todoDetails,
    deleteTodo,
    editTodo,
    saveTodo,
    isEditing,
    handleCheckboxChange,
  } = props
  const {id, title, completed} = todoDetails
  const [editedTitle, setEditedTitle] = useState(title)

  useEffect(() => {
    setEditedTitle(title)
  }, [title, isEditing])

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onEditTodo = () => {
    editTodo(id)
  }

  const onSaveTodo = () => {
    saveTodo(id, editedTitle)
    // You can reset isEditing if needed: editTodo(null);
  }

  const onCheckboxChange = () => {
    handleCheckboxChange(id)
  }

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <button type="button" className="save-btn" onClick={onSaveTodo}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="title">{title}</p>
          <div className="actions">
            <input
              type="checkbox"
              checked={completed}
              onChange={onCheckboxChange}
            />
            {!isEditing && (
              <>
                <button type="button" className="edit-btn" onClick={onEditTodo}>
                  Edit
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={onDeleteTodo}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

export default TodoItem

/*
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, title} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <p className="title">{title}</p>
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
*/
