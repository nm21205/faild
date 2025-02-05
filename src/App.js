import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UploadPage from './pages/UploadPage';
import Products from './components/Products';
import ProductDetail from './pages/ProductDetail';
import { AccessTokenProvider } from './components/AccessTokenContext';
import './App.scss';

function App() {
  return (
    <AccessTokenProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/uploadpage" element={<UploadPage />} />
            <Route path="/product" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </AccessTokenProvider>
  );
}

export default App;
