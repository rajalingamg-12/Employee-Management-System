import axios from "axios";

const api = axios.create({

    baseURL: "https://script.google.com/macros/s/AKfycbz8mAvbVPPmism3QyFUSJOOdfg5sIq5ZPNWMN3o94kooJTRRwoWVhvYXFYklVls-Xkk/exec",

    headers: {

        "Content-Type": "application/x-www-form-urlencoded"

    }

});

export default api;