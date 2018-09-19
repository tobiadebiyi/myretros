import devConfig from "./config.development";
import prodConfig from "./config.production";

const env = process.env.NODE_ENV;

let config = env === "development" ? devConfig : prodConfig;

export default config;