import axios from "axios";

const makeHttpCall = async ({method, url, data = null, headers = {}}) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
        });

        return response;
    } catch (error) {
        throw error;
    }
}

export default makeHttpCall;