import React, { useState } from 'react'
import styles from './taskList.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
}

const TaskList = (props: TaskListProps) => {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo } = props

  const onChangeCheckBox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, event.target.checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}> {doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo: Todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              onChange={onChangeCheckBox(todo.id)}
              checked={todo.done}
              className={styles.taskCheckbox}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                🖊️
              </button>
              <button className={styles.taskBtn}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
