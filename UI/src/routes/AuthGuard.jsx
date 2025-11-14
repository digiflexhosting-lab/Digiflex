// import {  Outlet ,Navigate } from 'react-router-dom';

// export default function AuthGuard() {
//   const isAuthenticated = localStorage.getItem('accessToken'); // Or use your auth logic

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }
// src/guards/AuthGuard.jsx
import { Outlet, Navigate } from 'react-router-dom';

function isSessionValid() {
  const token = localStorage.getItem('accessToken');
  const expiryRaw = localStorage.getItem('tokenExpiry');
  const expiry = expiryRaw ? parseInt(expiryRaw, 10) : 0;
  const valid = Boolean(token) && Date.now() < expiry;
  if (!valid) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
  }
  return valid;
}

export default function AuthGuard() {
  const valid = isSessionValid();

  if (!valid) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
 