import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">Chess-website</div>
    </AuthProvider>
  );
}

export default App;
