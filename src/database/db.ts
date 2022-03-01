import { getConnection, createConnection } from "typeorm";
import { Color } from "../entity/color.model";
import { Weather } from "../entity/weather.model";

export async function getOrCreateConnection() {
    try {
        const conn = getConnection();
        if (!conn.isConnected) { 
            await conn.connect();
        }
        return conn;
    } catch (e) {
        return createConnection({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [
                Weather,Color
            ],
            logging: false,
            timezone:'Z'
        });
    }
}