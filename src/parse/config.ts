import dotenv from "dotenv";
import logger from "./logger";
dotenv.config({path: `envs/.env.local`});

const optional = <T extends string | number | boolean>(name: string, fallback: T): string | T =>
    process.env[name] || fallback;

const required = (name: string): string =>
    process.env[name] || (logger.error("🐛 Missing required env var: " + name), process.exit(1));


const apiMountPath = optional("PARSE_MOUNT", "/parse"),
    graphqlMountPath = optional("PARSE_GRAPHQL_MOUNT", "/graphql"),
    port = required("PORT"),
    rootUrl = optional("ROOT_URL", "http://localhost:" + port),
    serverUrl = optional("SERVER_URL", rootUrl + apiMountPath),
    graphqlUrl = optional("GRAPHQL_URL", rootUrl + graphqlMountPath),
    publicServerUrl = optional("PUBLIC_SERVER_URL", serverUrl);

const config = {
    APP_ID: required("APP_ID"),
    APPLICATION_NAME: optional("APPLICATION_NAME", "Parse Server"),
    DASHBOARD_SECRET: required("DASHBOARD_SECRET"),
    DASHBOARD_USERNAME: required("DASHBOARD_USERNAME"),
    DASHBOARD_PASSWORD: required("DASHBOARD_PASSWORD"),
    DATABASE_URI: required("DATABASE_URI"),
    MASTER_KEY: required("MASTER_KEY"),
    MOUNT_PATH: apiMountPath,
    GRAPHQL_MOUNT: graphqlMountPath,
    PARSE_LOG_VERBOSE: optional("PARSE_LOG_VERBOSE", false),
    PARSE_SILENT: optional("PARSE_SILENT", false),
    POOL_SIZE: optional("POOL_SIZE", 5),
    PORT: port,
    PUBLIC_SERVER_URL: publicServerUrl,
    PUSH: optional("PUSH", false),
    ROOT_URL: rootUrl,
    SERVER_URL: serverUrl,
    GRAPHQL_URL: graphqlUrl,
    WORKERS: optional("WORKERS", 1),
};

export default config;
