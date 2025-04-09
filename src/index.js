import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" richColors/>
  </Provider>,
)
