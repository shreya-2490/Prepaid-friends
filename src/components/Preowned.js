import React, { useState, useEffect } from "react"
import axios from "axios"
import NavbarCart from "./NavbarCart"
import Footer from "./Footer"
import "../styles/preowned.css"
import { Button } from "antd"

function Preowned({ selectedProvider, selectedPrice }) {
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    axios
      .get("/get-card-with-type")
      .then((response) => {
        setCardData(response.data.cards)
      })
      .catch((error) => {
        console.error("Error fetching card data:", error)
      })
  }, [])

  const filterCardData = () => {
    let filteredData = [...cardData]

    if (selectedProvider !== "All") {
      filteredData = filteredData.filter(
        (card) => card.type === selectedProvider
      )
    }

    if (selectedPrice === "low") {
      filteredData.sort((a, b) => a.price - b.price)
    } else {
      filteredData.sort((a, b) => b.price - a.price)
    }

    return filteredData
  }

  const filteredData = filterCardData()
  return (
    <>
      <NavbarCart />
      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map((card) => (
            <div class="wrappercard">
              <div class="container" key={card.id}>
                <div class="card">
                  <img src="https://i.ibb.co/PYss3yv/map.png" class="map-img" />
                  <div class="top">
                    <h2 className="h2heading">CARDHOLDER</h2>
                    <h2 className="h2heading">
                      <b>${`${card.price}`}</b>
                    </h2>
                    <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
                  </div>

                  <div class="infos">
                    <section class="card-number">
                      <h1 className="h1heading">{`**** **** **** ${card.card}`}</h1>
                    </section>
                    <div class="bottom">
                      <aside class="infos--bottom">
                        <section>
                          <h2 className="h2heading">Expiry date</h2>
                          <h3 className="h3heading">00/00</h3>
                        </section>
                        <section>
                          <h2 className="h2heading">CVV</h2>
                          <h3 className="h3heading">***</h3>
                        </section>
                      </aside>
                      <aside>
                        <section>
                          {`${card.type}` === "visa" ? (
                            <img
                              src="https://i.ibb.co/WHZ3nRJ/visa.png"
                              class="brand"
                            />
                          ) : (
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/320px-MasterCard_logo.png"
                              class="brand1"
                            />
                          )}
                        </section>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
              <Button>Add To Cart</Button>
            </div>
          ))
        ) : (
          <div>No card data available</div>
        )}
      </div>
      <Footer />
    </>
  )
}
export default Preowned
