import React from "react"
import NavbarCart from "./NavbarCart"
import Footer from "./Footer"
import "../styles/terms.css"

function Policy() {
  return (
    <>
      <NavbarCart />
      <div className="term-mainpage">
        <div className="terms-content">
          <h4 className="policy-header">
            At Prepaid Friends, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, disclose, and safeguard your data when you use
            our services. By accessing or using Prepaid Friends, you agree to
            the practices described in this Privacy Policy.
          </h4>
          <h5>Information We Collect:</h5>
          <p>
            1.1. Personal Information: When you sign up for an account, we
            collect your name, email address, and other necessary information to
            facilitate account creation and transactions.
          </p>
          <p>
            1.2. Bitcoin Transactions: We collect information related to your
            Bitcoin transactions to process the exchange with prepaid
            Visa/Mastercard cards.
          </p>
          <p>
            1.3. Website Usage: We may collect non-personal information, such as
            IP addresses, browser type, device information, and pages visited,
            to analyze trends and improve our website's functionality.
          </p>
          <br />
          <h5>How We Use Your Information:</h5>
          <p>
            2.1. To Provide Services: We use your personal information to enable
            transactions and provide you with the requested services.
          </p>
          <p>
            2.2. Customer Support: We may use your contact information to
            respond to your inquiries, requests, or support needs.
          </p>
          <p>
            2.3. Personalization: We may use collected data to personalize your
            experience and deliver relevant content and promotions. 2.4.
            Compliance: We may use your information to comply with legal
            obligations and enforce our Terms and Conditions.
          </p>
          <br />
          <h5>Data Sharing and Disclosure:</h5>
          <p>
            3.1. Third-Party Service Providers: We may share your information
            with trusted third-party service providers who assist us in
            operating our website, processing transactions, and providing
            customer support.
          </p>
          <p>
            3.2. Legal Requirements: We may disclose your information if
            required by law, regulation, legal process, or governmental request.
          </p>
          <p>
            3.3. Business Transfers: In the event of a merger, acquisition, or
            sale of all or a portion of our assets, your information may be
            transferred as part of the transaction.
          </p>
          <br />
          <h5>Security Measures:</h5>
          <p>
            4.1. We implement industry-standard security measures to protect
            your data from unauthorized access, alteration, disclosure, or
            destruction.
          </p>
          <p>
            4.2. While we take reasonable precautions, no method of data
            transmission over the internet or electronic storage is 100% secure.
            We cannot guarantee absolute security.
          </p>
          <br />
          <h5>Cookies and Tracking Technologies:</h5>
          <p>
            5.1. Prepaid Friends may use cookies and similar technologies to
            enhance your website experience and gather information about usage
            patterns.
          </p>
          <p>
            5.2. You can manage your cookie preferences through your browser
            settings.
          </p>
          <br />
          <h5>Children's Privacy:</h5>
          <p>
            6.1. Our services are not intended for children under the age of 18.
          </p>
          <p>
            6.2. We do not knowingly collect or maintain personal information
            from children.
          </p>
          <br />
          <h5>Your Choices:</h5>
          <p>
            7.1. You have the right to access, update, or delete your personal
            information.
          </p>
          <p>
            7.2. You can opt-out of receiving promotional communications from
            us.
          </p>
          <br />
          <h5>Changes to this Privacy Policy:</h5>
          <p>
            8.1. We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons.
          </p>
          <p>
            8.2. The revised policy will be effective immediately upon posting
            the updated Privacy Policy on our website.
          </p>
          <br />
          <p>
            Contact Us: For any questions or concerns regarding this Privacy
            Policy, please contact us at{" "}
            <a href="mailto:support@prepaidfriends.com">
              support@prepaidfriends.com.
            </a>
          </p>{" "}
          <br />
          <p>
            By using Prepaid Friends' services, you consent to the practices
            described in this Privacy Policy. Please review this policy
            periodically to stay informed of any updates. Thank you for choosing
            Prepaid Friends!
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Policy
