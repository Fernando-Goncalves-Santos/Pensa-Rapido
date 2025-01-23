import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Paginas
import Login from './components/pages/Auth/Login.tsx'
import Home from './components/pages/Home.tsx'
import Register from './components/pages/Auth/Register.tsx'
import SelectCategory from './components/pages/Game/SelectCategory.tsx'
import Quiz from './components/pages/Game/Quiz.tsx'
import Endgame from './components/pages/Game/Endgame.tsx'
import Ranking from './components/pages/Dashboard/Ranking.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>

      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/selectcategory",
        element: <SelectCategory/>
      },
      {
        path: "/quiz",
        element: <Quiz/>
      },
      {
        path: "/endgame",
        element: <Endgame/>
      },
      {
        path: "/users/:id/dashboard",
        element: <Ranking/>
      },
    ]

  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
