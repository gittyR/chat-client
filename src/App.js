import './App.css';
import Login from './login/login';
import Chat from './chat/chat'
import { Route, BrowserRouter, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/chat" element={<Chat/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
