import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/root-layout";

import IndexPage from "./routes";
import SignInPage from "./routes/sign-in";
import GameLayout from "./layouts/game-layout";
import GamePage from "./routes/game";
import LeaderboardPage from "./routes/leaderboard";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      {
        element: <GameLayout />,
        path: "game",
        children: [{ path: "/game", element: <GamePage /> }],
      },
      {
        element: <GameLayout />,
        path: "leaderboard",
        children: [{ path: "/leaderboard", element: <LeaderboardPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
