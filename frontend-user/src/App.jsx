import { useEffect, useState } from "react"
import {createBrowserRouter, RouterProvider} from 'react-router'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from "./pages/Profile"
import Home from "./pages/Home"


function App() {
  return (
   <RouterProvider router={createBrowserRouter([{
      path:"/",
      element: <Home />
   },
   {
    path:"login",
    element: <LogIn />
   },
   {
    path: "signup",
    element: <SignUp />
   },
   {
    path: "profile",
    element: <Profile />
   }
  ])}/>

   
  )
}

export default App
