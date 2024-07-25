import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatWidget from './components/chatWidget/ChatWidget';
import HomePage from './components/homePage/HomePage';
import PreChatForm from './components/preChatForm/PreChatForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/preChatForm" element={<PreChatForm />} />
        <Route path="/chat" element={<ChatWidget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
