import React, { useEffect, useState } from "react"
import { signOut } from "firebase/auth"
import LetteredAvatar from "react-lettered-avatar"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import { ROLES } from "../utils/consts"
import Employee from "./roles/Employee"
import Supervisor from "./roles/Supervisor"

const HomePage = () => {
  const currentUser = useAuth()
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

  const arrayWithColors = [
    "#2ecc71",
    "#3498db",
    "#8e44ad",
    "#e67e22",
    "#e74c3c",
    "#1abc9c",
    "#2c3e50",
  ]
  return (
    <>
      <LetteredAvatar
        name={currentUser?.email}
        size={100}
        radius={20}
        color="#fff"
        backgroundColor="rgb(55,55,22)"
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
      <button onClick={leaveFromAccaunt}>выйти</button>
    </>
  )
}

export default HomePage
