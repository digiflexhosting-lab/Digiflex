// // src/guards/RootRedirect.jsx
import { Navigate } from 'react-router-dom';

function isSessionValid() {
  const token = localStorage.getItem('accessToken');
  const expiryRaw = localStorage.getItem('tokenExpiry');
  const expiry = expiryRaw ? parseInt(expiryRaw, 10) : 0;
  const valid = Boolean(token) && Date.now() < expiry;
  if (!valid && token) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
  }
  return valid;
}

export default function RootRedirect() {
  const valid = isSessionValid();
  return valid ? <Navigate to="/dashboard/user" replace /> : <Navigate to="/login" replace />;
}
