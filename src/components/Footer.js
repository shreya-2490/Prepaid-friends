import React from "react"
import "../styles/footer.css"
import { Link } from "react-router-dom"
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
function Footer() {
  return (
    <>
    <div className="footer">

      <Link to="/front-demo/terms-conditions" className="termscondition">
        Terms & Conditions <span className="divider-bet">|</span>
      </Link>
      <Link to="/front-demo/privacy-policy" className="privacy">
        Privacy Policy
        </Link>

        
        <span className="copyright">Copyright © 2023 | All Rights Reserved</span>
        <div className="social-handles">
          <a href="https://www.facebook.com/prepaidfriendss" className="social-media" target="_blank"><FacebookOutlined /> </a>
          <a href="" className="social-media" target="_blank"><LinkedinOutlined /></a>
          {/* <span className="social-media"><LinkedinOutlined /> </span> */}
          </div>
      </div>
        <div className="footer-mobile">
        <p className="copyright">Copyright © 2023 | All Rights Reserved</p>


        <div className="termandprivacy">
        <Link to="/front-demo/terms-conditions" className="termscondition">
          Terms & Conditions <span className="divider-bet">|</span>
        </Link>
        <Link to="/front-demo/privacy-policy" className="privacy">
          Privacy Policy
          </Link>
        </div>
        <div className="social-handles">
          <Link to="https://www.facebook.com/prepaidfriendss" className="social-media"><FacebookOutlined /> </Link>
          <a href="" className="social-media" target="_blank"><LinkedinOutlined /></a>
          {/* <span className="social-media"><LinkedinOutlined /> </span> */}
          </div>
        </div>
</>
  )
}

export default Footer
