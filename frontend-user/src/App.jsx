import {BrowserRouter, Routes, Route} from 'react-router'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import BlogPost from './pages/BlogPost'
import { ProtectedRoutes } from "./utils/ProtectedRoutes"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LogIn/>} path="/login"/>
        <Route element={<SignUp />} path="/signup"/>
        <Route element={<ProtectedRoutes/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<Profile />} path="/profile"/>
          <Route element={<BlogPost/>} path='/posts/:id'/>
        </Route>

        
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
