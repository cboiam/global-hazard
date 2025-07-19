import axios, { Axios } from "axios";

class EONETService {
    private baseRoute = "https://eonet.gsfc.nasa.gov/api/v3";
    private instance: Axios;

    protected constructor(route?: string) {
        this.instance = axios.create({
            baseURL: this.baseRoute + (route ?? ""),
        });
    }

    protected getService = (): Axios => {
        return this.instance;
    };
}

export { EONETService };