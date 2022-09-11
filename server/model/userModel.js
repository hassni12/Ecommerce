import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 36,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
 

},{
    timestamps:true
  });


 userSchema.methods.matchPassword=async function(enterdPassword){
  return await bcrypt.compare(enterdPassword,this.password)
}
userSchema.pre("save",async function(next){
  if (!this.isModified('password')){
    next()

  }
  const salt =await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})


 export default mongoose.model("User",userSchema)



