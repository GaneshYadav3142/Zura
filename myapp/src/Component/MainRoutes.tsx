import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import { Homepage } from '../Pages/Homepage'
import { Favourite } from '../Pages/Favourite'
export const MainRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/"  element={<Homepage/>}/>
        <Route path="/favourite"  element={<Favourite/>}/>
        </Routes>
    </div>
  )
}
