import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./admin/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Program from "./pages/Program";
import VisiMisi from "./pages/VisiMisi";
import Struktur from "./pages/Struktur";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Dashboard from "./admin/Dashboard";
import BeritaList from "./admin/BeritaList";
import BeritaForm from "./admin/BeritaForm";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsDetail />} />
        <Route path="program" element={<Program />} />
        <Route path="visimisi" element={<VisiMisi />} />
        <Route path="struktur" element={<Struktur />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="berita" element={<BeritaList />} />
        <Route path="berita/form" element={<BeritaForm />} />
        <Route path="/admin/edit-berita/:id" element={<BeritaForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </AuthProvider>
    
  );
}

export default App;
