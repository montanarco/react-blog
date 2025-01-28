import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesList  from './pages/ArticlesList';
import ArticlesPage from './pages/ArticlePage';

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
            <Route path="/articles" element={<ArticlesList/>}/>
            <Route path="/articles/:articleId" element={<ArticlesPage/>}/>
          </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
