import { Link } from "react-router-dom";
import { routes } from "../constants/routes.tsx";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <Link to={routes.POST}>POST</Link>
    </>
  );
}
