
import React,{lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from './components/auth/ProtectRoute.jsx'
import NotFound from './pages/NotFound.jsx'
import { LayoutLoader } from './components/layout/Loaders.jsx'

const Home = lazy( () => import('./pages/Home.jsx') )
const Login = lazy( () => import('./pages/Login.jsx') )
const Groups = lazy( () => import('./pages/Groups.jsx') )
const Chat = lazy( () => import('./pages/Chat.jsx') )

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessagesManagement = lazy(() =>
  import("./pages/admin/MessageManagement")
);

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

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessagesManagement />} />

          <Route path='*' element={<NotFound />} />
 
        </Routes>
      </Suspense>
    </BrowserRouter>
  )

}

export default App;
