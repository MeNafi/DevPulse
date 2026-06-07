import {pool} from "./index"

export const createSchema = async (): Promise<void>  => {

   const usersTable = `
   
   CREATE TABLE IF NOT EXISTS users (
       
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password TEXT NOT NULL,
   role VARCHAR(50) NOT NULL DEFAULT 'contributor',
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   
   )
   
   `


   const issuesTable = `
   
   CREATE TABLE IF NOT EXISTS issues (
   id SERIAL PRIMARY KEY,
   title VARCHAR(150) NOT NULL,
   description TEXT NOT NULL,
   type VARCHAR(50) NOT NULL,
   status VARCHAR(80) NOT NULL DEFAULT 'open',
   reporter_id INTEGER NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   
   )
   
   `

   try {
      await pool.query(usersTable);
      await pool.query(issuesTable);
      console.log("Database Tables Verified and Created Successfully.")
   } catch (error) {
      console.log("Error Creating Database Tables:", error);
      throw error;
   }
      
}