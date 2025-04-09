import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <h2>Welcome to Resume Matcher</h2>
      <p>Match your resume with job descriptions easily!</p>
      <Link to="/matcher">
        <button>All Features</button>
      </Link>
    </div>
  );
}

export default Home;