import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'

import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "@reduxjs/toolkit"


import todosReducer from './slices/todoSlice'


export interface persistConfigType {
  key: string
  storage: typeof storage
  version: number
  whitelist: string[]
}


const persistConfig:persistConfigType  = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["todos"],
}

const reducer = combineReducers({
    todos: todosReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();

export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector


export type Store = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispatch = typeof store.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>