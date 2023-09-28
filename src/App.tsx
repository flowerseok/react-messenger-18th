import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Chat from "./pages/Chat/Chat";
import ChatRoom from "./components/ChatRoom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ChatRoom />} /> {}
      </Routes>
    </Router>
  );
}

export default App;


