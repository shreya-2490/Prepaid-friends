import React, { useState, useEffect } from "react"
import NavbarCart from "./NavbarCart"
import "../styles/BulkOrder.css"
import success from "../assets/Success Icon.png"
import tick from "../assets/tick-circle.png"
import cards from "../assets/Bank Cards.png"
import ellipse from "../assets/Ellipse.png"

import {
  Button,
  Form,
  Input,
  Space,
  InputNumber,
  Select,
  Radio,
  Card,
  Checkbox,
} from "antd"
import Footer from "./Footer"
import zIndex from "@mui/material/styles/zIndex"
const { Option } = Select

const BulkOrder = () => {
  const [form] = Form.useForm()
  const [subTotal, setSubTotal] = useState(0)
  const [additionalTransactionsVisible, setAdditionalTransactionsVisible] =
    useState(false)

  useEffect(() => {
    form.setFieldsValue({
      SubTotal: parseFloat(subTotal).toFixed(2),
    })
  }, [subTotal])

  const handleLoadAmountChange = (value) => {
    const cardQuantity = form.getFieldValue("Card Quantity")
    const calculatedLoadAmount = value

    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        cardQuantity,
        calculatedLoadAmount,
        form.getFieldValue("Will cards be used for more than one purchase?"),
        form.getFieldValue(
          "Will cards be used to make international purchases?"
        )
      ),
    })
  }

  const handleNumberChange = (value) => {
    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        value,
        form.getFieldValue("Load Amount"),
        form.getFieldValue("Will cards be used for more than one purchase?"),
        form.getFieldValue(
          "Will cards be used to make international purchases?"
        )
      ),
    })
  }

  const handleAddMultipleTransactionsChange = (e) => {
    const isChecked = e.target.checked
    setAdditionalTransactionsVisible(isChecked)

    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        form.getFieldValue("Card Quantity"),
        form.getFieldValue("Load Amount"),
        e.target.value,
        isChecked,
        form.getFieldValue(
          "Will cards be used to make international purchases?"
        ),
        form.getFieldValue("additionalTransactions")
      ),
    })
  }

  const handleAdditionalTransactionsChange = (value) => {
    form.setFieldsValue({
      SubTotal: calculateSubTotal(
        form.getFieldValue("Card Quantity"),
        form.getFieldValue("Load Amount"),
        form.getFieldValue("Will cards be used for more than one purchase?"),
        form.getFieldValue(
          "Will cards be used to make international purchases?"
        ),
        value
      ),
    })
  }

  const handleSelectChange = (value) => {
    console.log(value)
  }

  const calculateSubTotal = (
    cardQuantity,
    loadAmount,
    addMultipleTransactions = false,
    allowInternationalTransactions = false,
    additionalTransactions = 1 // Default value is 1 if not provided
  ) => {
    const costPerCard = 2.98
    const additionalValue = 5 // Value to be added/subtracted when the checkbox is checked/unchecked
    const internationalFee = 8 // International fee to be added when the checkbox is checked
    let parsedCardQuantity = parseFloat(cardQuantity)
    if (isNaN(parsedCardQuantity)) {
      parsedCardQuantity = 0
    }

    // Calculate the additional transaction amount
    const additionalTransactionAmount = addMultipleTransactions
      ? additionalValue * additionalTransactions
      : 0

    let sum =
      parsedCardQuantity * costPerCard +
      parseFloat(loadAmount) * parsedCardQuantity +
      additionalTransactionAmount

    if (allowInternationalTransactions) {
      sum += internationalFee
    }

    setSubTotal(sum.toFixed(2))
    return sum.toFixed(2)
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const {
        CardType,
        "Card Quantity": CardQuantity,
        "Load Amount": LoadAmount,
        "Will cards be used for more than one purchase?":
          AddMultipleTransactions,
        "Will cards be used to make international purchases?":
          AllowInternationalTransactions,
      } = values
      const subtotal = calculateSubTotal(
        CardQuantity,
        LoadAmount,
        AddMultipleTransactions,
        AllowInternationalTransactions
      )
      const queryParams = `?cardType=${CardType}&cardQuantity=${CardQuantity}&loadAmount=${LoadAmount}&multipletransaction=${AddMultipleTransactions}&internationaltransaction=${AllowInternationalTransactions}&subtotal=${subtotal}`
      window.location.href = `/checkout${queryParams}`
    })
  }

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
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{
                margin: "75px 20px 0px 20px",
                width: "100%",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Form.Item name="Customer's Name" label="Customer's Name">
                <Input />
              </Form.Item>
              <Form.Item
                name="Business Name"
                label="Business Name"
                style={{ margin: "0px 20px", width: "61%" }}
              >
                <Input />
              </Form.Item>
            </Form>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ margin: "0px 20px" }}
            >
              <Form.Item name="Address" label="Address">
                <Input />
              </Form.Item>
            </Form>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{ margin: "20px" }}
            >
              <Form.Item name="Phone" label="Phone">
                <Input />
              </Form.Item>
            </Form>
            <Form
              form={form}
              layout="vertical"
              autoComplete="off"
              style={{
                margin: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="CardType"
                label="Card Type"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="Select--" onChange={handleSelectChange}>
                  <Option value="card1">Visa</Option>
                  <Option value="card2">MasterCard </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Card Quantity"
                label="Card Quantity"
                style={{ marginLeft: "20px", width: "100%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleNumberChange}
                    style={{ width: "100%" }}
                  />
                </Space>
              </Form.Item>
            </Form>
            <Form
              form={form}
              layout="vertical"
              style={{
                margin: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="Load Amount"
                label="Load Amount"
                style={{ width: "50%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  defaultValue="Select--"
                  onChange={handleLoadAmountChange}
                  style={{ width: "100%" }}
                >
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
                style={{ marginLeft: "20px", width: "50%" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleNumberChange}
                    style={{ width: "100%" }}
                  />
                </Space>
              </Form.Item>
              </Form>
              <Form layout="vertical" style={{ margin: "20px 20px" }}>
                <Form.Item
                  name="disabled"
                  valuePropName="checked"
                  onChange={handleAddMultipleTransactionsChange}
                >
                  <Checkbox>
                    Will cards be used for more than one purchase?
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  name="additionalTransactions"
                  label="Number of additional transactions per card:"
                  style={{
                    display: additionalTransactionsVisible ? "block" : "none",
                  }}
                >
                  <Form.Item
                    noStyle // Hide label
                    name="additionalTransactions"
                    rules={[{ required: additionalTransactionsVisible }]}
                  >
                    <InputNumber
                      min={1}
                      defaultValue={1}
                      onChange={handleAdditionalTransactionsChange}
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                </Form.Item>
                <Form />
                <Form>
                  <Form.Item
                    name="disabled"
                    valuePropName="checked"
                    onChange={handleAddMultipleTransactionsChange}
                  >
                    <Checkbox>
                      Will cards be used to make international purchases?
                    </Checkbox>
                  </Form.Item>
                </Form>
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
                  <p>{subTotal.toString()}</p>
                </div>
              </div>
              <Button
                className="buyNowBtn"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Buy Now
              </Button>
            </Form>
          </div>
        </div>
        {/* <div className="bulk-div-2">
          <div>
            <h1 style={{ textAlign: "center", fontSize: "36px" }}>
              Prepaid Card Bulk Order Form
            </h1>
            <Form
              style={{ margin: "20px" }}
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              initialValues={{
                SubTotal: subTotal.toString(),
              }}
            >
              <Form.Item
                name="CardType";
                label="Card Type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select defaultValue="Select--" onChange={handleSelectChange}>
                  <Option value="card1">Visa</Option>
                  <Option value="card2">MasterCard </Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="Card Quantity"
                label="Card Quantity"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleNumberChange}
                    style={{ width: "275%" }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="Cost per Card"
                label="Cost per Card"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input placeholder="$2.98" disabled={true} />
              </Form.Item>
              <Form.Item
                name="Load Amount"
                label="Load Amount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Space>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue=""
                    onChange={handleLoadAmountChange}
                    style={{ width: "275%" }}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="Will cards be used for more than one purchase?"
                label="Will cards be used for more than one purchase?"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onChange={handleAddMultipleTransactionsChange}
                >
                  <Radio value="Yes"> Yes </Radio>
                  <Radio value="No"> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="Will cards be used to make international purchases?"
                label="Will cards be used to make international purchases?"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onChange={handleAllowInternationalTransactionsChange}
                >
                  <Radio value="Yes"> Yes </Radio>
                  <Radio value="No"> No </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="SubTotal"
                label="SubTotal"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input value={subTotal.toString()} readOnly />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "3px",
                  margin: "5px",
                  textAlign: "center",
                }}
                onClick={handleSubmit}
              >
                Buy Now
              </Button>
            </Form>
          </div>
        </div>   */}
      </div>
      <Footer  />
    </>
  )
}
export default BulkOrder
