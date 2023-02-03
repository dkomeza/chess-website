import { AuthProvider } from "./contexts/AuthContext";

import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}

export default App;
