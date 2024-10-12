import { Link } from "react-router-dom";
import "../../styles/homepage-style.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-content">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" height="80" viewBox="0 0 80 80">
            <image href="data:image/png;base64,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" x="0" y="0" width="80" height="80"/>
        </svg>
          <p className="description">
            Welcome to our platform. Your security is our top priority.
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-primary">Sign In</Link>
            <Link to="/register" className="btn btn-secondary">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-content">
          <h2>Security & Privacy</h2>
          <h2>Contact Us</h2>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
