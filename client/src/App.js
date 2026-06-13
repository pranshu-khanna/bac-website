import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Events from "./pages/Events/Events";
import Programs from "./pages/Programs/Programs";
import Tournaments from "./pages/Tournaments/Tournaments";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Membership from "./pages/Membership/Membership";
import Resources from "./pages/Resources/Resources";
import Request from "./pages/Request/Request";
import Login from "./pages/Login/Login";
import Enrichment from "./pages/Enrichment/Enrichment";
import EnrichmentLaunch from "./pages/Enrichment/EnrichmentLaunch";
import Results from "./pages/Results/Results";
import Faq from "./pages/Faq/Faq";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="events" element={<Events />} />
        <Route path="programs" element={<Programs />} />
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="membership" element={<Membership />} />
        <Route path="resources" element={<Resources />} />
        <Route path="request" element={<Request />} />
        <Route path="login" element={<Login />} />
        <Route path="enrichment" element={<Enrichment />} />
        <Route path="enrichment/launch/:slug" element={<EnrichmentLaunch />} />
        <Route path="results" element={<Results />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
