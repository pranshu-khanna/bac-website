import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FeedbackTab from "../FeedbackTab/FeedbackTab";
import "../FeedbackTab/FeedbackTab.scss";

export default function Layout() {
  const { pathname } = useLocation();
  const hideFooter = pathname === "/" || pathname === "/enrichment";

  return (
    <div className="site">
      <Header />
      <Outlet />
      {!hideFooter ? <Footer /> : null}
      <FeedbackTab />
    </div>
  );
}
