import React, { useState } from "react"
import { Layout, Menu, Breadcrumb, Divider, Input, Space } from "antd"
import NavbarCart from "./NavbarCart"
import "../styles/dashboard.css"
import mastercard from "../assets/Mastercardcartpage.png"

const Dashboard = () => {
  const onSearch = (value) => console.log(value)
  const { Search } = Input
  const [product, setProduct] = useState(false)
  const handleChangeproduct = () => {
    setProduct(true)
  }
  return (
    <>
      <NavbarCart />
      <div className="product-div">
        <div className="listing-design">
          <ul>
            <li>Accounts</li>
            <Divider />
            <li onClick={handleChangeproduct}>My Products</li>
            <Divider />
            <li>Wishlists</li>
            <Divider />
            <li>Limits</li>
            <Divider />
            <li>Settings</li>
            <Divider />
            <li>Sign Out</li>
            <Divider />
          </ul>
        </div>
        <div className="searchbox-div">
          {product ? (
            <>
              <div>
                <h2>My Products</h2>
                <img src={mastercard} className="product-image"></img>
                <div style={{ marginTop: "30px" }}>
                  {" "}
                  <h6 style={{ fontWeight: "bold" }}>Prepaid MasterCard</h6>
                  <p>$0.00</p>
                </div>
                <h6 style={{ fontWeight: "bold" }}>Used Product</h6>
              </div>
            </>
          ) : (
            ""
          )}
          
              </div>
              <div style={{textAlign:"right"}}>
            {" "}
            <Space direction="vertical">
              <Search
                placeholder="Filter Products"
                onSearch={onSearch}
                style={{
                  width: 200,
                  borderRadius: "20px",
                }}
              />
            </Space>
          </div>
      </div>
    </>
  )
}

export default Dashboard
