import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes';
import AuthProvider from './contexts/auth';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { CgVercel } from 'react-icons/cg';

// nome do site em url https://chamados-eight.vercel.app/

// deploy CgVercel

// 2. Deploy no Vercel
// O Vercel também é muito fácil de usar e oferece integração perfeita com o GitHub. É ideal para projetos React.

// Passos para deploy no Vercel:
// Criar uma conta no Vercel: Crie uma conta ou faça login em vercel.com.

// Importar o repositório no Vercel:

// No dashboard, clique em New Project.
// Conecte sua conta do GitHub e importe o repositório do seu projeto React.
// Configurar o projeto:

// O Vercel detecta automaticamente que seu projeto é um aplicativo React e configura os scripts de build e publicação.
// O comando de build geralmente será:
// bash
// Copiar código
// npm run build
// Deploy automático:

// O Vercel fará o deploy automaticamente. Da mesma forma que no Netlify, ele vai monitorar o repositório e fazer novos deploys após cada push.

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={2000}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
