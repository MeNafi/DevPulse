import {Pool} from "@neondatabase/serverless"
import { config } from "../config"
import {createSchema} from "./schema"

export const pool = new Pool ({

    connectionString: config.database_url,
});


export const initDB = async () : Promise<void> => {
    try{
        const client = await pool.connect();
        console.log("PostgreSQL Connected Successfully!");
        client.release()
    
        await createSchema();
    
    } catch(error) {

        console.log("Database Connection Failed!", error);
        process.exit(1);

    }
    
};