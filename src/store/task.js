/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit'
import todosService from '../service/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    create(state, action) {
      const id = state.entities[state.entities.length - 1].id + 1
      action.payload = { ...action.payload, id }
      state.entities = [...state.entities, action.payload]
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex((it) => it.id === action.payload.id)
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload }
    },
    remove(state, action) {
      state.entities = state.entities.filter((it) => it.id !== action.payload.id)
    },
    loadTasksRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const {
  recived, create, update, remove, taskRequestFailed, loadTasksRequested,
} = actions
const taskRequested = createAction('task/taskRequested')

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recived(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.post(task)
    dispatch(create(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }))
}

export const titleChange = (id) => (update({ id, title: `New title for ${id}` }))

export const taskDel = (id) => (remove({ id }))

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer
