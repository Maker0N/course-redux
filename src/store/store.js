/* eslint-disable no-underscore-dangle */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import taskReducer from './task'
import logger from './middleware/logger'
import errorReducer from './errors'

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
})

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middlewarw: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createStore
