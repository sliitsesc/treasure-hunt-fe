import { useEffect, useState } from "react";
import Question from "../components/Question";
import { API_URL } from "../constants";
import apiClient from "../services/apiClient";
const STEPS = 11;

import { useUser, useAuth } from "@clerk/clerk-react";
import ScannerComponent from "../components/QRScanner";
import { RefreshCw, RotateCcw, ArrowLeftSquare } from "lucide-react";
import LostPirate from "../assets/lost_pirate.png";
import WinnerPirate from "../assets/winner.png";
import Gem1 from "../assets/gems/gem00001.png";
import Gem2 from "../assets/gems/gem00002.png";
import Gem3 from "../assets/gems/gem00003.png";
import Gem4 from "../assets/gems/gem00004.png";
import Gem5 from "../assets/gems/gem00005.png";

const GamePage = () => {
  const [nextOperation, setNextOperation] = useState("qr"); // 'waiting', 'qr', 'clue', 'error', 'completed'
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [clue, setClue] = useState("");
  const [invalidClue, setInvalidClue] = useState(false);
  const [place, setPlace] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { user, isLoaded } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch game details when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      fetchGameDetails();
    }
  }, [isLoaded, user]);

  async function fetchGameDetails() {
    setIsLoading(true);

    try {
      const userId = user?.id;
      const response = await apiClient.getDetails(userId);

      const { currentStep, nextClue: responseClue } = response;
      setCurrentStep(currentStep);
      if (currentStep >= STEPS) {
        setNextOperation("completed");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setNextOperation("qr");
        setClue(responseClue);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Error fetching game details:", error);
    }
  }

  // handle submit QR clue
  async function handleQRClueSubmit(code) {
    setIsLoading(true);
    try {
      const userId = user?.id;
      const response = await apiClient.scanQRCode(code, userId);

      setIsLoading(false);

      // Check response message directly instead of looking for an error object
      if (response.message === "QR code verified successfully") {
        setNextOperation("success");
        // await fetchGameDetails();
      } else if (response.message === "Wrong Order") {
        setInvalidClue(true);
        setErrorMessage(
          "You found a location that's part of your hunt, but you're not supposed to be here yet!"
        );
      } else if (response.message === "Location not relevant") {
        setInvalidClue(true);
        setErrorMessage("Wrong location matey! Try again.");
      } else {
        setIsError(true);
        setErrorMessage(
          response.message || "Something went wrong with this clue."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Error:", error);
    }
  }

  function setGameComplete(data) {
    setNextOperation("completed");
    setPlace(data);
  }

  return (
    <>
      {/* server errors */}
      {isError && (
        <div className="text-center text-4xl bokor text-brown-primary h-full flex flex-col justify-center items-center">
          Error Connecting to Server
          <img src={LostPirate} className="w-[280px]" />
        </div>
      )}
      {/*  no server errors */}
      {/* loading */}
      {isLoading && (
        <div className="text-center text-4xl bokor text-brown-primary h-full flex flex-col justify-center items-center">
          Waiting for server
          <RefreshCw color="brown" size={60} className="animate-spin mt-10" />
        </div>
      )}
      {isLoaded && !isLoading && !isError && (
        <main className="h-full">
          <div className="flex items-center mb-4 bokor text-brown-primary text-2xl justify-end">
            <p>
              Gems found - {currentStep - 1} / {STEPS}
            </p>{" "}
            <img src={Gem1} className="w-[48px] ml-2" />
          </div>
          {/* success */}
          {nextOperation === "success" && (
            <div className="text-center text-xl archivo-light text-brown-primary h-full flex flex-col justify-center items-center">
              <p className="text-5xl bokor">Aye Congrats!</p>
              <p className="text-4xl bokor">You found a gem!</p>
              <img
                src={
                  [Gem1, Gem2, Gem3, Gem4, Gem5][Math.floor(Math.random() * 5)]
                }
                className="w-[200px] mt-4"
                alt="Gem"
              />
              <button
                onClick={() => {
                  setNextOperation("qr");
                  fetchGameDetails();
                }}
                className="inline-flex justify-center items-center bokor bg-brown-primary text-white text-3xl px-6 py-4 rounded-full min-w-[200px] text-center mt-10">
                Next Clue
              </button>
            </div>
          )}
          {/* wrong clue */}
          {invalidClue && (
            <div className="text-center text-xl archivo-light text-brown-primary h-full flex flex-col justify-center items-center">
              <p className="text-3xl bokor">
                Arrr!
                <br />
                {errorMessage || "That was the wrong clue mate!"}
              </p>
              <img src={LostPirate} className="w-[280px]" />

              <button
                onClick={() => {
                  setInvalidClue(false);
                  setNextOperation("qr");
                }}
                className="inline-flex justify-center items-center bokor bg-brown-primary text-white text-xl px-6 py-4 rounded-lg min-w-[200px] text-center mt-10">
                Try again <RotateCcw size={24} className="inline-block ml-2" />
              </button>
            </div>
          )}
          {/* QR code */}
          {!invalidClue && nextOperation === "qr" && (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-2xl bokor mt-4 px-10 text-brown-primary">
                Your Clue:
              </p>
              <p className="text-3xl bokor mb-6 mt-0 px-10 text-brown-primary">
                {clue}
              </p>
              <ScannerComponent
                clue={clue}
                handleQRSubmit={handleQRClueSubmit}
              />
            </div>
          )}
          {/* correct clue */}
          {/* completed state */}
          {nextOperation === "completed" && (
            <div className="text-center text-xl archivo-light text-brown-primary h-full flex flex-col justify-center items-center">
              {/* <span className="text-[64px] mt-16 mb-10">🎉</span> */}
              <p className="text-4xl bokor">Aye Congrats!</p>
              <p className="text-3xl bokor">You found the big treasure!</p>
              <p className="text-sm">
                <br />
                Come to the SESC/FCSC stall at SLIIT Islands to claim your
                prize! Or call 0775520022 (Pawan) / 0701224964 (Dinal)
              </p>
              <img src={WinnerPirate} className="w-[280px]" />
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default GamePage;
