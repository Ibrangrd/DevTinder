import React from 'react'
import Body from './components/Body'
import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Request from './components/Request'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
const App = () => {
  return (
    <div>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path='/' element={<Body/>}>
      <Route path='/feed' element={<Feed/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/connections' element={<Connections/>}/>
      <Route path='/request' element={<Request/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </div>
  )
}

export default App
