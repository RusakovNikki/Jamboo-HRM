import React from "react"
import { Link } from "react-router-dom"

const Promo = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__items">
          <div className="logo header__logo">
            <div className="logo__image"></div>
            <div className="logo__text">Jamboo Software</div>
          </div>
          <Link to={"/reg"}>
            <button className="button">Начать работу</button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Promo
