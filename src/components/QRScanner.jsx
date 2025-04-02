import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDevices } from "@yudiel/react-qr-scanner";

import PropTypes from "prop-types";

const QRScanner = ({ handleQRSubmit }) => {
  // Rest of the code

  QRScanner.propTypes = {
    handleQRSubmit: PropTypes.func.isRequired,
  };

  const [deviceId, setDeviceId] = useState(undefined);
  const devices = useDevices();

  const handleScan = (result) => {
    console.log(result[0].rawValue); // Optional: Log the scanned result
    handleQRSubmit(Number(result[0].rawValue)); // Call the parent component's function with the result as a number
  };

  return (
    <div className="flex flex-col justify-center items-center archivo-light text-brown-primary text-center">
      {/* <h2 className="archivo-bold text-brown-primary text-2xl mb-6">{clue}</h2> */}
      <p className="mb-8">
        Find the location and scan the <br />
        QR code to get the next clue 👀
      </p>
      <div className="mb-8">
        <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select camera</option>
          {devices.map((device, index) => (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
      <Scanner
        paused={false}
        onScan={handleScan} // Call the handleScan function when a QR code is scanned
        constraints={{ deviceId: deviceId }}
        styles={{ borderRadius: "50px" }}
      />
    </div>
  );
};

export default QRScanner;
