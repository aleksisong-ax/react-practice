import { Link, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Students from "./pages/Students.jsx";

export default function App() {
  return (
    <>
      <header>
        <h1>My Class Website</h1>
        <nav aria-label="Main navigation">
          <Link to="/">Home</Link>{" | "}
          <Link to="/about">About</Link>{" | "}
          <Link to="/contact">Contact</Link>{" | "}
          <Link to="/students">Students</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/students" element={<Students />} />
        <Route path="*" element={
          <main>
            <h1>Page not found</h1>
            <Link to="/">Return to Home</Link>
          </main>
        } />
      </Routes>
      <footer><p>Our React class project</p></footer>
    </>
  );
}
