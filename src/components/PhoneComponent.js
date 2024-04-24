import React, { useState, useEffect } from "react";

const PhoneComponent = ({ api }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    // Define the message handler function
    const handleMessage = (event) => {
      console.log("Received message event:", event); // Log the entire event object
      if (event.data && event.data.type === "PHONE_NUMBER") {
        console.log("Received phone number:", event.data.data);
        setPhoneNumber(event.data.data);
        //Make Voice Call
        api.startVoiceInteraction(event.data.data);
      }
    };

    // Add event listener when component mounts
    window.addEventListener("message", handleMessage, false);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // This effect runs once when the component mounts

  return (
    <div>
      <div>
        {/* Display the received telephone number */}
        <p>Detected telephone number: {phoneNumber}</p>
      </div>
    </div>
  );
};

export default PhoneComponent;
