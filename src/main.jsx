import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
import { AuthLayout, Login } from './components/index.js'
import Profile from './pages/Profile.jsx'

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
    path: "/add-posts",
    element:(
      <AuthLayout authentication>
        <AddPost/>
      </AuthLayout>
    )
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
{
  path: "/post/:slug",
  element:(
      <Post/>
  ),
},
{
  path: "/edit-post/:slug",
  element: (
      <AuthLayout authentication>
          <EditPost />
      </AuthLayout>
  ),
},
{
  path: "/profile/:user",
  element: (
      <AuthLayout authentication>
         <Profile/>
      </AuthLayout>
  ),
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
   <RouterProvider router={ router}/>
  </Provider>

)
