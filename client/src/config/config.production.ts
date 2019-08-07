import { Config } from "./config";
var url = process.env.REACT_APP_SERVER_URL;
const config: Config = {
    apiUrl: url ? url : window.location.origin,
};

export default config;