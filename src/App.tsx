import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import Auth from "@containers/Auth/Auth";
import { AUTH_PAGE, MY_TIMESHEETS_PAGE } from "@helpers/routes";
import { useAppSelector } from "@redux/hooks";
import { authSelector } from "@redux/slices/auth";

const App = () => {
  const { isAuth } = useAppSelector(authSelector);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {isAuth ? (
            <>
              <Route path={MY_TIMESHEETS_PAGE} element={<div />} />
              <Route
                path="*"
                element={<Navigate to={MY_TIMESHEETS_PAGE} replace />}
              />
            </>
          ) : (
            <>
              <Route path={AUTH_PAGE} element={<Auth />} />
              <Route path="*" element={<Navigate to={AUTH_PAGE} replace />} />
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
