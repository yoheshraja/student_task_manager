import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Authprovider from './components/Authcontext.jsx'
import App from './App.jsx'
import Authcontext from './components/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authcontext>
      <App/>
    </Authcontext>
  </StrictMode>,
)
