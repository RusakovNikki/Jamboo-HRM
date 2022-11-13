import React, { useEffect, useState } from "react"
import { signOut } from "firebase/auth"

import { auth, useAuth, useGetDataAboutUser } from "../firebase"
import { ROLES } from "../utils/consts"
import Navbar from "./Navbar"
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

  return (
    <>
      <Navbar />
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
