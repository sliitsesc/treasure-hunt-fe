import { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDevices } from "@yudiel/react-qr-scanner";
import { Camera } from "lucide-react";
import PropTypes from "prop-types";

const QRScanner = ({ handleQRSubmit }) => {
  const devices = useDevices(); // Get available cameras
  const [deviceIndex, setDeviceIndex] = useState(0);
  const currentDevice = devices[deviceIndex]; // Get the selected device

  const handleScan = (result) => {
    console.log(result[0].rawValue);
    handleQRSubmit(result[0].rawValue);
  };

  const switchCamera = () => {
    if (devices.length > 1) {
      setDeviceIndex((prevIndex) => (prevIndex + 1) % devices.length);
    }
  };

  // Log the current camera name whenever the deviceIndex changes
  useEffect(() => {
    if (currentDevice) {
      console.log("Current Camera: " + currentDevice.label);
    }
  }, [currentDevice]);

  return (
    <div className="flex flex-col justify-center items-center archivo-light text-brown-primary text-center">
      <p className="mb-4 mt-3 bokor text-3xl">
        Find the location and scan the <br />
        QR code to get the next clue 👀
      </p>

      {/* Camera Switch Button */}
      <button
        onClick={switchCamera}
        disabled={devices.length <= 1}
        className={`flex items-center gap-2 bg-brown-primary text-white px-4 py-2 rounded-lg mb-4 bokor text-2xl ${
          devices.length <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Camera size={20} />
        Switch Camera
      </button>

      {/* Scanner */}
      <Scanner
        paused={false}
        onScan={handleScan}
        constraints={{ deviceId: currentDevice }}
        styles={{ borderRadius: "50px" }}
      />
    </div>
  );
};

QRScanner.propTypes = {
  handleQRSubmit: PropTypes.func.isRequired,
};

export default QRScanner;
