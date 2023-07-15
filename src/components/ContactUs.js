import React from "react"
import { Form, Input, Button } from "antd"
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import "../styles/ContactUs.css"
import NavbarCart from "./NavbarCart"
import  phone from "../assets/phone-call.png"
import email from "../assets/email.png"
import Footer from "./Footer"

const ContactUs = () => {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  }

  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <>
      <NavbarCart />
      <div style={{height:"94vh"}}>
        <div className="contactus-container">
   
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
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div  className="images-sideform">
            <div className="phone-image"><img src={phone}></img><p>+2347026290389</p><p>You can call us at anytime</p></div>
            <div className="phone-image"><img src={email}></img><p>contact@prepaidfriends.com</p><p>Send us a detailed message</p></div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
export default ContactUs
