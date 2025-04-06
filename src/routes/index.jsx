import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import TreasureHuntLogo from "../assets/treasure-hunt-logo-small.png";

export default function IndexPage() {
  return (
    <div className="archivo-light text-brown-primary flex flex-col items-center h-[calc(100svh-67px)] justify-between py-10">
      <div>
        <img src={TreasureHuntLogo} className="max-w-[350px]" />
        <h1 className="bokor text-[36px] text-center leading-[40px]">
          By Software Engineering
          <br />
          Student Community
        </h1>
      </div>
      <SignedIn>
        <Link
          to="/game"
          className="bokor bg-brown-primary text-white text-4xl px-6 py-4 rounded-full min-w-[200px] text-center">
          Start
        </Link>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center gap-y-4">
          <Link
            to="https://accounts.treasurehunt.matterofcode.dev/sign-up"
            className="bokor bg-brown-primary text-white text-3xl px-6 py-4 rounded-full min-w-[200px] text-center">
            Register
          </Link>
          <Link
            to="/sign-in"
            className="bokor bg-brown-primary text-white text-3xl px-6 py-4 rounded-full min-w-[200px] text-center">
            Log In
          </Link>
        </div>
      </SignedOut>
    </div>
  );
}
