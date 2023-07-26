import React, { useContext, useState } from "react";
import NavbarCart from "./NavbarCart";
import "../styles/BulkOrder.css";
import success from "../assets/Success Icon.png";
import tick from "../assets/tick-circle.png";
import cards from "../assets/Bank Cards.png";
import ellipse from "../assets/Ellipse.png";
import { v4 as uuidV4 } from "uuid";

import { Button, Form, Input, InputNumber, Select, Card, Checkbox } from "antd";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
const { Option } = Select;

const BulkOrder = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { addToBulkCart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);

  return (
    <>
      <NavbarCart />
      <div className="bulk-main">
        <div className="bulk-division">
          <div className="bulk-div-1">
            <Card className="bulkorder-content">
              <img src={success} alt=""></img>
              <h3>Bulk Prepaid Card</h3>
              <p className="subtitle-bulk">
                You can buy from 5 - 100 Prepaid Cards in one go{" "}
              </p>
              <p className="subtitle-bulk-2">Cards in one go</p>
            </Card>
            <div>
              <Card className="benefits-card">
                <div className="benefits-card-content">
                  <img src={ellipse} className="benefits-card-img" alt="" />
                  <img src={cards} className="benefits-card-badge" alt="" />
                  <h4 className="benefits-card-title">Benefits</h4>
                </div>
              </Card>
            </div>

            <div className="bulkorder-content-2">
              <div className="listing-div">
                <span className="listing">
                  <img src={tick} className="tick class" alt=""></img>
                  <p>Streamlined Process</p>
                </span>
                <div className="listing">
                  <img src={tick} alt=""></img>
                  <p>Flexible Quantities</p>
                </div>
                <div className="listing">
                  <img src={tick} alt=""></img>
                  <p>Customization Options</p>
                </div>
                <div className="listing">
                  <img src={tick} alt=""></img>
                  <p>Competitive Pricing</p>
                </div>
              </div>
              <p className="footer-card2">
                Purchasing bulk prepaid cards and exchanging Bitcoin through
                Prepaid Friend's website offers numerous benefits. Their
                streamlined process ensures quick and hassle-free transactions.
                With flexible quantities, users can meet their specific needs
                without limitations. Customization options allow for
                personalized branding and messaging. Moreover, competitive
                pricing guarantees cost-effectiveness, making it an ideal choice
                for individuals and businesses alike.
              </p>
            </div>
          </div>
          <div className="bulk-div-2">
            <Form
              name="bulk-orders-form"
              form={form}
              layout="vertical"
              autoComplete="off"
              onValuesChange={() => {
                const quantity = form.getFieldValue("card-quantity") || 0;
                const loadAmount = form.getFieldValue("load-amount") || 0;
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0;

                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                );

                const calculateTotal =
                  (quantity * loadAmount || 0) +
                  (loadAmount ? quantity * 2.98 : 0) +
                  additionalPurchaseQt * 2 +
                  (isUsedForInternationalTransaction ? 7.5 : 0);

                setSubTotal(calculateTotal);
              }}
              style={{
                margin: "75px 20px 0px 20px",
                width: "90%",
              }}
              onFinish={() => {
                const quantity = form.getFieldValue("card-quantity") || 0;
                const loadAmount = form.getFieldValue("load-amount") || 0;
                const cardType = form.getFieldValue("card-type") || 0;
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0;

                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                );

                addToBulkCart({
                  id: uuidV4(),
                  quantity,
                  amount: loadAmount,
                  subTotal,
                  cardType,
                  additionalPurchaseQt,
                  isUsedForInternationalTransaction,
                });

                nav("/front-demo/bulk-checkout");
              }}
            >
              <Form.Item
                name="Customer's Name"
                label="Customer's Name"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Business Name"
                label="Business Name"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item name="Address" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="Phone" label="Phone">
                <Input />
              </Form.Item>
              <Form.Item
                name="card-type"
                label="Card Type"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="Select--" onChange={() => {}}>
                  <Option value="visa">Visa</Option>
                  <Option value="masterCard">MasterCard </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="card-quantity"
                label="Card Quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
              >
                <InputNumber
                  min={5}
                  max={100}
                  defaultValue=""
                  onChange={() => {}}
                  formatter={(value) =>
                    value < 5 ? (5).toString() : value.toString()
                  }
                  parser={(value) =>
                    parseInt(value, 10) < 5 ? 5 : parseInt(value, 10)
                  }
                />
              </Form.Item>
              <Form.Item
                name="load-amount"
                label="Load Amount"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="Select--" style={{ width: "48%" }}>
                  <Option value="25">25</Option>
                  <Option value="50">50 </Option>
                  <Option value="100">100 </Option>
                  <Option value="200">200 </Option>
                  <Option value="300">300 </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Broker Id"
                label="Broker Id"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="additional-purchases"
                valuePropName="checked"
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues["additional-purchases"] !==
                  currentValues["additional-purchases"]
                }
              >
                <Checkbox>
                  Will cards be used for more than one purchase?
                </Checkbox>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues["additional-purchases"] !==
                  currentValues["additional-purchases"]
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("additional-purchases") === true && (
                    <Form.Item name="additional-purchase-quantity" label="">
                      <InputNumber
                        min={1}
                        defaultValue={1}
                        onChange={() => {}}
                        style={{ width: "50%" }}
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>
              <Form.Item name="international-purchases" valuePropName="checked">
                <Checkbox>
                  Will cards be used to make international purchases?
                </Checkbox>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "60px",
                  marginLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <p>Cost Per Card</p>
                </div>
                <div>
                  <p>$2.98</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2px",
                  marginLeft: "5px",
                  fontWeight: "bold",
                }}
              >
                <div>
                  <p>Subtotal</p>
                </div>
                <div>
                  <p>{subTotal}</p>
                </div>
              </div>
              <Button className="buyNowBtn" htmlType="submit">
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BulkOrder;
