import React from "react";

// 탐색 페이지
const Explorer = React.lazy(() => import("../pages/explorer"));

const explorerRoute = {
  name: "탐색",
  path: "/explorer",
  component: Explorer
};

export const routes = [explorerRoute];

export default [explorerRoute];
