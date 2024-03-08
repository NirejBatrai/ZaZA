import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";

import { Provider } from "react-redux";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <Provider></Provider>
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/notfound' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>
    </>
  );
}

export default App;
