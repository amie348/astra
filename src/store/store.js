import { createStore, compose, applyMiddleware } from 'redux'

import logger from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './root-reducer'

const middleWares = [logger]
const composedEnhancers = compose(applyMiddleware(...middleWares))

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistedStore = persistStore(store)

// export const store = createStore(rootReducer, undefined, composedEnhancers)