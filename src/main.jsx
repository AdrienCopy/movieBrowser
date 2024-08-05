import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from "./error-page";
import './assets/css/style.css'
import Index from "./routes/index";
import Movie from './routes/movie';
import Search from './routes/search';
import Profil from './routes/profil';
import { AuthProvider } from './components/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "movie/:id",
            element: <Movie />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "profil",
            element: <Profil />,
          },
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
