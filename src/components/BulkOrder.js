import React, { useContext, useEffect, useState } from "react"
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input"
import en from "react-phone-number-input/locale/en.json"
import "react-phone-number-input/style.css"
import NavbarCart from "./NavbarCart"
import "../styles/BulkOrder.css"
import { v4 as uuidV4 } from "uuid"
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Card,
  Checkbox,
  Skeleton,
  Divider,
  Menu,
  Radio,
  FormItemProps,
  Dropdown,
} from "antd"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { CartContext } from "./CartContext"
import { Helmet } from "react-helmet"
import axios from "axios"
import { DownOutlined } from "@ant-design/icons"
import MultiSelect from "../shared-components/multi-select"


const { Option } = Select

const BulkOrder = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  const { addToBulkCart } = useContext(CartContext)
  const [onFocuseInput, setOnFocuseInput] = useState("")
  const [phoneNumber, setPhoneNumber] = useState()
  const [country, setCountry] = useState("us")
  const [calculatedCharges, setCalculatedCharges] = useState(null)
  const [reCalculatingCharges, setReCalculatingCharges] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [checkedList, setCheckedList] = useState([])
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [selectedProviders, setSelectedProviders] = useState([])
  const [countryOptions, setCountryOptions] = useState([])

  const formItemLayout: FormItemProps['style'] = {
    display: 'inline-block',
    width: 'calc(50% - 8px)',
    marginLeft: '8px',
  };

  const handleBrokerIdChange = (e) => {
    const value = e.target.value
    if (["Knox", "Fionna", "Bobby"].includes(value)) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? visaNumbers : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  const handleAddToInvoice = () => {
    nav("/invoice")
  }
  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined)
      }}
    >
      <option value="US">US +1</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {country} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  )

  const handleSearch = (inputValue) => {
    const filteredOptions = countryOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filteredOptions;
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }))
        setCountryOptions(countries)
      })
      .catch((error) => {
        console.error("Error fetching countries:", error)
      })
  }, [])
  const pageTitle = "Bulk Order | Prepaid Friends"
  const pageDescription =
    "Purchase prepaid cards with BTC exchange at Prepaid Friends. Simplify your transactions by buying prepaid cards in bulk. Experience convenience and secure access to our prepaid card service"

  const visaNumbers = [
    { value: "Visa 455636", label: "Visa 455636" },
    { value: "Visa 462239", label: "Visa 462239" },
    { value: "Visa 464579", label: "Visa 464579" },
    { value: "Visa 423608", label: "Visa 423608" },
    { value: "Visa 489113", label: "Visa 489113" },
    { value: "Visa 492063", label: "Visa 492063" },
    { value: "Visa 453226", label: "Visa 453226" },
    { value: "Visa 491656", label: "Visa 491656" },
    { value: "Visa 452668", label: "Visa 452668" },
    { value: "Visa 491680", label: "Visa 491680" },
    { value: "Mastercard 511059", label: "Mastercard 511059" },
    { value: "Mastercard 511320", label: "Mastercard 511320" },
    { value: "Mastercard 517099", label: "Mastercard 517099" },
    { value: "Mastercard 517573", label: "Mastercard 517573" },
    { value: "Mastercard 517594", label: "Mastercard 517594" },
    { value: "Mastercard 518081", label: "Mastercard 518081" },
    { value: "Mastercard 518653", label: "Mastercard 518653" },
    { value: "Mastercard 520521", label: "Mastercard 520521" },
    { value: "Mastercard 521969", label: "Mastercard 521969" },
    { value: "Mastercard 522539", label: "Mastercard 522539" },
    { value: "Mastercard 523678", label: "Mastercard 523678" },
    { value: "Mastercard 524846", label: "Mastercard 524846" },
    { value: "Mastercard 535875", label: "Mastercard 535875" },
    { value: "Mastercard 536116", label: "Mastercard 536116" },
    { value: "Mastercard 536165", label: "Mastercard 536165" },
    { value: "Mastercard 536208", label: "Mastercard 536208" },
  ]

  const menu = (
    <Menu triggerSubMenuAction="click">
      <Menu.Item>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Select All
        </Checkbox>
      </Menu.Item>

      {visaNumbers.map((number) => (
        <Menu.Item key={number}>
          <Checkbox>{number}</Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <NavbarCart />
      <div className="bulk-main">
        <div className="bulk-division">
          <div className="bulk-div-2">
            <Form
              name="bulk-orders-form"
              form={form}
              layout="vertical"
              autoComplete="off"
              onValuesChange={(changedValues) => {
                console.log(changedValues)
                const quantity = form.getFieldValue("card-quantity") || 0
                const loadAmount = form.getFieldValue("load-amount") || 0
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0
                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                )
                const cardType = form.getFieldValue("card-type")

                if (
                  changedValues["card-quantity"] ||
                  changedValues["load-amount"] ||
                  changedValues["additional-purchase-quantity"] ||
                  changedValues["international-purchases"] ||
                  changedValues["card-type"]
                ) {
                  setReCalculatingCharges(true)
                  axios
                    .post("/api/order-calculation-api", {
                      order_type: "bulk",
                      items: [
                        {
                          cardType,
                          quantity,
                          amount: loadAmount,
                          additional_transactions: additionalPurchaseQt > 0,
                          additional_transactions_no: additionalPurchaseQt,
                          international_transaction:
                            isUsedForInternationalTransaction,
                        },
                      ],
                    })
                    ?.then((res) => setCalculatedCharges(res?.data))
                    ?.catch((err) => console.error(err))
                    ?.finally(() => setReCalculatingCharges(false))
                }
              }}
              style={{
                margin: "75px 20px 0px 20px",
              }}
              onFinish={(value) => {
                const quantity = form.getFieldValue("card-quantity") || 0
                const loadAmount = form.getFieldValue("load-amount") || 0
                const cardType = form.getFieldValue("card-type") || 0
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0

                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                )

                addToBulkCart({
                  id: uuidV4(),
                  quantity,
                  amount: loadAmount,
                  subTotal: calculatedCharges?.order_total || 0,
                  cardType,
                  additionalPurchaseQt,
                  isUsedForInternationalTransaction,
                })

                nav("/bulk-checkout", {
                  state: {
                    customerName: value["customer-name"] || "",
                    businessName: value["business-name"] || "",
                    address: value["address"] || "",
                    phoneNumber: value["phone-number"] || "",
                    brokerId: value["broker-id"] || "",
                  },
                })
              }}
            >
              <Form.Item
                name="first-name"
                label="First Name"
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                rules={[
                  {
                    required: true,
                    message: "First Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last-name"
                label="Last Name"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 8px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Last Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="business-name"
                label="Business Name"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                }}
                rules={[
                  {
                    required: true,
                    message: "Business Name is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                style={formItemLayout}
                rules={[
                  {
                    required: true,
                    message: "Country is required!",
                  },
                ]}
              >
                <Select
          options={countryOptions}
          placeholder="Select a country"
          isSearchable
          filterOption={(inputValue, option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
          }
        
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Street Address"
                rules={[
                  {
                    required: true,
                    message: "Address is required!",
                  },
                ]}
                
              >
                <Input style={{ marginBottom: "0.5rem" }} placeholder="House Number or Street Name"/>
                <Input placeholder="Optional" />
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item
                  name="city"
                  label="City"
                  style={{
                    display: "inline-block",
                    width: "calc(33% - 8px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "City is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="state"
                  label="State"
                  style={{
                    display: "inline-block",
                    width: "calc(34% - 8px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "State is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="zipcode"
                  label="Zip Code"
                  style={{
                    display: "inline-block",
                    width: "calc(33% - 8px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "State is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item
                name="phone-number"
                label="Phone Number"
                style={{
                  display: "inline-block",
                  width: "calc(56% - 5px)",
                }}
                rules={[
                  {
                    required: true,
                    message: "Phone number is required!",
                  },
                ]}
              >
                <span style={{ display: "flex" }}>
                  <CountrySelect
                    className={`border-b-2 bg-none outline-none w-1/4 text-xs countrycode ${
                      onFocuseInput === "country"
                        ? "border-blue-700 "
                        : "border-gray-300"
                    }`}
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    name="countrySelect"
                    onFocus={() => setOnFocuseInput("country")}
                  />
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    name="phoneNumber"
                    onFocus={() => setOnFocuseInput("phoneNumber")}
                  />
                </span>
              </Form.Item>
              <Form.Item
                name="email"
                label="Email Address"
                style={{
                  display: "inline-block",
                  width: "calc(43% - 8px)",
                  marginLeft: "16px",
                }}
                rules={[
                  {
                    required: true,
                    message: "Email Address is required!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Item
                  name="card-type"
                  label="Card Type"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  rules={[
                    {
                      required: true,
                      message: "Card type is required!",
                    },
                  ]}
                >
                  <Select defaultValue="visa-master" onChange={() => {}}>
                    <Option value="visa-master">Visa/MasterCard</Option>
                    <Option value="visa">Visa Only </Option>
                    <Option value="masterCard">MasterCard Only </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="card-quantity"
                  label="Card Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Card quantity is required!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                  }}
                >
                  <InputNumber
                    type="number"
                    width={50}
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
                    style={{ width: "100%", fontWeight: "400" }}
                  />
                </Form.Item>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item
                  name="load-amount"
                  label="Load Amount"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: "17px",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Load amount is required!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="broker-id"
                  label="Broker ID"
                  style={{ width: "50%" }}
                >
                  <Input onChange={handleBrokerIdChange} />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {showDropdown && (
                  <MultiSelect
                    key="providers"
                    placeholder="Select Providers"
                    options={visaNumbers}
                    onChange={(selected) => setSelectedProviders(selected)}
                    value={selectedProviders}
                    isSelectAll={true}
                    menuPlacement={"bottom"}
                    className="select-providers-dropdown"
                  />
                )}
                <Form.Item
                  name="international-purchases"
                  valuePropName="checked"
                  style={{ width: "calc(56% - 3rem)" }}
                >
                  <Checkbox>
                    Will cards be used to make international purchases?
                  </Checkbox>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="bulk-div-1">
            <Card className="bulkorder-content">
              <h4 style={{ marginBottom: "2rem" }}>Order Summary</h4>
              <p>Select Payment Method</p>

              <Radio.Group
                onChange={(e) => setSelectedPaymentMethod(e?.target?.value)}
                value={selectedPaymentMethod}
              >
                <Radio value={"wire"}>Wire Transfer</Radio>
                <Radio value={"btc"}>BTC</Radio>
              </Radio.Group>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                <p>Cost Per Card</p>
                {reCalculatingCharges ? (
                  <Skeleton.Button size="small" shape="square" active />
                ) : (
                  <p>
                    $
                    {(calculatedCharges?.items &&
                      calculatedCharges?.items[0]?.cost) ||
                      0}
                  </p>
                )}
              </div>
              {selectedPaymentMethod === "btc" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    marginLeft: "5px",
                    fontWeight: "600",
                  }}
                >
                  <p>BTC Exchange Fee:</p>
                </div>
              )}
              {selectedPaymentMethod === "wire" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                  >
                    <p>Wire Transfer Fee:</p>
                    <p>$15</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                  >
                    <p>Invoice Identifier Fee:</p>
                  </div>
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "5px",
                  fontWeight: "600",
                }}
              >
                <p>International Transaction Cost</p>
                {reCalculatingCharges ? (
                  <Skeleton.Button size="small" shape="square" active />
                ) : (
                  <p>
                    $
                    {(calculatedCharges?.items &&
                      calculatedCharges?.items[0]?.international_cost) ||
                      0}
                  </p>
                )}
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2px",
                  marginLeft: "5px",
                  fontWeight: "700",
                }}
              >
                <p>Total</p>
                {reCalculatingCharges ? (
                  <Skeleton.Button size="small" shape="square" active />
                ) : (
                  <p>${calculatedCharges?.order_total || 0}</p>
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <Checkbox>Agree terms & Conditions</Checkbox>
                <Button className="buy-usdt" onClick={handleAddToInvoice}>
                  Add to Invoice
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default BulkOrder
