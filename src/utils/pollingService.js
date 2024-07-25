const getPollingDetails = async (intent) => {
    // api calls and other functionality
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLWY0MzdhZDczLTAzZGEtNTNlMS05ZDI1LTA5ZDY4Y2VhMjAxMyIsInN1YiI6IjEyMzQifQ.z1Ibt15fyt-SaPJ63Ulrc7AlVWbazZxqB4A1V1KEtRM";
    let response = {
        status: 200,
        message: "Sample Mock API call",
    };

    const getPollingId = () => {
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
                id: "st-724cb5e2-dc8f-520a-abf8-7f6c232e5d36",
            },
            mergeIdentity: "",
            preferredChannelForResponse: "",
        };
        let config = {
            method: "post",
            url: "https://bots.kore.ai/chatbot/v2/webhook/st-724cb5e2-dc8f-520a-abf8-7f6c232e5d36",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: bodyData,
        };
        axios(config)
            .then(function (response) {
                if (response.data.pollId) {
                    pollId = response.data.pollId;
                    logger.info(`pollId ==> ${pollId}`)
                    getPollingData(pollId);
                } else {
                    logger.info(`bot message ==> ${JSON.stringify(response.data.data[0].val)}`)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPollingId();

    const getPollingData = (pollId) => {
        let config2 = {
            method: "get",
            url: `https://bots.kore.ai/chatbot/v2/webhook/st-724cb5e2-dc8f-520a-abf8-7f6c232e5d36/poll/${pollId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios(config2)
            .then(function (response) {
                let interval;
                pollingStatus = response.data.status;
                pollingStatus === "Inprogress" ? logger.info(`pollingStatus ===> ${pollingStatus}`) : null;
                if (pollingStatus === "Inprogress") {
                    setInterval(getPollingData(pollId), 3000);
                } else if (pollingStatus === undefined) {
                    clearInterval(interval);
                    logger.info(`bot message ==> ${response.data.data.length > 1 ? JSON.stringify(response.data.data.map((ele) => ele.val)) : response.data.data[0].val}`)
                }
            })
            .catch(function (error) {
                //   console.log(error);
            });
    };

    return response;
}

export default getPollingDetails;