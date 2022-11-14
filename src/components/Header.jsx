import React from "react"
import { Link } from "react-router-dom"
import { PROMO_ROUTE } from "../utils/consts"

const Header = ({ link, text }) => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__items">
          <Link to={PROMO_ROUTE}>
            <div className="logo header__logo">
              <div className="logo__image"></div>
              <div className="logo__text">Jamboo Software</div>
            </div>
          </Link>
          <Link to={link}>
            <button className="button">{text}</button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
