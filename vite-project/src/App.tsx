// src/App.tsx
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
