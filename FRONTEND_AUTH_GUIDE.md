# Frontend Authentication & Authorization Guide

## 1. Login & Store in localStorage

**Example using React/JavaScript:**

```javascript
// authService.js (Frontend)
export const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      // Store token, user, role, and permissions in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Store role and permissions separately for easy access
      if (data.user.role) {
        localStorage.setItem('role', JSON.stringify(data.user.role));
      }
      
      if (data.user.permissions) {
        localStorage.setItem('permissions', JSON.stringify(data.user.permissions));
      }

      return { success: true, data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message };
  }
};
```

## 2. Create Auth Context (React Example)

```javascript
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load from localStorage on app startup
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    const savedPermissions = localStorage.getItem('permissions');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      if (savedRole) setRole(JSON.parse(savedRole));
      if (savedPermissions) setPermissions(JSON.parse(savedPermissions));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('permissions');
    setToken(null);
    setUser(null);
    setRole(null);
    setPermissions([]);
  };

  // Check if user has specific permission
  const hasPermission = (permissionName) => {
    return permissions.some((p) => p.name === permissionName);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        permissions,
        token,
        loading,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

## 3. Axios Interceptor to Auto-Add Token

```javascript
// axiosConfig.js
import axios from 'axios';

export const setupAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 responses
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('permissions');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
```

## 4. Protected Component (React)

```javascript
// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, hasPermission, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

## 5. Usage Example

```javascript
// App.js
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { setupAxios } from './axiosConfig';

setupAxios();

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredPermission="view_users">
              <UserList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
```

## 6. Permission Check Middleware (Backend)

Your existing `RolePermissionCheck.js` will work with the updated `req.user.permissions`:

```javascript
// Usage in routes
import checkPermission from '../middleware/RolePermissionCheck.js';
import authCheck from '../middleware/AuthMiddleware.js';

router.delete(
  '/:id',
  authCheck,
  checkPermission('delete_products'),
  deleteProduct
);
```

## 7. localStorage Structure

After login, your localStorage will contain:

```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    _id: "507f1f77bcf86cd799439011",
    name: "John Doe",
    email: "john@example.com",
    role: {
      id: "507f1f77bcf86cd799439012",
      name: "Admin",
      all: true
    },
    permissions: [
      { id: "....", name: "view_users", display_name: "View Users" },
      { id: "....", name: "create_users", display_name: "Create Users" },
      { id: "....", name: "delete_users", display_name: "Delete Users" }
    ]
  },
  role: {...},
  permissions: [...]
}
```

## Summary

1. **Backend sends role & permissions** during login via AuthService
2. **Frontend stores in localStorage** for persistent access
3. **AuthMiddleware populates permissions** on each request
4. **Frontend checks permissions** before showing UI elements
5. **Backend validates permissions** via RolePermissionCheck middleware
