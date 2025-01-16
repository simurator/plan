import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/add">Add Lesson</Link>
  </nav>
);

export default Navigation;
