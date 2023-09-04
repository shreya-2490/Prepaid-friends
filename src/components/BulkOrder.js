import React, { useContext, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import NavbarCart from "./NavbarCart";
import "../styles/BulkOrder.css";
import { v4 as uuidV4 } from "uuid";
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
  Radio,
  FormItemProps,
  Switch,
} from "antd";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { Helmet } from "react-helmet";
import axios from "axios";
import MultiSelect from "../shared-components/multi-select";
import { Country, State } from "country-state-city";

const { Option } = Select;

const BulkOrder = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const { addToBulkCart } = useContext(CartContext);
  const [onFocuseInput, setOnFocuseInput] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [calculatedCharges, setCalculatedCharges] = useState(null);
  const [reCalculatingCharges, setReCalculatingCharges] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stateOfCountry, setStateOfCountry] = useState([]);

  const formItemLayout: FormItemProps["style"] = {
    display: "inline-block",
    width: "calc(50% - 5px)",
  };

  const handleBrokerIdChange = (e) => {
    const value = e.target.value;
    if (
      ["Knox", "Fionna", "Bobby", "knox", "fionna", "bobby"].includes(value)
    ) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleAddToInvoice = () => {
    nav("/invoice");
  };

  const pageTitle = "Bulk Order | Prepaid Friends";
  const pageDescription =
    "Purchase prepaid cards with BTC exchange at Prepaid Friends. Simplify your transactions by buying prepaid cards in bulk. Experience convenience and secure access to our prepaid card service";

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
  ];

  const countries = Country?.getAllCountries();

  useEffect(() => {
    const stateOfCountry = State?.getStatesOfCountry(selectedCountry)?.map(
      (state) => ({ value: state?.isoCode, label: state?.name })
    );
    setStateOfCountry(stateOfCountry);
  }, [selectedCountry]);

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
            <h4
              style={{
                fontWeight: "600",
                marginTop: "2rem",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Bulk Prepaid Card Order Form
            </h4>
            <Form
              name="bulk-orders-form"
              form={form}
              layout="vertical"
              autoComplete="off"
              onValuesChange={(changedValues, allValues) => {
                const quantity = form.getFieldValue("card-quantity") || 0;
                const loadAmount = form.getFieldValue("load-amount") || 0;
                const additionalPurchaseQt =
                  form.getFieldValue("additional-purchase-quantity") || 0;
                const isUsedForInternationalTransaction = form.getFieldValue(
                  "international-purchases"
                );
                const cardType = form.getFieldValue("card-type");

                if (
                  changedValues["card-quantity"] ||
                  changedValues["load-amount"] ||
                  changedValues["additional-purchase-quantity"] ||
                  changedValues["international-purchases"] ||
                  changedValues["card-type"]
                ) {
                  setReCalculatingCharges(true);
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
                    ?.finally(() => setReCalculatingCharges(false));
                }
              }}
              style={{
                margin: "75px 20px 0px 20px",
              }}
              onFinish={(value) => {
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
                  subTotal: calculatedCharges?.order_total || 0,
                  cardType,
                  additionalPurchaseQt,
                  isUsedForInternationalTransaction,
                });

                nav("/bulk-checkout", {
                  state: {
                    customerName: value["customer-name"] || "",
                    businessName: value["business-name"] || "",
                    address: value["address"] || "",
                    phoneNumber: value["phone-number"] || "",
                    brokerId: value["broker-id"] || "",
                  },
                });
              }}
            >
              <div style={{ marginBottom: "1.4rem" }}>
                <h6 style={{ fontWeight: "600", marginBottom: "0.8rem" }}>
                  Contact{" "}
                </h6>
                <Form.Item
                  name="email"
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 5px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Email Address is required!",
                    },
                  ]}
                >
                  <Input placeholder="Email Address" />
                </Form.Item>
                <Divider />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <h6 style={{ fontWeight: "600", marginBottom: "0.8rem" }}>
                  Card Purchase Details
                </h6>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Item
                    name="card-type"
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
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
                    rules={[
                      {
                        required: true,
                        message: "Card quantity is required!",
                      },
                    ]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 1px)",
                    }}
                  >
                    <InputNumber
                      placeholder="Card Quantity"
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
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      marginRight: "10px ",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Load amount is required!",
                      },
                    ]}
                  >
                    <Input placeholder="Load Amount" />
                  </Form.Item>
                  <Form.Item name="broker-id" style={{ width: "50%" }}>
                    <Input
                      onChange={handleBrokerIdChange}
                      placeholder="Broker ID"
                    />
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
                    <span style={{ marginRight: "1rem" }}>
                      Allow international purchases?
                    </span>
                    <Switch
                      defaultChecked={false}
                      style={{ backgroundColor: "#fdc886" }}
                    />
                  </Form.Item>
                </div>
                <Divider />
              </div>
              <div>
                <h6 style={{ fontWeight: "600", marginBottom: "1.4rem" }}>
                  Business Address
                </h6>
                <Form.Item
                  name="first-name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: "10px",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "First Name is required!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name="last-name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 5px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Last Name is required!",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  name="business-name"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: "10px",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Business Name is required!",
                    },
                  ]}
                >
                  <Input placeholder="Business Name" />
                </Form.Item>
                <Form.Item
                  name="country"
                  style={formItemLayout}
                  rules={[
                    {
                      required: true,
                      message: "Country is required!",
                    },
                  ]}
                >
                  <Select
                    options={countries?.map((country) => ({
                      value: country?.isoCode,
                      label: country?.name,
                    }))}
                    value={selectedCountry}
                    onChange={(val) => setSelectedCountry(val)}
                    placeholder="Select a country"
                    isSearchable
                    filterOption={(inputValue, option) =>
                      option.label
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Address is required!",
                    },
                  ]}
                >
                  <Input
                    style={{ marginBottom: "0.5rem" }}
                    placeholder="House Number or Street Name"
                  />
                  <Input
                    placeholder="Optional"
                    style={{ marginTop: "0.5rem" }}
                  />
                </Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Item
                    name="city"
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
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    name="state"
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
                    <Select placeholder="State" options={stateOfCountry} />
                  </Form.Item>
                  <Form.Item
                    name="zipcode"
                    style={{
                      display: "inline-block",
                      width: "calc(33% - 8px)",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Zip code is required!",
                      },
                    ]}
                  >
                    <Input placeholder="ZIP code" />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phone-number"
                  style={{
                    display: "inline-block",
                    width: "calc(100% - 2px)",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Phone number is required!",
                    },
                  ]}
                >
                  <span style={{ display: "flex" }}>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(event) => {
                        const numericValue = event.target.value.replace(
                          /\D/g,
                          ""
                        );
                        const limitedValue = numericValue.slice(0, 10);
                        setPhoneNumber(limitedValue);
                      }}
                      name="phoneNumber"
                      onFocus={() => setOnFocuseInput("phoneNumber")}
                    />
                  </span>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="bulk-div-1">
            <Card className="bulkorder-content">
              <p style={{ fontWeight: "600", fontSize: "1rem" }}>
                Select Payment Method
              </p>

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
              <Divider />
              {selectedPaymentMethod === "btc" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.5rem",
                    marginLeft: "5px",
                    fontWeight: "600",
                  }}
                >
                  <p>BTC Exchange Fee:</p>
                </div>
              )}
              <Divider />
              {selectedPaymentMethod === "wire" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                  >
                    <p>Wire Transfer Fee:</p>

                    <p>$15</p>
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      marginLeft: "5px",
                      fontWeight: "600",
                    }}
                  >
                    <p>Invoice Identifier Fee:</p>
                  </div>
                  <Divider />
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "5px",
                  fontWeight: "600",
                  marginTop: "0.5rem",
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
                  marginTop: "6px",
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
              <div>
                <Checkbox>Agree terms & Conditions</Checkbox>
                <Button
                  className="buy-usdt"
                  onClick={handleAddToInvoice}
                  style={{ textAlign: "center" }}
                >
                  Add to Invoice
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BulkOrder;
