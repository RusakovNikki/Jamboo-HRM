import React, { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import LetteredAvatar from "react-lettered-avatar"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import { arrayWithColors, HOME_PAGE_ROUTE, ROLES } from "../utils/consts"
import Employee from "./roles/Employee"
import Supervisor from "./roles/Supervisor"
import { Link } from "react-router-dom"
import logOutImg from "../images/logout.svg"

const HomePage = () => {
  const [currentUser, isLoading] = useAuth()
  const [avatar, setAvatar] = useState("")
  const role = useGetDataAboutUser(currentUser)

  async function leaveFromAccaunt() {
    const leave = await signOut(auth)
    console.log(leave)
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setAvatar(currentUser.photoURL)
    }
  }, [currentUser])
  console.log(currentUser)

  return (
    <div className="flex">
      <nav className="navbar">
        <div className="flex space-between align-center">
          <Link to={HOME_PAGE_ROUTE}>
            <div className="logo header__logo">
              <div className="logo__image"></div>
              <div className="logo__text">Jamboo Software</div>
            </div>
          </Link>
          {/* <button className="button"> */}
          <img
            src={logOutImg}
            className="navbar__logout"
            alt=""
            width="25"
            height="25"
            onClick={leaveFromAccaunt}
          />
          {/* </button> */}
        </div>
        <div className="navbar__refs">
          <div className="navbar__ref">Главная</div>
          <div className="navbar__ref">Мои задачи</div>
          <div className="navbar__ref">Уведомления</div>{" "}
          {/*уведомления о выполнении и невыполнении сроков*/}
          <div className="navbar__ref">Чаты</div>
          <div className="navbar__ref">Моя компания</div>
        </div>
        <div className="navbar__refs">
          <p className="navbar__title">Избранные задачи</p>
          {/* <div className="navbar__ref">Чаты</div>
          <div className="navbar__ref">Моя компания</div> */}
        </div>
      </nav>
      <div className="content">
        <LetteredAvatar
          name={currentUser?.email}
          size={100}
          radius={20}
          color="#fff"
          backgroundColors={arrayWithColors}
        />
        <img src={avatar} width="300" alt="avatar" />
        {role === ROLES.EMPLOYEE ? (
          <>
            <Employee />
          </>
        ) : (
          <>
            <Supervisor />
          </>
        )}

        <p>Домашняя страница</p>
        <p>{currentUser?.email}</p>
      </div>
    </div>
  )
}

export default HomePage
