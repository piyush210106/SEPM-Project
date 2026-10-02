import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/Store.js';
import { Provider } from 'react-redux';
import { AuthProvider } from './auth/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App/>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '1rem',
            },
            success: {
              iconTheme: { primary: '#a855f7', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
