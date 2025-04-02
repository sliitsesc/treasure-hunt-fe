import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GameLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="h-[calc(100svh-83px)]">
      <Outlet />
    </div>
  );
}
