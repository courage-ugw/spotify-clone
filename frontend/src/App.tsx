import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/chat/404/NotFoundPage";

import { Toaster } from "react-hot-toast";


function App() {

  
  return (
    <> {/* TODO: Add Pages: Admin, Settings, etc. and add them to src/pages and add them to the routes here */}
      <Routes>
        <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback 
        signUpForceRedirectUrl={"/auth-callback"}/>} />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster /> {/* Mounts the Toaster component on the root App component */}
    </>  
  )
}

export default App
