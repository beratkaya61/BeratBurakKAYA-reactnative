import axios from "axios";

export default axios.create({
    baseURL: "https://62286b649fd6174ca82321f1.mockapi.io/case-study",
    headers: {
        "Content-type": "application/json"
    },
    timeout: 10000
})