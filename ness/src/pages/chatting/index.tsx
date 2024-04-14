import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import NessImg from "../../assets/ness_chat.png";
import { IChatMessage, ISendMessage } from "../../module/interface/chatting";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Chatting = () => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = cookies.get("accessToken") || "";
    setAccessToken(token);

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setChatMessages(response.data.chatList);
      } catch (error) {
        console.error("Failed to fetch chat messages", error);
      }
    };

    fetchChatMessages();
  }, []);

  const handleSendMessage = async () => {
    const newChatMessage: ISendMessage = {
      chatType: "USER",
      text: newMessage,
    };
    setNewMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/chat`,
        newChatMessage,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      setChatMessages(response.data.chatList);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-gray-200 bg-white w-full h-[94px] gap-[5px] relative mt-[60px] flex-col flex justify-center items-center">
        <Image src={NessImg} alt="Ness Logo" />
        네스
      </div>
      <div className="relative flex-1 w-full bg-[#F2F0FF] py-[26px]">
        <div className="px-[20px]">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-[14px] ${
                message.chatType === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-[12px] py-[10px] rounded-[16px] ${
                  message.chatType === "USER"
                    ? "bg-[#7A64FF] text-white"
                    : "bg-white text-black"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-[25px] left-[20px] right-[20px] flex">
          <input
            className="w-full bg-white h-[41px] px-[22px] py-[13px] rounded-[20px] border border-purple-600 shadow-md"
            type="text"
            value={newMessage}
            placeholder="채팅 입력하기"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
