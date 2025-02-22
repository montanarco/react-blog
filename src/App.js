import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage  from './pages/ArticlesListPage';
import ArticlesPage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar></NavBar>
      <h1> Simple Blog </h1>
      <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/articles" element={<ArticlesListPage/>}/>
            <Route path="/articles/:articleId" element={<ArticlesPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create-account' element={<CreateAccountPage/>}/>
          </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
