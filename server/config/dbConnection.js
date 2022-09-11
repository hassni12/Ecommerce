import mongoose from "mongoose";
export const dbConnection = () => {
  try {
     mongoose.connect(process.env.DATABASE,()=>{
        console.log("Connected to database...".bgCyan.bold );
        
    })
  } catch (error) {
    console.log(`${error.message}`.underline.red.bold);
  }
}
