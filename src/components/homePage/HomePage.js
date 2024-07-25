import React from "react";
import '../../App.css';
import './HomePage.css';

const HomePage = () => {

    const handleOnClick = () => {
        window.open("http://localhost:3000/preChatForm", "", "width=400, height=550");
    }

    return (
        <div className="App">
            <div>
                <h2>CAI XO 10 BOT</h2>
                <h5>Please chat with us.</h5>
            </div>
            <div>
                <div className="ChatWidgetIcon" onClick={handleOnClick}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span className="ChatWidgetIconText">Chat Now!!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;