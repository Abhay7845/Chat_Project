/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/Home.css";
import moment from "moment";
import { BiSend } from "react-icons/bi";

const Home = () => {
  const [userChats, setUserChats] = useState([]);
  const [singleProduct, setSingleProduct] = useState({});
  const [textMsg, setTextMsg] = useState("");
  const [textMessage, setTextMessage] = useState([]);
  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => res)
      .then((response) => setUserChats(response.data))
      .catch((error) => console.log(error));
  }, []);

  const SendMassage = () => {
    setTextMessage([...textMessage, textMsg]);
    setTextMsg("");
  };

  const keyPressEnter = (event) => {
    if (event.key === "Enter") {
      SendMassage();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressEnter);
  }, [keyPressEnter]);

  return (
    <div>
      {userChats.length > 0 && (
        <div className="row mx-0">
          <div className="col">
            {userChats.map((chat, i) => {
              return (
                <div
                  key={i}
                  className="ChatsStyle"
                  onClick={() => setSingleProduct(chat)}
                >
                  <div className="d-flex">
                    <img
                      src={chat.imageURL}
                      alt="product"
                      className="productImg"
                    />
                    <div className="discription">
                      <div className="PNameDate">
                        <h6 className="proName">{chat.title}</h6>
                        <h6 className="proDate">{moment().format("L")}</h6>
                      </div>
                      <h6 className="proId">Order ID- {chat.orderId}</h6>
                      <h6 className="proMesaage">Message</h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col">
            {singleProduct.id && (
              <div className="productHeading">
                <img
                  src={singleProduct.imageURL}
                  alt="product"
                  className="productImg"
                />
                <h6 className="mx-2 mt-2">{singleProduct.title}</h6>
              </div>
            )}
            {singleProduct.id && (
              <div className="ChatMessage">
                {textMessage.map((chat, i) => {
                  return (
                    <span key={i} className="chatStyle">
                      {chat}
                    </span>
                  );
                })}
                <div className="chatMessageBox">
                  <input
                    className="chatInput"
                    placeholder="Type a message"
                    value={textMsg}
                    onChange={(e) => setTextMsg(e.target.value)}
                  />
                  <BiSend
                    className={textMsg ? "sendBtn" : "sendBtn2"}
                    onClick={SendMassage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
