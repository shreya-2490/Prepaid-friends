import React, { useState, useEffect } from "react"
import "./ticker.css"
import axios from "axios"

const Ticker = () => {
  const [cryptoData, setCryptoData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
            },
          }
        )

        setCryptoData(response.data)
        setError(null) // Clear any previous error
      } catch (error) {
        setError(error.message)
      }
    }
    fetchCryptoData()
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }

  const tickerItems =
    cryptoData.length > 0 ? [...cryptoData, ...cryptoData] : []

  return (
    <div className="ticker-container">
      <div className="ticker">
        {tickerItems.length > 0 ? (
          tickerItems.map((crypto, index) => (
            <div
              key={crypto.id}
              className="ticker-item"
              style={{ animationDelay: `${index * 2}s` }}
            >
              <img
                src={crypto.image}
                alt={crypto.name}
                className="crypto-icon"
              />
              <span>{crypto.symbol}:</span>
              <span>${crypto.current_price}</span>
            </div>
          ))
        ) : (
          <p>Loading cryptocurrency data...</p>
        )}
      </div>
    </div>
  )
}

export default Ticker
