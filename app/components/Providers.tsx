"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'



interface Types {
    children: React.ReactNode,
}

const Providers = ({ children }: Types) => {
    const persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            <div>{children}</div>
            </PersistGate>
        </Provider>
    )
}

export default Providers