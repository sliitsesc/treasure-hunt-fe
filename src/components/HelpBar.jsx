import { HelpCircle, Info, X } from "lucide-react";
import React from "react";

const HelpBar = () => {
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  return (
    <div>
      {/* Buttons at the bottom */}
      <div className="sticky bottom-0 left-0 right-0 flex justify-center gap-4 bg-transparent py-4">
        <button
          onClick={() => setShowInstructions(true)}
          className="flex items-center justify-center w-16 h-16 bg-brown-primary text-white rounded-md shadow-lg"
        >
          <Info size={32} />
        </button>
        <button
          onClick={() => setShowHelp(true)}
          className="flex items-center justify-center w-16 h-16 bg-brown-primary text-white rounded-md shadow-lg"
        >
          <HelpCircle size={32} />
        </button>
      </div>

      {/* Instructions Popup */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold bokor text-brown-primary mb-4">
              Game Instructions - How to Play 🏴‍☠️
            </h2>
            <p className="bokor text-gray-700">
              1.Find the spot and search for the secret QR code we’ve stashed
              away.
              <br />
              2.Scan the code with your device to unlock the next stage of your
              quest.
              <br />
              3.Follow each new clue to uncover the next locations and the QR
              code.
              <br />
              4.Once you scan the final QR code, you’ll reach the Game Completed
              screen!
              <br />
              5.Show this screen to the crew at our stall to claim your
              well-earned treasure!
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 bokor text-brown-primary">
              Need Help?
            </h2>
            <p className="bokor text-gray-700">
              If you believe you're at the correct location but can't find the
              QR code, don’t worry! You can call our team at +94 76 123 4567,
              and report it to us. Keep going, and you'll be back on track in no
              time!{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpBar;
