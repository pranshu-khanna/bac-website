import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomeSectionRedirect from "./components/HomeSectionRedirect";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Login from "./pages/Login/Login";
import EnrichmentHome from "./pages/Enrichment/EnrichmentHome";
import EnrichmentLaunch from "./pages/Enrichment/EnrichmentLaunch";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Legacy page routes → home sections */}
        <Route path="tournaments" element={<HomeSectionRedirect section="tournaments" />} />
        <Route path="leaderboard" element={<HomeSectionRedirect section="leaderboard" />} />
        <Route path="enrichment" element={<EnrichmentHome />} />
        <Route path="results" element={<HomeSectionRedirect section="results" />} />
        <Route path="faq" element={<HomeSectionRedirect section="faq" />} />
        <Route path="about" element={<HomeSectionRedirect section="about" />} />
        <Route path="contact" element={<HomeSectionRedirect section="contact" />} />

        {/* Standalone pages (not in primary nav) */}
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="enrichment/launch/:slug" element={<EnrichmentLaunch />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
