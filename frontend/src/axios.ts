import axios from "axios";
import qs from "qs";

const service = axios.create({
    baseURL: "http://localhost:5000/v1",
    paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "comma", encodeValuesOnly: true })
    },
});

export { service };