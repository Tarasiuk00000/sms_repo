import styled from "styled-components";
import React, { useEffect, useState } from "react";
import SearchSMS from "../Components/SMS/Search";
import UserMenu from "../Components/SMS/User_menu";
import MessageForm from "../Components/SMS/Message_form";
import ChatLog from "../Components/SMS/Chat_log";
import axios from "axios";

const RightSide = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 931px;
  width: 100%;
`;

const UserPan = styled.div`
  background-color: rgba(111, 0, 163, 0.1);
  border-radius: 10px;
  width: 25%;
  height: 98%;
  margin-left: 1%;
  margin-right: 0;
  margin-top: 1%;
  margin-bottom: 1%;
`;

const ChatPan = styled.div`
  background-color: rgba(0, 163, 154, 0.1);
  border-radius: 10px;
  float: right;
  width: 120%;
  height: 98%;
  margin: 1%;
`;

const SMS = () => {
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [userPhone, setUserPhone] = useState(-1);

  // // Establish WebSocket connection when component mounts
  // useEffect(() => {
  //   const mySocket = io("http://localhost:5000"); // URL of your backend WebSocket server

  //   // Handle incoming messages
  //   mySocket.on("receive_sms_twilio", data => {
  //     // setChatData(prevMessages => [
  //     //   ...prevMessages,
  //     //   { sender: data.sender, message: data.message }
  //     // ]);
  //   });

  //   setSocket(mySocket);

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.get(
          process.env.REACT_APP_API + "/sms/users"
        );
        setGroupData(response.data);
        setData(response.data); // Update the state with the returned data
      } catch (error) {
        alert("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  const onClickButton = async ({ id, phone }) => {
    setUserPhone(phone);
    try {
      // Send a GET request to the backend when the site loads
      const response = await axios.post(
        process.env.REACT_APP_API + `/sms/chatlog/${id}`
      );
      setChatData(response.data); // Update the state with the returned data
    } catch (error) {
      alert("Error fetching data:", error);
    } finally {
    }
  };

  const setChatString = ({ inputValue }) => {
    if (userPhone === -1) {
      alert("Select Guy.");
      return;
    }
    const sendSMSToPerson = async () => {
      try {
        // Send a GET request to the backend when the site loads
        const response = await axios.post(
          process.env.REACT_APP_API +
            `/api/management/person/send/SMS/${userPhone}?msg=${inputValue}`
        );
      } catch (error) {
      } finally {
      }
    };

    sendSMSToPerson();
    const newChat = {
      index: 2, // Use chatData length to calculate the new index
      message: inputValue
    };

    // Update chatData state
    setChatData(prevChatData => [...prevChatData, newChat]);
  };

  const searchData = async searchWord => {
    const searchValue = searchWord.trim().toLowerCase();
    if (searchValue === "") {
      setData(groupData);
    } else {
      const results = groupData.filter(
        item => item.name.toLowerCase().includes(searchValue) // Check if the name includes the search word
      );
      setData(results);
    }
  };

  return (
    <main>
      <RightSide>
        <UserPan>
          <SearchSMS searchHint={searchData} />
          <UserMenu menuItems={data} rowClick={onClickButton} />
        </UserPan>
        <ChatPan>
          <ChatLog chatData={chatData} />
          <MessageForm changeValue={setChatString} />
        </ChatPan>
      </RightSide>
    </main>
  );
};

export default SMS;
