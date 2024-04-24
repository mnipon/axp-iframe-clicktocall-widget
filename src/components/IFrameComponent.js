import React, { useRef, useState, useEffect } from "react";
import styles from "./IFrameComponent.module.css";
import PhoneComponent from "./PhoneComponent";

const IFrameComponent = ({ api }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [iframeURL, setIframeURL] = useState(
    "https://dc1widget01.avayatoday.com/static-widgets/axpiframe-clicktocall-widget/sample.html"
  );

  useEffect(() => {
    // Define the message handler function
    const handleMessage = (event) => {
      // console.log("Received message event:", event); // Log the entire event object
      if (event.data && event.data.type === "PHONE_NUMBER") {
        // console.log("Received phone number:", event.data.data);
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIframeURL(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.container}>
      {/* <PhoneComponent /> */}
      <div>
        <p>Detected telephone number: {phoneNumber}</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter URL"
          className={styles.inputText}
        />
        <button type="submit" className={styles.buttonAction}>
          Load
        </button>
      </form>
      <iframe
        className={styles.iframeContainer}
        id="externalFrame"
        src={iframeURL}
        title="External Content"
      ></iframe>
    </div>
  );
};

export default IFrameComponent;
