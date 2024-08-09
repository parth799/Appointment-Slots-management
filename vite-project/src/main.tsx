// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import AppointmentsList from './components/AppointmentList/AppointmentList';
import GroupNavbar from './components/Group/Group';
import AppointementSlote from './components/AppointementSlote/AppointementSlote';
import { Provider } from 'react-redux';
import store from './Redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <AppointmentForm /> },
      { path: '/create-appointment', element: <AppointmentForm /> },
      { path: '/list-appointments', element: <AppointmentsList /> },
      { path: '/groups', element: <GroupNavbar /> },
      { path: '/appointementSlote', element: <AppointementSlote /> },
      // Add other routes here
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
