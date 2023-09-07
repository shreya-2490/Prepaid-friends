import React from "react"
import "../styles/footer.css"
import { Link } from "react-router-dom"
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
function Footer() {
  return (
    <>
    <div className="footer">
    <div className="termandprivacy">
      <Link to="/terms-conditions" className="termscondition">
        Terms & Conditions <span className="divider-bet">|</span>
      </Link>
      <Link to="/privacy-policy" className="privacy">
        Privacy Policy
        </Link>

        </div>
        <span className="copyright">Copyright © 2023 | All Rights Reserved</span>
        <div className="social-handles">
          <a href="https://www.facebook.com/prepaidfriendss" className="social-media" target="_blank"><FacebookOutlined /> </a>
          <a href="https://www.linkedin.com/company/p-friends/" className="social-media" target="_blank"><LinkedinOutlined /></a>
          {/* <span className="social-media"><LinkedinOutlined /> </span> */}
          </div>
      </div>
        <div className="footer-mobile">
        <p className="copyright">Copyright © 2023 | All Rights Reserved</p>


        <div className="termandprivacy">
        <Link to="/terms-conditions" className="termscondition">
          Terms & Conditions <span className="divider-bet">|</span>
        </Link>
        <Link to="/privacy-policy" className="privacy">
          Privacy Policy
          </Link>
        </div>
        <div className="social-handles">
          <Link to="https://www.facebook.com/prepaidfriendss" className="social-media"><FacebookOutlined /> </Link>
          <a href="https://www.linkedin.com/company/p-friends/" className="social-media" target="_blank"><LinkedinOutlined /></a>
          {/* <span className="social-media"><LinkedinOutlined /> </span> */}
          </div>
        </div>
</>
  )
}

export default Footer
