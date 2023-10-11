import React, { useState } from "react";
import "../styles/InvoiceCard.css";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";

const InvoiceCard = () => {
  const location = useLocation();
  const state = location?.state || {};
  const nav = useNavigate();
  const [isSubmittingInvoice, setIsSubmittingInvoice] = useState(false);
  const [cookies] = useCookies(["pfAuthToken"]);

  const invoiceId = v4()?.slice(0, 8);

  function handlePrintClick() {
    window.print();
  }
  const totalamt =
    state?.charges?.items[0]?.quantity * state?.charges?.items[0]?.amount;

  const handleFinalizeInvoice = (e) => {
    e?.preventDefault();
    setIsSubmittingInvoice(true);
    const { personalInfo, selectedProviders, selectedPaymentMethod } = state;
    axios
      ?.post(
        "/api/save-bulk-order-api",
        {
          first_name: personalInfo["first-name"],
          last_name: personalInfo["last-name"],
          address: personalInfo?.address,
          city: personalInfo?.city,
          state: personalInfo?.state,
          zip: personalInfo?.zipcode,
          country: personalInfo?.country,
          phone_no: personalInfo["phone-number"],
          broker_id: personalInfo["broker-id"],
          bin_order: selectedProviders?.map((provider) => provider?.value),
          business_name: personalInfo["business-name"],
          email: personalInfo?.email,
          payment_method: selectedPaymentMethod,
          guest: cookies?.pfAuthToken ? false : true,
          items: [
            {
              cardType: personalInfo["card-type"],
              quantity: personalInfo["card-quantity"],
              amount: personalInfo["load-amount"],
              additional_transactions: false,
              additional_transactions_no: 0,
              international_transaction:
                personalInfo["international-purchases"],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.pfAuthToken}`,
          },
        }
      )
      ?.then((res) =>
        message?.success("Invoice has been sent to your email address")
      )
      ?.catch((err) => message?.error(err?.response?.data?.error))
      ?.finally(() => setIsSubmittingInvoice(false));
  };

  return (
    <>
      <div className="invoice-container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="page-content container">
          <div className="page-header text-blue-d2">
            <h1 className="page-title">
              <small className="page-info">
                Prepaid Friends
                <br />
                3079 Harrison Ave #10
                <br />
                South Lake Tahoe, CA 96150
              </small>
            </h1>
            <div className="page-tools">
              <div className="action-buttons">
                <a
                  className="btn bg-white btn-light mx-1px text-95"
                  href="#"
                  data-title="Print"
                  onClick={handlePrintClick}
                >
                  <i className="mr-1 fa fa-print text-danger text-120 w-2"></i>
                  Print
                </a>
                <a
                  className="btn bg-white btn-light mx-1px text-95 edit"
                  onClick={() => nav("/bulk-order", { state })}
                  data-title="PDF"
                >
                  <i className="mr-1 fa fa-pencil text-success text-120 w-2"></i>
                  Edit Invoice
                </a>
                <Button
                  href="#"
                  className="btn btn-bold px-4 float-right mt-3 mt-lg-0 invoice-btn-upper"
                  onClick={handleFinalizeInvoice}
                  disabled={isSubmittingInvoice}
                  loading={isSubmittingInvoice}
                >
                  Finalize Invoice
                </Button>
              </div>
            </div>
          </div>
          <div className="container px-0">
            <div className="row mt-4">
              <div className="col-12 col-lg-12">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center text-120 mb-4">
                      <img src={logo}></img>
                    </div>
                  </div>
                </div>

                <p style={{ borderBottom: "1px dotted #e2e2e2" }} />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                      Billed To
                    </h6>
                    <div>
                      <span className="text-600 text-110 align-middle py-2">
                        {state?.personalInfo["first-name"]}{" "}
                        {state?.personalInfo["last-name"]}
                      </span>
                    </div>
                    <div>
                      <div className="my-1 py-1">
                        <i className="fa fa-map-marker text-secondary"></i>{" "}
                        {state?.personalInfo?.address},&nbsp;
                        {state?.personalInfo?.city},&nbsp;
                        {state?.personalInfo?.state},&nbsp;
                        {state?.personalInfo?.country},&nbsp;
                        {state?.personalInfo?.zipcode}
                      </div>
                      <div className="my-2 state"></div>
                      <div className="my-1 py-1">
                        <i className="fa fa-phone fa-flip-horizontal text-secondary"></i>{" "}
                        {state?.personalInfo["phone-number"]}
                      </div>
                      <div className="my-1 py-1">
                        <i className="fa fa-envelope text-secondary"></i>{" "}
                        <span>{state?.personalInfo?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr className="d-sm-none" />
                    <div>
                      <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Invoice
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">ID:</span> #
                        {invoiceId}
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">Issue Date:</span>{" "}
                        <span>{dayjs()?.format()}</span>
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">Card Type:</span>{" "}
                        <span>{state?.personalInfo["card-type"]}</span>
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">Broker ID:</span>{" "}
                        <span>{state?.personalInfo["broker-id"]}</span>
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle  text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">BIN:</span>{" "}
                        <span>
                          {state?.selectedProviders?.map(
                            (provider) => `${provider?.label}, `
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="row text-600  bgc-default-tp1 py-25">
                    <div className="d-none d-sm-block col-1">#</div>
                    <div className="col-9 col-sm-5">Description</div>
                    <div className="d-none d-sm-block col-4 col-sm-2">Qty</div>
                    <div className="d-none d-sm-block col-sm-2">Unit Price</div>
                    <div className="col-2">Amount</div>
                  </div>
                  <div className="text-95 text-secondary-d3">
                    <div className="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                      <div className="d-none d-sm-block col-1">1</div>
                      <div className="col-9 col-sm-5">Prepaid Card</div>
                      <div className="d-none d-sm-block col-2">
                        {state?.charges?.items[0]?.quantity}
                      </div>
                      <div className="d-none d-sm-block col-2 text-95">
                        ${state?.charges?.items[0]?.amount}
                      </div>
                      <div className="col-2 text-secondary-d2">
                        {" "}
                        ${totalamt}
                      </div>
                    </div>
                  </div>
                  <div className="row border-b-2 brc-default-l2"></div>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0 extra-notes">
                      <span>Extra Notes:</span>
                      <br />
                      <Input.TextArea
                        className="notes"
                        style={{ width: "300px", height: "150px" }}
                        name="notes"
                        value={state?.notes}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                      <div className="row my-2">
                        <div className="col-7 text-right text">SubTotal</div>
                        <div className="col-5">
                          <span className="text-110 ">
                            ${state?.charges?.order_subtotal}
                          </span>
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-7 text-right">Cost Per Card</div>
                        <div className="col-5">
                          <span className="text-110">
                            ${state?.costpercardResult.toFixed(3)}
                          </span>
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-7 text-right">
                          International Transaction Fee
                        </div>
                        <div className="col-5">
                          <span className="text-110">
                            ${state?.charges?.items[0]?.international_cost}
                          </span>
                        </div>
                      </div>
                      {state?.selectedPaymentMethod === "btc" && (
                        <div className="row my-2">
                          <div className="col-7 text-right">
                            BTC Exchange Fee
                          </div>
                          <div className="col-5">
                            <span className="text-110">
                              ${state?.charges?.transaction_fee}
                            </span>
                          </div>
                        </div>
                      )}
                      {state?.selectedPaymentMethod === "wire" && (
                        <>
                          <div className="row my-2">
                            <div className="col-7 text-right">
                              Wire Transfer Fee
                            </div>
                            <div className="col-5">
                              <span className="text-110 ">
                                ${state?.charges?.transaction_fee}
                              </span>
                            </div>
                          </div>
                          <div className="row my-2">
                            <div className="col-7 text-right">
                              Invoice Identifier Fee
                            </div>
                            <div className="col-5">
                              <span className="text-110">
                                ${state?.charges?.invoice_identifier_fee}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="row my-2 align-items-center bgc-primary-l3">
                        <div className="col-7 text-right total-amt">
                          Total Amount
                        </div>
                        <div className="col-5">
                          <span className="text-success-d3 total-amt">
                            ${state?.charges?.order_total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <p className="text-secondary-d1 text-105 thankyou-for-business">
                    Thank you for your business
                  </p>
                  <div className="finalize-invoice-div">
                    <Button
                      href="#"
                      className="btn btn-bold px-4 float-right mt-3 mt-lg-0 invoice-btn"
                      onClick={handleFinalizeInvoice}
                      disabled={isSubmittingInvoice}
                      loading={isSubmittingInvoice}
                    >
                      Finalize Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceCard;
