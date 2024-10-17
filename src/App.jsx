import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup'
import Login from './pages/Login'
import Layout from './Layout'
import RequireAuth from './components/requireAuth'
import {  WebToonDetails } from './pages/CompareToons' 
import { Home } from './pages/Home'
import {FavoriteWebToons} from "./pages/Favourites"

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/webtoon_details/:id' element={<WebToonDetails />} />
            <Route element={<RequireAuth />}>
              {/* <Route path='/compare' element={<WebToonCompare />} /> */}
              <Route path='/user/favourites' element={<FavoriteWebToons />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
