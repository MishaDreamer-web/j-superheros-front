import { Layout } from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { SuperherosPage } from './pages/SuperherosPage/SuperherosPage';
import { SuperheroPage } from './pages/SuperheroPage/SuperheroPage';
import { AddSuperheroPage } from './pages/AddSuperhero/AddSuperheroPage';
import { EditSuperheroPage } from './pages/EditSuperhero/EditSuperheroPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="superheros" element={<SuperherosPage />} /> */}
        <Route path="/:id" element={<SuperheroPage />} />
        <Route path="/:id/edit" element={<EditSuperheroPage />} />
        <Route path="new" element={<AddSuperheroPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
