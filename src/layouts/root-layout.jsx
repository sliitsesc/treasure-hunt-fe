import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import TreasureHuntLogo from "../assets/text-logo-small.png";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}>
      <header className="header bokor p-4 text-right flex justify-between items-center">
        <img src={TreasureHuntLogo} className="w-[160px]" />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut> */}
        </div>
      </header>
      <main className="px-4 pb-4">
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
