import React, { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
}

const TaskInput = (props: TaskInputProps) => {
  const { addTodo, currentTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(name)
    setName('')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
          placeholder='Caption goes here'
        />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}

export default TaskInput
