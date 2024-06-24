import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Entry from './Pages/Entry';
import Home from './Pages/Home';
import BookPage from './Pages/BookPage';

function Router() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/BookPage/:fileId" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
