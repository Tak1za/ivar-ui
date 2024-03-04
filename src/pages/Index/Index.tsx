import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div className="flex flex-col">
      <h1>This is the index page</h1>
      <div>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
