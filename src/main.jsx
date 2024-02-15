import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import AllPosts from './pages/AllPosts.jsx'
import { AuthLayout, Login } from './components/index.js'

let router = createBrowserRouter([
  
  {
    path:'/',
    element: <Home/>,
    children:[
      {
        path: "/posts",
        element: <Home/>
      },
    ]
  },
  {
    path: "/login",
    element: (
    <AuthLayout authentication= {false}> 
    <Login />
    </AuthLayout>
    )
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication= {false}> 
            <Signup />
       </AuthLayout>
    ),
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
   <RouterProvider router={ router}/>
  </Provider>

)
