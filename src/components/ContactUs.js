import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import "../styles/ContactUs.css";
import NavbarCart from "./NavbarCart";
import phone from "../assets/Phone-img.png";
import email from "../assets/Mail.png";
import Footer from "./Footer";
import globe from "../assets/globe 1.png";
import { Helmet } from "react-helmet";
import axios from "axios";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/contact-us-api", {
        name: values.user.name,
        email: values.user.email,
        subject: values.user.subject,
        comment: values.user.comment,
      });

      if (response.data.status === "success") {
        notification.success({
          message: "Success",
          description: "Email sent successfully!",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Email not sent",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred. Please try again later.",
      });
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = "Contact-Us";
  const pageDescription =
    "Contact Prepaid Friends for seamless prepaid card solutions, offering easy BTC to prepaid card exchanges. Reach out to our expert team today to explore secure and convenient options for managing your crypto with prepaid cards.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <NavbarCart />
      <div className="contactus">
        <div className="contactus-container">
          <img src={globe} className="globe-img"></img>
        </div>
        <div className="bottom-contact-container">
          <div className="form-container">
            <div className="form-title">
              <h2>GET IN TOUCH!</h2>
            </div>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="Your Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Your Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              <Form.Item name={["user", "subject"]} label="Subject">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "comment"]} label="Comment">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="contact-submit-btn"
                  loading={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="images-sideform">
            <div className="phone-image">
              <img src={phone}></img>
              <p className="bold">+1-000-111-0000</p>
            </div>
            <div className="email-image">
              <img src={email}></img>
              <p className="bold">support@prepaidfriends.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ContactUs;
