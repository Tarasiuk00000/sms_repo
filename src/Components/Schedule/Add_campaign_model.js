import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 300px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TimeInput = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const InputForm = styled.input`
  border: 1px solid rgba(111, 0, 163, 0.5);
  border-radius: 4px;
  height: 35px;
  padding-left: 10px; /* Adds 10px of space at the start of the input */
  margin-bottom: 10px;
  width: 300px;

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

const StyleButton = styled.button`
  margin-top: 10px;
  width: 48%;
  height: 40px;
  margin: 1%;
  margin-top: 5%;
  border: 1px solid rgb(111, 0, 163);
  border-radius: 10px;

  &:hover {
    background-color: rgb(220, 198, 247);
  }
`;

// React Component
const AddCampaignModel = ({ groupData, isOpen, close, selectOptions }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [inputValue, setINputChange] = useState("");

  if (!isOpen) return null;

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleTimeChange = e => {
    setSelectedTime(e.target.value);
  };

  const handleInputChange = e => {
    setINputChange(e.target.value);
  };

  const setCampaign = () => {
    if (selectedOption === "" || selectedOption === "default") {
      alert("Select Group Name.");
      return;
    }
    if (selectedTime === "") {
      alert("Select Time.");
      return;
    }
    if (inputValue === "") {
      alert("Input SMS");
      return;
    }

    selectOptions({ selectedOption, selectedTime, inputValue });
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Label htmlFor="title">Add Schedule</Label>
        <div>
          <Label htmlFor="comboBox">Choose a Group</Label>
          <Select
            id="comboBox"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="default">-- Select --</option>
            {groupData.map(row =>
              <option value={row.name} key={row.id}>
                {row.name} => ( {row.member} )
              </option>
            )}
          </Select>
        </div>

        <div>
          <Label htmlFor="timeSelect">Set Send SMS Time</Label>
          <TimeInput
            id="timeSelect"
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
        <div style={{ width: "300px" }}>
          <Label htmlFor="SMS">Input SMS.</Label>
          <InputForm
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Input SMS..."
          />
        </div>
        <div style={{ display: "inline", width: "85%" }}>
          <StyleButton onClick={setCampaign}>Add Campaign</StyleButton>
          <StyleButton onClick={close}>Cancel</StyleButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddCampaignModel;
