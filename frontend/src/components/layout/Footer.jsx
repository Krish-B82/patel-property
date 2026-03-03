import { FaCircle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand">
            <FaCircle className="logo-dot" />
            <div>
              <h1>PATELPROPERTY.com</h1>
              <p>Vadodara, Gujarat</p>
            </div>
          </div>
          <div className="socials">
            <span>X</span>
            <span>IG</span>
            <span>YT</span>
            <span>LI</span>
          </div>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p>@patel_property_vadodara</p>
          <p>+91 XXXXXX214</p>
        </div>

        <div>
          <h4>Pages</h4>
          <a href="#latest">Latest Property</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <p className="copyright">© 2026 Property Vadodara. All rights reserved.</p>
    </footer>
  );
}
