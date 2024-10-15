import { Link } from "react-router-dom";
import { routes } from "../constants/routes.tsx";

export default function Header() {
  return (
    <header>
      <nav style={{ display: "flex" }}>
        <li>
          <Link to={routes.POST}>posts</Link>
        </li>
        <li>
          <Link to={routes.LOGIN}>login</Link>
        </li>
      </nav>
    </header>
  );
}
