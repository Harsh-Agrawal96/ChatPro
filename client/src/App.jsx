
import React,{lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import NotFound from './pages/NotFound.jsx'
import { LayoutLoader } from './components/layout/Loaders.jsx'

const Home = lazy( () => import('./pages/Home.jsx') )
const Login = lazy( () => import('./pages/Login.jsx') )
const Groups = lazy( () => import('./pages/Groups.jsx') )
const Chat = lazy( () => import('./pages/Chat.jsx') )

let user = true;


const App = () => {

  return (
    
    <BrowserRouter>
      <Suspense fallback={ <LayoutLoader /> } >
        <Routes>

          <Route element={< ProtectRoute user={user} />} >
            <Route path='/' element={<Home />} />
            <Route path='/groups' element={<Groups />} />
            <Route path='/chat/:chatId' element={<Chat />} />
          </Route>

          <Route 
            path='/login' 
            element={<ProtectRoute user={!user} redirect='/' >
              <Login />
            </ProtectRoute>} 
          />

          <Route path='*' element={<NotFound />} />
 
        </Routes>
      </Suspense>
    </BrowserRouter>
  )

}

export default App;
