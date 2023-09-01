import React from "react"
import "../styles/InvoiceCard.css"
import logo from "../assets/logo.png"
import invoice from "../assets/invoice.svg"

const InvoiceCard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="invoice-title">
                <h4 className="float-end font-size-15">
                  Invoice #DS0204
                  <span
                    className="badge font-size-12 ms-2"
                    style={{ backgroundColor: "#fdc886" }}
                  >
                    Unpaid
                  </span>
                </h4>
                <div className="mb-4">
                  <img src={logo} className="w-25" alt="Invoice Logo" />
                </div>
                <div className="text-muted">
                  <p className="mb-1">3079 Harrison Ave #10</p>
                  <p className="mb-1">South Lake Tahoe, CA</p>
                  <p>
                    <i className="uil uil-phone me-1"></i> 96150
                  </p>
                </div>
                          </div>
                          <hr className="my-4" />
              <td
                className="invoice-title h-50"
                style={{ backgroundColor: "#fdc886", borderRadius: "12px" }}
              >
                <div width="100%" cellpadding="0" cellspacing="0">
                  
                    <div
                      className="mb-4"
                      style={{ height: "10rem", margin: "auto" , width:"58rem"}}
                    >
                      <img
                        src={invoice}
                        className="pt-5 invoice-img"
                      alt="Invoice Logo"
                      
                      />
                    </div>
                  
                
                </div>
              </td>
              <hr className="my-4" />

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%">
                    <h5 className="font-size-16 mb-3"><b>Billed To:</b></h5>
                    <h5 className="font-size-10 mb-2"><b>Customer Name</b></h5>
                    <p className="font-size-15 mb-2">Suman Dutta</p>
                    <h5 className="font-size-10 mb-2"><b>Business Name</b></h5>
                    <p className="font-size-15 mb-2">Suman D</p>
                    <h5 className="font-size-10 mb-2"><b>Email Address</b></h5>
                    <p className="font-size-15 mb-2">
                      suman@digitallydrunk.com
                    </p>
                  </td>
                  <td width="50%" align="right">
                    <h5 className="font-size-15 mb-1"><b>Invoice ID:</b></h5>
                    <p>#DZ0112</p>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1"><b>Invoice Date:</b></h5>
                      <p>12 Oct, 2023</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1"><b>Due Date:</b></h5>
                      <p>17 Oct, 2023 </p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-size-15 mb-1"><b>Amount Due(USD)</b></h5>
                      <p style={{ color: "#1b1b1b", fontSize: "1.6rem" }}>
                        <strong>$203.4</strong>
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
              <h5 className="font-size-15">Order Summary</h5>
              <table className="table align-middle table-nowrap table-centered mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "70px" }}>No.</th>
                    <th>Item Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th className="text-end" style={{ width: "120px" }}>
                      SubTotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">01</th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14 mb-1">
                          BulkCard
                        </h5>
                      </div>
                    </td>
                    <td>$ 31.00</td>
                    <td>2</td>
                    <td className="text-end">$ 62.00</td>
                  </tr>
                  {/* Add more table rows as needed */}
                </tbody>
              </table>
              <hr className="my-4" />

              <div className="py-2">
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-centered mb-0">
                    {/* Your table content here */}
                  </table>
                </div>
                <table className="d-print-none mt-4 float-end">
                  <tr>
                    <td>
                      <a
                        href="javascript:window.print()"
                        className="btn btn-success me-1"
                      >
                        <i className="fa fa-print"></i> Send Invoice to Email
                      </a>
                    </td>
                  </tr>
                </table>
                <h6
                  style={{
                    textAlign: "center",
                    paddingTop: "6rem",
                    paddingBottom: "1rem",
                    fontWeight: 600,
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  *Estimated Delivery Date: Next Business Day 5:00pm PST
                </h6>
              </div>
              <hr style={{ marginTop: "1rem" }} />
              <div
                style={{
                  color: "#fdc886",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "x-large",
                  paddingTop: "2rem",
                }}
              >
                <p style={{ color: "#fdc886" }}>THIS IS AN UNPAID INVOICE</p>
                <p style={{ color: "#1b1b1b", fontSize: "medium" }}>
                  Please use the following wiring instructions to complete
                  payment:
                </p>
                <p
                  style={{
                    color: "#1b1b1b",
                    fontSize: "small",
                    fontWeight: 400,
                  }}
                >
                  Sandy Spring Bank
                  <br />
                  PAYABLE TO CB SURETY LLC <br />
                  Account # 1714747101 <br />
                  ABA Routing # 055001096
                  <br />
                  MEMO: Sale Proceeds
                </p>
                <p
                  style={{
                    color: "#1b1b1b",
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  Once payment is received, virtual cards will be sent to the
                  email provided at checkout with instructions on how to load
                  the cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceCard
