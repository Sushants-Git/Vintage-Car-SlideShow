export default function Header() {
  return (
    <header>
      <div className="logo">
        <a href="#">
          V <span>c</span>{" "}
        </a>
      </div>
      <nav className="nav-bar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Events</li>
        </ul>
      </nav>
    </header>
  );
}
