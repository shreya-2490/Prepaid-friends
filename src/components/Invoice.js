import React from "react";
import "../styles/InvoiceCard.css";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { v4 } from "uuid";

const InvoiceCard = () => {
  const location = useLocation();
  const state = location?.state || {};
  const nav = useNavigate();

  const invoiceId = v4();

  return (
    <>
      <div className="invoice-container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="page-content container">
          <div className="page-header text-blue-d2">
            <h1 className="page-title text-secondary-d1">
              Invoice
              <small className="page-info">
                <i className="fa fa-angle-double-right text-80"></i>
                ID: #{invoiceId}
              </small>
            </h1>
            <div className="page-tools">
              <div className="action-buttons">
                <a
                  className="btn bg-white btn-light mx-1px text-95"
                  href="#"
                  data-title="Print"
                >
                  <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                  Print
                </a>
                <a
                  className="btn bg-white btn-light mx-1px text-95"
                  onClick={() => nav("/bulk-order")}
                  data-title="PDF"
                >
                  <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                  Edit Invoice
                </a>
              </div>
            </div>
          </div>
          <div className="container px-0">
            <div className="row mt-4">
              <div className="col-12 col-lg-12">
                <div className="row">
                  <div className="col-12">
                    <div className="text-center text-150">
                      <img src={logo}></img>
                    </div>
                  </div>
                </div>

                <hr className="row brc-default-l1 mx-n1 mb-4" />
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <span className="text-600 text-110 text-blue align-middle">
                        {state?.personalInfo["first-name"]}{" "}
                        {state?.personalInfo["last-name"]}
                      </span>
                    </div>
                    <div className="text-grey-m2">
                      <div className="my-1">
                        {" "}
                        {state?.personalInfo?.address},{" "}
                        {state?.personalInfo?.city}
                      </div>
                      <div className="my-1">
                        {state?.personalInfo?.state},{" "}
                        {state?.personalInfo?.country},
                        {state?.personalInfo?.zipcode}
                      </div>
                      <div className="my-1">
                        <i className="fa fa-phone fa-flip-horizontal text-secondary"></i>{" "}
                        <b className="text-600">
                          {state?.personalInfo["phone-number"]}
                        </b>
                      </div>
                      <div className="my-1">
                        <b className="text-600">{state?.personalInfo?.email}</b>
                      </div>
                    </div>
                  </div>

                  <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr className="d-sm-none" />
                    <div className="text-grey-m2">
                      <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Invoice
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">ID:</span> #
                        {invoiceId}
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">Issue Date:</span>{" "}
                        <span>{dayjs()?.format()}</span>
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                        <span className="text-600 text-90">BrokerID:</span>{" "}
                        <span>{state?.personalInfo["broker-id"]}</span>
                      </div>
                      <div className="my-2">
                        <i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
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
                  <div className="row text-600 text-white bgc-default-tp1 py-25">
                    <div className="d-none d-sm-block col-1">#</div>
                    <div className="col-9 col-sm-5">Description</div>
                    <div className="d-none d-sm-block col-4 col-sm-2">Qty</div>
                    <div className="d-none d-sm-block col-sm-2">Unit Price</div>
                    <div className="col-2">Amount</div>
                  </div>
                  <div className="text-95 text-secondary-d3">
                    <div className="row mb-2 mb-sm-0 py-25">
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
                        ${state?.charges?.items[0]?.subtotal}
                      </div>
                    </div>
                  </div>
                  <div className="row border-b-2 brc-default-l2"></div>

                  <div className="row mt-3">
                    <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                      Extra Notes
                    </div>
                    <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                      <div className="row my-2">
                        <div className="col-7 text-right">SubTotal</div>
                        <div className="col-5">
                          <span className="text-120 text-secondary-d1">
                            ${state?.charges?.order_subtotal}
                          </span>
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-7 text-right">Cost Per Card</div>
                        <div className="col-5">
                          <span className="text-110 text-secondary-d1">
                            {state?.charges?.items[0]?.quantity} x $
                            {state?.charges?.items[0]?.cost}
                          </span>
                        </div>
                      </div>
                      <div className="row my-2">
                        <div className="col-7 text-right">
                          International Transaction Fee
                        </div>
                        <div className="col-5">
                          <span className="text-110 text-secondary-d1">
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
                            <span className="text-110 text-secondary-d1">
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
                              <span className="text-110 text-secondary-d1">
                                ${state?.charges?.transaction_fee}
                              </span>
                            </div>
                          </div>
                          <div className="row my-2">
                            <div className="col-7 text-right">
                              Invoice Identifier Fee
                            </div>
                            <div className="col-5">
                              <span className="text-110 text-secondary-d1">
                                ${state?.charges?.invoice_identifier_fee}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                        <div className="col-7 text-right">Total Amount</div>
                        <div className="col-5">
                          <span className="text-150 text-success-d3 opacity-2">
                            ${state?.charges?.order_total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <span className="text-secondary-d1 text-105">
                      Thank you for your business
                    </span>
                    <a
                      href="#"
                      className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0"
                    >
                      Finalize Invoice
                    </a>
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
