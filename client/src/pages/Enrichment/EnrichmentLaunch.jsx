import { Navigate, useParams } from "react-router-dom";

const SLUG_TO_SECTION = {
  home: "",
  "weekend-clubs": "clubs",
  camps: "camps",
  "school-enrichment": "afterschool",
  "rising-stars": "rising-star",
};

export default function EnrichmentLaunch() {
  const { slug } = useParams();
  const section = SLUG_TO_SECTION[slug];
  const to = section ? `/enrichment#${section}` : "/enrichment";
  return <Navigate to={to} replace />;
}
