//Imports
import { Route, Routes, Navigate, HashRouter } from "react-router-dom"
import { useState, useEffect } from "react"
import { auth } from "./FirebaseConfig"

//Layouts
import { DefaultAdminLayout } from "./ui/layouts/DefaultAdminLayout"
import { DefaultLayout } from "./ui/layouts/DefaultLayout"

//Pages
import { Login } from "./ui/pages/Login"
import { HomeAdm } from "./ui/pages/HomeAdm"
import { DoctorsPage } from "./ui/pages/DoctorsPage"
import { ProductsPage } from "./ui/pages/ProductsPage"

export function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        handleLoggin()
      } else {
        setLoggedIn(false)
      }
    })
  }, [loggedIn])

  function handleLoggin() {
    setLoggedIn(true)
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/login" element={<Login handleLoggin={handleLoggin} />} />
        </Route>
        <Route path="/admin" element={<DefaultAdminLayout />}>
          <Route path="/admin" element={( loggedIn ? <HomeAdm /> : <Navigate to="/login" /> )} />
          <Route path="/admin/artigos" element={( loggedIn ? <HomeAdm /> : <Navigate to="/login" /> )} />
          <Route path="/admin/medicos" element={( loggedIn ? <DoctorsPage /> : <Navigate to="/login" /> )} />
          <Route path="/admin/produtos" element={( loggedIn ? <ProductsPage /> : <Navigate to="/login" /> )} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
