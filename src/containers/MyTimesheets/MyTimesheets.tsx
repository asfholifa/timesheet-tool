import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ALL_PAGE, CURRENT_PAGE } from "@helpers/routes";
import Current from "./Current/Current";
import All from "./All/All";

const MyTimesheets = () => (
  <>
    <Routes>
      <Route path={CURRENT_PAGE} element={<Current />} />
      <Route path={ALL_PAGE} element={<All />} />
      <Route path="*" element={<Navigate to={CURRENT_PAGE} replace />} />
    </Routes>
  </>
);

export default MyTimesheets;
