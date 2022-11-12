import React from "react"

import { ROLES } from "../utils/consts"
import Navbar from "./Navbar"
import Employee from "./roles/Employee"
import Supervisor from "./roles/Supervisor"

const HomePage = () => {
  const ROLE = ROLES.EMPLOYEE
  return (
    <>
      <Navbar />
      {ROLE === ROLES.EMPLOYEE ? (
        <>
          <Employee />
        </>
      ) : (
        <>
          <Supervisor />
        </>
      )}
    </>
  )
}

export default HomePage
