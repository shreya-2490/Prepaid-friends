import React from "react"
import "./offers.css"
import Bulkorders from "./assets/Bulk-Orders.png"

function Offers() {
  return (
    <div className="offer-main-div">
      <section className="offer-blue-box">
        <div className="bulkorder-divs">
          <div className="offer-content">
            <h1 className="offer-heading">Transparent from Start to Finish</h1>
            <div className="offer-content-list">
              <ul>
                <li>Flat rate card fee of $2.98 per card.</li>
                <li>Simple checkout process using Bitcoin Wallet.</li>
                <li>
                  Receive card details instantly, once BTC payment is verified.
                </li>
                <li>Use anywhere major credit cards are accepted.</li>
              </ul>
            </div>
          </div>
          <div className="bulk-order-image">
            <img src={Bulkorders}></img>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Offers
