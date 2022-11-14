import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { useAuth } from "../firebase"
import { privateRoutes, publicRoutes } from "../routes"
import { HOME_PAGE_ROUTE, PROMO_ROUTE } from "../utils/consts"

const AppRouter = () => {
  const currentUser = useAuth()

  return (
    <>
      <Routes>
        {currentUser ? (
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
            <Route path="*" element={<Navigate to={PROMO_ROUTE} replace />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default AppRouter
