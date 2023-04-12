import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './index.css';
import App from './App';
import SignUp from './Page/SignUp/SignUp';
import SignIn from './Page/SignIn/SignIn'
import Stores from './Page/Store/index'
import { store } from './redux/store' 
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const RequireAuth=({children}) => {
    const currentUser=useSelector((state)=>state.auth.currentUser)
    return currentUser?children:<Navigate to="/SignIn" replace/>
}

const router = createBrowserRouter([
  {
    path: "SignUp",
    element: <SignUp />,
  },
  {
    path:'/',
    element: <RequireAuth children={<App />} /> 
  },
  {
    path:"SignIn",
    element: <SignIn />
  },
  {
    path:"Stores",
    element: <RequireAuth children={<Stores/>} />,
  }
]);

const contentful = require('contentful');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);


