import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import "./App.css";

import Calculator from "./pages/Calculator";
import QualifyingQuestions from "./pages/QualifyingQuestions";
import Videos from "./pages/videos";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import theme from "./theme";
import Layout from "./components/common/Layout";
import { Toaster } from "react-hot-toast";

// PrivateRoute component to protect all routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
  // return isAuthenticated && children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Toaster />
          <Routes>
            {/* Public route for login */}
            <Route path="login" element={<LoginPage />} />

            {/* Protected routes inside Layout */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              {/* Nested protected routes */}
              <Route index element={<Calculator />} />
              <Route path="questions" element={<QualifyingQuestions />} />
              <Route path="videos" element={<Videos />} />
            </Route>

            {/* Catch-all route, redirect to home if no match */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
