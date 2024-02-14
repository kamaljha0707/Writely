import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

let router = createBrowserRouter([
  
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path: "/posts",
        element: <App/>
        ,
    },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
   <RouterProvider router={ router}/>
  </Provider>

)
