import React, { useEffect, useState } from "react"
import { Button, Table } from "antd"
import axios from "axios"
import { useCookies } from "react-cookie"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

const OrderTable = () => {
  const [cookies] = useCookies(["pfAuthToken"])
  const [isLoading, setIsLoading] = useState("")
  const [individualOrders, setIndividualOrders] = useState([])
  const [bulkOrders, setBulkOrders] = useState([])
  const navigate = useNavigate()

  const handleShowItem = (orderId, orderStatus) => {
    if (orderStatus === "Payment Confirmed") {
      navigate(`/show-item/${orderId}`)
    } else {
      alert("Order is waiting for payment confirmation.")
    }
  }

  useEffect(() => {
    setIsLoading(true)
    axios
      ?.get("/api/my-order-individual-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setIndividualOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err))

    axios
      ?.get("/api/get-order-bulk-api", {
        headers: {
          Authorization: `Bearer ${cookies?.pfAuthToken}`,
        },
      })
      ?.then((res) => setBulkOrders(res?.data?.rows))
      ?.catch((err) => console?.error(err))
      ?.finally(() => setIsLoading(false))
  }, [])

  const columns = [
    {
      title: "Order Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order Number",
      dataIndex: "order_number",
      key: "order_number",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Sub Total",
      dataIndex: "order_subtotal",
      key: "order_subtotal",
    },
    {
      title: "Transaction Fee",
      key: "transaction_fee",
      dataIndex: "transaction_fee",
    },
    {
      title: "Order Total",
      key: "order_total",
      dataIndex: "order_total",
    },
    {
      title: "Order Status",
      key: "order_status",
      dataIndex: "order_status",
    },
    {
      title: "Date",
      key: "order_date",
      dataIndex: "order_date",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleShowItem(record.id, record.order_status)}>
          Show Items
        </Button>
      ),
    },
  ]

  return (
    <div className="orderTable">
      <h6>Individual Orders</h6>
      <Table
        columns={columns}
        dataSource={individualOrders}
        pagination={false}
        scroll={{ x: "100%" }}
        className="mb-5"
        loading={isLoading}
        responsive
      />

      <h6>Bulk Orders</h6>
      <Table
        columns={columns}
        dataSource={bulkOrders}
        pagination={false}
        scroll={{ x: "100%" }}
        loading={isLoading}
        responsive
      />
    </div>
  )
}
export default OrderTable
