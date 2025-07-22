import axios from "axios";
import qs from "qs";

const service = axios.create({
    baseURL: `${process.env.REACT_APP_API}/v1`,
    paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "comma", encodeValuesOnly: true })
    },
});

export { service };