import React, { useEffect, useState } from "react";
import getPollingDetails from "../../utils/pollingService";
import './ChatWidget.css';

const ChatWidget = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    const webhookCall = async () => {
        try {
            const botResponse = await getPollingDetails(userMessage);
            const textMessage = botResponse.data ? botResponse.data.data[0].val : botResponse.message;
            
            setMessages(
                [
                    ...messages,
                    {
                        sender: 'bot',
                        text: textMessage
                    }
                ]
            );
            setUserMessage('');
        } catch (e) {
            console.log(e);
        }
    }

    const handleSendMessage = () => {
        setMessages(
            [
                ...messages,
                {
                    sender: 'user',
                    text: userMessage
                }
            ]
        );
    }

    const handleInputChange = (e) => {
        setUserMessage(e.target.value);
    }

    const handleEndChat = () => {
        window.close();
    }

    useEffect(() => {
        if (userMessage.trim()) {
            try {
                webhookCall();
            } catch (e) {
                console.log(e);
            }
        }
    }, [messages]);

    return (
        <div className="chat-app">
            <div className="chat-window">
                <div className="messages">
                    <table style={{width: '100%'}}>
                        {messages.map((message, index) => (
                            <tr>
                            <div key={index} className={`${message.sender === 'user' ? "message-align-right" : "message-align-left"}`}>
                                <div className="message-container">
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            </div>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleSendMessage();
                            }
                        }
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
                <div className="input-container end-chat-button">
                    <button onClick={handleEndChat}>End Chat</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWidget;