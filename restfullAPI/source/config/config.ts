import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_DATABSE = process.env.MYSQL_DATABASE || 'testdb';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_password = process.env.MYSQL_PASSWORD || 'root';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABSE,
    user: MYSQL_USER,
    password: MYSQL_password
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_POST || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
