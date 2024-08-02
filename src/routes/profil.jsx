import React from "react";
import { AuthProvider, AuthContext } from "../components/AuthContext";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";

export default function Profil () {
    return (
        <AuthProvider>
          <Main />
        </AuthProvider>
      );
    };

const Main = () => {
  const { sessionId, login } = React.useContext(AuthContext);

  return (
    <div>
      {sessionId ? <Dashboard /> : <LoginForm onLogin={login} />}
    </div>
  );
};