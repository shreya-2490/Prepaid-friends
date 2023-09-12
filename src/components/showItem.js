import React, { useState, useEffect } from "react"
import { Button, Col, Row, Modal, Divider } from "antd"
import wifi from "../assets/wifi1.png"
import map from "../assets/map1.png"
import master from "../assets/mastercard preowned.png"
import "../styles/showItem.css"
import NavbarLogo from "./Navbarlogo"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useCookies } from "react-cookie"

function ShowItem() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardDetails, setCardDetails] = useState([])
  const { orderId } = useParams()
  const [cookies] = useCookies(["pfAuthToken"])

  const handleCardClick = (card) => {
    setIsModalVisible(true)
    setSelectedCard(card)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setSelectedCard(null)
  }

  useEffect(() => {
    axios
      .get(`/api/order-items-api-list/${orderId}`, {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      .then((response) => {
        setCardDetails(response.data.items)
        console.log("API Response:", response.data)
      })
      .catch((error) => {
        console.error("Error fetching initial card details:", error)
      })
  }, [])

  return (
    <>
      <NavbarLogo />
      <div className="preloader-main">
        <h6 className="order-heading">Card Information</h6>
        <Divider />
        <Row className="mt-5" gutter={[24, 24]}>
          {cardDetails.map((item, index) => (
            <Col xs={24} md={6} key={index}>
              <div
                className="wrappercard"
                onClick={() => handleCardClick(item)}
              >
                <div>
                  <div className="card">
                    <img src={map} className="map-img" alt="map" />
                    <div className="top">
                      <h2 className="h2heading">CARDHOLDER</h2>
                      <h2 className="h2heading">{item.first_name}</h2>
                      <img src={wifi} alt="wifi" />
                    </div>

                    <div className="infos">
                      <section className="card-number">{item.card}</section>
                      <div className="bottom">
                        <aside className="infos--bottom">
                          <section>
                            <h2 className="h2heading">Expiry date</h2>
                            <h3 className="h3heading">{item.expiry}</h3>
                          </section>
                          <section>
                            <h2 className="h2heading">CVV</h2>
                            <h3 className="h3heading">{item.cvv}</h3>
                          </section>
                        </aside>
                        <aside>
                          <section></section>
                        </aside>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Card Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className="email-alert-box"
      >
        {selectedCard ? (
          <div className="alert-email">
            <table className="detail-table">
              <thead>
                <tr>
                  <th scope="col">Card</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">CVV</th>
                  <th scope="col">Card Amount</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Card Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Card">{selectedCard.card}</td>
                  <td data-label="Expiry">{selectedCard.expiry}</td>
                  <td data-label="CVV">{selectedCard.cvv}</td>
                  <td data-label="Card Amount">{selectedCard.card_amount}</td>
                  <td data-label="First Name">{selectedCard.first_name}</td>
                  <td data-label="Last Name">{selectedCard.last_name}</td>
                  <td data-label="Address">{selectedCard.address}</td>
                  <td data-label="Card Type">{selectedCard.card_type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading card details...</p>
        )}

        <div className="cart-modal-footer alert-btn">
          <Button className="ant-btn-default" onClick={handleModalClose}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ShowItem
