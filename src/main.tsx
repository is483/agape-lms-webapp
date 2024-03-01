import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import App from './app'
import './index.css'
import store from './app/store'
import theme from './theme'
import 'material-symbols/outlined.css'
import 'react-quill/dist/quill.snow.css'
import '../styles/custom-quill-style.css'

export const router = createBrowserRouter([
  // match everything with "*"
  // keep routing within App
  { path: '*', element: <App /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
)
