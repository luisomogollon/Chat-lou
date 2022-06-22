import React from "react";
import "./App.css";
import AppRoutes from './routes/AppRouter';
import { AuthProvider } from "./context";
//import socket from "./components/socket";

function App() {
  //socket.emit ('conect', "hola desde cliente pepepelelelel");
  
  return (
    <div className="__main">
      <AuthProvider >
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
