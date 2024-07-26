import makeHttpCall from "./makeHttpCall";

const getPollingDetails = async (intent) => {
    // api calls and other functionality
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWIxNjlmNjQ3LWQ4MTEtNTI4NS05YjcxLTEwNWI1ZTlhYWUwMCIsInN1YiI6IjEyMzQifQ.P7G-Lnt6n_m_M3y_6OnlJ5zmPgGHSAgW0A9M8qWzGLg";

    const getPollingId = async () => {
        let pollId;
        let bodyData = {
            session: {
                new: true,
            },
            message: {
                type: "text",
                val: intent,
            },
            from: {
                id: "test@test.com",
                userInfo: {
                    firstName: "",
                    lastName: "",
                    email: "",
                },
            },
            to: {
                id: "st-969e6350-0439-5958-a697-d239ec90c45b",
            },
            mergeIdentity: "",
            preferredChannelForResponse: "",
        };
        let config = {
            method: "post",
            url: "https://bots.kore.ai/chatbot/v2/webhook/st-969e6350-0439-5958-a697-d239ec90c45b",
            data: bodyData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        let pollIdResponse = await makeHttpCall(config);
        
        if (pollIdResponse.data.pollId) {
            pollId = pollIdResponse.data.pollId;
            console.log(`pollId ==> ${pollId}`);
            pollIdResponse = await getPollingData(pollId);
        } else {
            console.log(`bot message ===> ${JSON.stringify(pollIdResponse.data.data[0].val)}`);
        }

        return pollIdResponse;
    }

    const getPollingData = async (pollId) => {
        let interval;
        let pollingStatus;
        let config2 = {
            method: "get",
            url: `https://bots.kore.ai/chatbot/v2/webhook/st-969e6350-0439-5958-a697-d239ec90c45b/poll/${pollId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        let pollDataResponse = await makeHttpCall(config2);
    
        pollingStatus = pollDataResponse.data.status;
        console.log(`pollingStatus ===> ${pollingStatus}`);

        if (pollingStatus === "Inprogress") {
            pollDataResponse = await new Promise(resolve => setTimeout(() => resolve(getPollingData(pollId)), 3000));
        } else if (pollingStatus === undefined) {
            clearInterval(interval);
            console.log(`bot message getPollingData ===> ${pollDataResponse.data.data.length > 1 ? JSON.stringify(pollDataResponse.data.data.map((ele) => ele.val)) : pollDataResponse.data.data[0].val}`)
        }

        return pollDataResponse;
    };

    return await getPollingId();
}

export default getPollingDetails;