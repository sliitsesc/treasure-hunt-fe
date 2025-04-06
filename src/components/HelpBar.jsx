import { X } from "lucide-react";
import React from "react";

const HelpBar = () => {
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  return (
    <div>
      {/* Buttons at the bottom */}
      <div className="flex flex-row🏆 justify-center gap-x-4 rounded-xl p-4 pr-10 fixed -right-[230px] top-[50%] -rotate-90">
        <button
          onClick={() => setShowInstructions(true)}
          className="bokor flex items-center justify-center py-2 px-4 pb-14 bg-yellow-500 text-brown-primary text-xl rounded-md shadow-lg">
          How to Play
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="bokor flex items-center justify-center py-2 px-4 pb-14 bg-white text-brown-primary text-xl rounded-md shadow-lg">
          Issues 😫
        </button>
        <a
          href="/leaderboard"
          className="bokor flex items-center justify-center py-2 px-4 pb-14 bg-white text-brown-primary text-xl rounded-md shadow-lg">
          Leaderboard 🏆
        </a>
      </div>

      {/* Instructions Popup */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold bokor text-brown-primary mb-4">
              How to Play 🏴‍☠️
            </h2>
            <p className="text-gray-700 text-lg">
              1. Find the spot and search for the secret QR code we’ve stashed
              away.
              <br />
              <br />
              2. Scan the code with your device to unlock the next stage of your
              quest.
              <br />
              <br />
              3. Follow each new clue to uncover the next locations and the QR
              code.
              <br />
              <br />
              4. Once you scan the final QR code, you’ll reach the Game
              Completed screen!
              <br />
              <br />
              5. Show this screen to the crew at our stall or call 077 552 0022
              (Pawan) / 070 122 4964 (Dinal) to claim your well-earned treasure!
            </p>
          </div>
        </div>
      )}

      {/* Help Popup */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 bokor text-brown-primary">
              Need Help?
            </h2>
            <p className=" text-orange-500 font-bold text-lg">
              If the camera is not working please enable camera permissions from
              your browser settings
            </p>
            <br />
            <p className=" text-gray-700 text-lg">
              If you need help signing up, or if you think a QR code is missing
              or broken, please contact us immediately.
              <br />
              <a className="underline" href="tel:0775520022">
                077 552 0022
              </a>
              (Pawan)
              <br />
              <a className="underline" href="tel:0701224964">
                070 122 4964
              </a>{" "}
              (Dinal)
              <br />
              Keep going, and you&apos;ll be back on track in no time!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpBar;
