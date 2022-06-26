import React from "react";
import "./App.css";
import AppRoutes from './routes/AppRouter';
import { AuthProvider } from "./context";

function App() {
  
  return (
    <div className="__main">
      <AuthProvider >
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
