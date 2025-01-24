import React, { useState } from "react";
import styled from "styled-components";
import SendMIcon from "../../Assects/send.png";

const breakpoints = {
  mobileS: "320px",
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  laptop: "1440px"
};

const MessageFo = styled.input`
  border-radius: 10px;
  background-color: rgba(0, 163, 154, 0.1);
  margin-top: 45%;
  margin-left: 10px;
  width: 65%;
  height: 35px;
  position: absolute;
  padding-left: 15px; /* Adds 10px of space at the start of the input */

  @media (max-width: ${breakpoints.laptop}) {
    margin-top: 55%;
  }

  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 78%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 103%;
    width: 62%;
  }

  @media (max-width: ${breakpoints.mobile}) {
  }

  @media (max-width: ${breakpoints.mobileS}) {
  }
`;

const SendMsgIcon = styled.button`
  background-image: url(${SendMIcon}); /* Path to your image */
  background-repeat: no-repeat;
  background-size: 30px 30px; /* Set the size of the image */
  background-repeat: no-repeat;
  width: 35px;
  margin: 867px 66%;
  height: 35px;
  position: absolute;

  @media (max-width: ${breakpoints.laptop}) {
    margin-top: 55%;
  }

  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 78%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 103%;
    margin-left: 64%;
  }

  @media (max-width: ${breakpoints.mobile}) {
  }

  @media (max-width: ${breakpoints.mobileS}) {
  }
`;

const MessageForm = ({ changeValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleINputchange = event => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    changeValue({ inputValue });
    setInputValue("");
  };

  const handleKeyDown = event => {
    if (event.key == "Enter") {
      changeValue({ inputValue });
      setInputValue("");
    }
  };

  return (
    <div>
      <MessageFo
        placeholder=" Message here..."
        value={inputValue}
        onChange={handleINputchange}
        onKeyDown={handleKeyDown}
      />
      <SendMsgIcon onClick={handleClick} />
    </div>
  );
};

export default MessageForm;
