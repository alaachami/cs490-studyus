import * as React from "react";
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import CallPage from "../CallPage/CallPage";
import GroupPage from "../GroupPage/GroupPage"
import NotFound from "../NotFound/NotFound";
import GroupForm from "../Dashboard/CreateForm/createForm";
import { AuthContextProvider, useAuthContext } from "../../contexts/auth";
import { GroupContextProvider, useGroupContext } from "../../contexts/group";
import { ChatContextProvider, useChatContext } from "../../contexts/chat";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { OpenContextProvider } from "../../contexts/open";
import { useEffect, useState } from "react";
import ApiClient from "../../services/ApiClient";
import ApiClient from "../../services/ApiClient";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function AppContainer() {
  return (
    <AuthContextProvider>
      <GroupContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </GroupContextProvider>
    </AuthContextProvider>
  );
}

export function App() {
  const { user, setUser, setInitialized, setIsProcessing, setError } = useAuthContext();
   const { myGroups, fetchMyGroups } = useGroupContext();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await ApiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
        // fetchGroups();
      }
      setInitialized(true);
      setIsProcessing(false);
    };
    //console.log("App dashboardStatistics:", dashboardStatistics)
    // const token = localStorage.getItem("studyus_token");
    const token = ApiClient.getToken();

    if (token) {
      ApiClient.setToken(token);
      setIsProcessing(true);
      setError(null);
      fetchUserInfo();
    }
    setIsProcessing(false);
    setInitialized(true);
  }, [setUser]);


  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/*user?.email ? (
            <>
              <Navbar />
              <Sidebar />
            </>
          ) : (
            <NoUserNavbar />
          )*/}

          <Routes>
            <Route
              path="/"
              element={user?.email ? <Dashboard /> : <LandingPage />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/group/:id"
              element={<ProtectedRoute element={<GroupPage />} />}
            />
            <Route
              path="/groupform"
              element={<ProtectedRoute element={<GroupForm />} />}
            />
            <Route
              path="/call"
              element={<ProtectedRoute element={<CallPage />} />}
            />
            
            <Route path="*" element={<NotFound />} />  
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
