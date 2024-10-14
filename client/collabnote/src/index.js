import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from '../src/pages/login';
import Register from '../src/pages/register';
import Homepage from '../src/pages/homepage';
import {AuthProvider} from './contexts/auth-context';
import {ToastProvider} from './contexts/toast-context';
import VerifyEmail from "../src/pages/user/verify-email";
import AuthRoute from "./components/molecules/auth-route";
import Create from "./pages/document/create";
import Document from "../src/pages/document/index";
import {DocumentProvider} from "./contexts/document-context";
import {EditorProvider} from "./contexts/editor-context";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/user/verify-email/:token" element={<VerifyEmail/>}/>
            <Route path="/document/create" element={<AuthRoute element={<Create />} />} />
            <Route
              path="/document/:id" element={<AuthRoute element={
                    <DocumentProvider>
                      <EditorProvider>
                        <Document />
                      </EditorProvider>
                    </DocumentProvider>
                  }/>
              }/>
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
