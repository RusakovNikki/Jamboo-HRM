import React from "react"

import { Navigate, Route, Routes } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes"
import { HOME_PAGE_ROUTE, LOGIN_ROUTE } from "../utils/consts"

const AppRouter = () => {
  const USER = false
  return (
    <>
      <Routes>
        {USER ? (
          <>
            {privateRoutes.map(({ path, Component }) => (
              <Route path={path} key={path} element={<Component />} />
            ))}
            <Route
              path="*"
              element={<Navigate to={HOME_PAGE_ROUTE} replace />}
            />
          </>
        ) : (
          <>
            {publicRoutes.map(({ path, Component }) => (
              <Route path={path} key={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default AppRouter
