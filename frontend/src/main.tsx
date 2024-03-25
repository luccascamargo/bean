import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonProvider } from "./contexts/PokemonContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserProvider } from "./contexts/UserContext";
import Teams from "./Teams";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <SignIn />,
  },
  {
    element: <SignIn />,
    path: "/signin",
  },
  {
    element: <SignUp />,
    path: "/signup",
  },
  {
    element: <Teams />,
    path: "/my-teams",
    errorElement: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PokemonProvider>
          <RouterProvider router={routes}></RouterProvider>
        </PokemonProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
