import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

/** Send legacy page routes to the matching home-page section hash. */
export default function HomeSectionRedirect({ section }) {
  const params = useParams();
  const id = section || params.section;

  useEffect(() => {
    if (!id) return;
    // Ensure the hash is present even if Navigate strips it in some browsers.
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `/#${id}`);
    }
  }, [id]);

  if (!id) return <Navigate to="/" replace />;
  return <Navigate to={`/#${id}`} replace />;
}
