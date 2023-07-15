import React from "react"
import "./exploreprepaid.css"
import { Link } from "react-router-dom"

function Explore() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="explore-main-div">
      <section className="explore-inner-div">
        <div className="explore-first-div">
          <h1 className="explore-heading">Ready to explore Prepaid Friends?</h1>
          <p className="explore-para">
            Discover how Prepaid Cards work — and get your crypto wallet to
            work.
          </p>
        </div>
        <div className="explore-second-div">
          <Link to="/">
            <button className="prepaid-btn" onClick={scrollToTop}>
              Buy Prepaid Card
            </button>
          </Link>
          <Link to="/">
            <button className="prepaid-btn" onClick={scrollToTop}>
              Buy In Bulk
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
export default Explore
