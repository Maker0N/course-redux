/* eslint-disable no-case-declarations */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  completeTask, titleChange, taskDel, loadTasks, getTasks, getTasksLoadingStatus, createTask,
} from '../store/task'
import configureStore from '../store/store'
import { getError } from '../store/errors'

export const store = configureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const addTask = () => {
    dispatch(createTask({
      userId: 1,
      title: 'xxx',
      completed: false,
    }))
  }

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDel(taskId))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <div>
        <h1>Redux</h1>
        <button
          type="button"
          onClick={addTask}
        >
          Create Task
        </button>
      </div>
      <ul>
        {state.map((it) => (
          <li key={it.id}>
            <p>{it.title}</p>
            <p>{`Completed: ${it.completed}`}</p>
            <button
              type="button"
              onClick={() => dispatch(completeTask(it.id))}
            >
              Compete
            </button>
            <button
              type="button"
              onClick={() => changeTitle(it.id)}
            >
              Change title
            </button>
            <button
              type="button"
              onClick={() => deleteTask(it.id)}
            >
              X
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
