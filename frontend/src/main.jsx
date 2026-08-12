import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Authprovider from './components/Authcontext.jsx'
import App from './App.jsx'
import Authcontext from './components/Authcontext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
    await loadSlim(engine);
};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authcontext>
       <ParticlesProvider init={particlesInit}>
            <App />
        </ParticlesProvider>
    </Authcontext>
  </StrictMode>,
)
