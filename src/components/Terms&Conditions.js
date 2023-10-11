import React from "react"
import NavbarCart from "./NavbarCart"
import Footer from "./Footer"
import "../styles/terms.css"

function Terms() {
  return (
    <>
      <NavbarCart />
      <div className="term-mainpage">
        <div className="terms-content">
          <h4 className="terms-header">
            By using our services, you agree to the following Terms and
            Conditions:
          </h4>
          <h5>Eligibility:</h5>
          <p>1.1. To use our services, you must be at least 18 years old.</p>
          <p>
            1.2. Our services are available for individuals and entities within
            the United States.
          </p>
          <br />
          <h5>Prepaid Visa/Mastercard Exchange:</h5>
          <p>
            2.1. Prepaid Friends facilitates the exchange of Bitcoin (BTC) for
            prepaid Visa and Mastercard cards.
          </p>
          <p>
            2.2. We determine the exchange rate based on real-time market
            conditions at the time of the transaction.
          </p>
          <br />
          <h5>Compliance with Regulations:</h5>
          <p>
            3.1. Users must comply with all applicable laws and regulations
            while using our services.
          </p>
          <p>
            3.2. You are solely responsible for the legality of the source of
            your Bitcoin funds.
          </p>
          <br />
          <h5>User Responsibilities:</h5>
          <p>
            4.1. You are responsible for maintaining the confidentiality of your
            account and login credentials.
          </p>
          <p>4.2. Any activity on your account is your responsibility.</p>
          <p>
            4.3. You agree not to use our services for illegal activities,
            fraud, or money laundering.
          </p>
          <br />
          <h5>Fees and Charges:</h5>
          <p>
            5.1. Prepaid Friends may charge fees for its services. These fees
            will be clearly communicated before the transaction.
          </p>
          <p>
            5.2. Users are responsible for any additional fees charged by
            third-party payment processors.
          </p>
          <br />
          <h5>Card Usage:</h5>
          <p>
            6.1. The prepaid Visa/Mastercard cards obtained through our service
            can be used where Visa/Mastercard is accepted.
          </p>
          <p>
            6.2. Each card comes with its terms and conditions, which users must
            abide by.
          </p>
          <br />
          <h5>Limitations of Liability:</h5>
          <p>
            7.1. Prepaid Friends is not liable for any loss of Bitcoin during
            the exchange process.
          </p>
          <p>
            7.2. We are not responsible for any damages resulting from the use
            of the prepaid cards.
          </p>
          <br />
          <h5>Termination:</h5>
          <p>
            8.1. Prepaid Friends reserves the right to terminate or suspend any
            user's account at its discretion.
          </p>
          <p>
            8.2. Users may terminate their accounts by contacting our customer
            support.
          </p>
          <br />
          <h5>Modification of Terms:</h5>
          <p>
            9.1. We may update or modify these Terms and Conditions from time to
            time.
          </p>
          <p>
            9.2. Users will be notified of any significant changes, and
            continued use of our services constitutes acceptance of the updated
            terms.
          </p>
          <br />
          <h5>Intellectual Property:</h5>
          <p>
            10.1. All content and materials on the Prepaid Friends website are
            the property of Prepaid Friends.
          </p>
          <p>
            10.2. Users may not use, copy, or distribute any content without
            explicit permission.
          </p>
          <br />
          <h5>Governing Law and Jurisdiction:</h5>
          <p>
            11.1. These Terms and Conditions are governed by the laws of the
            United States.
          </p>
          <p>
            11.2. Any disputes will be subject to the exclusive jurisdiction of
            the courts in the United States.
          </p>
          <br />
          <p>
            Contact Information: For any questions or concerns regarding these
            Terms and Conditions, please contact our customer support at
            <a href="mailto:support@prepaidfriends.com">
              {" "}
              support@prepaidfriends.com.
            </a>
          </p>{" "}
          <br />
          <p>
            By using Prepaid Friends' services, you acknowledge that you have
            read, understood, and agreed to these Terms and Conditions. Thank
            you for choosing Prepaid Friends!
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Terms
