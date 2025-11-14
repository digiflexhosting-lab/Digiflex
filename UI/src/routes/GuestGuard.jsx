// import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';

// export default function GuestGuard({ children }) {
//   const isAuthenticated = localStorage.getItem('accessToken');

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// GuestGuard.propTypes = {
//   children: PropTypes.node
// };
// src/guards/GuestGuard.jsx
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function isSessionValid() {
  const token = localStorage.getItem('accessToken');
  const expiryRaw = localStorage.getItem('tokenExpiry');
  const expiry = expiryRaw ? parseInt(expiryRaw, 10) : 0;
  const valid = Boolean(token) && Date.now() < expiry;
  if (!valid && token) {
    // Clean stale token so guests can see login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiry');
  }
  return valid;
}

export default function GuestGuard({ children }) {
  const valid = isSessionValid();

  if (valid) {
    return <Navigate to="/" replace />;
  }

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.node
};
