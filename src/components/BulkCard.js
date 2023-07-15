import React from "react"
import "./BulkCard.css"
import { Card } from "antd"
import Bulkorder from "./assets/BulkOrders.png"
const { Meta } = Card

function BulkCard() {
  return (
    <div>
      <section className="bulkcards">
        <div className="bulkcard-card1">
          <div style={{ display: "block" }}>
            <h4 className="heading">Effortless Bulk Prepaid Card Ordering</h4>
          </div>
          <div>
            <div className="bulk-card-desc">
              <div className="bulk-desc">
                <p className="bulk-content">
                  Easily manage and expedite your prepaid card acquisition
                  process by placing bulk orders. Whether you need cards for
                  corporate incentives, employee rewards, or customer
                  promotions, our platform offers a seamless solution. Enjoy the
                  convenience of a streamlined process, allowing you to
                  efficiently order prepaid cards in large quantities, saving
                  you time and effort. Simplify your card distribution and
                  empower your business with our bulk prepaid card ordering
                  capabilities.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="bulkcard-img">
          <img src={Bulkorder}></img>
        </div>
      </section>
    </div>
  )
}

export default BulkCard
