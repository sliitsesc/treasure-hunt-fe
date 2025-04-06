import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import TreasureHuntLogo from "../assets/text-logo-small.png";
import HelpBar from "../components/HelpBar";

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
      publishableKey={PUBLISHABLE_KEY}
      loadSession={true}>
      <header className="header bokor p-4 text-right flex justify-between items-center">
        <a href="/game">
          <img src={TreasureHuntLogo} className="w-[160px]" />
        </a>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut> */}
        </div>
      </header>
      <main className="px-4 pb-4 overflow-x-hidden relative">
        <Outlet />
        <HelpBar />
      </main>
    </ClerkProvider>
  );
}
