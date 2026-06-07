import app from "./app"
import {config} from "./config"
import { initDB } from "./db"


const main = async (): Promise<void> => {
    
    try {
        await initDB();
        app.listen(config.port, () =>{
            console.log(`Server Connected On Port: ${config.port}`);
        })
    
    } catch (error) {
        console.error("Connection Failure", error);
        process.exit(1);
    }
   
}
 main();

