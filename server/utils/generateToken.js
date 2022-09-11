import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: "3d",
  });
};
export default generateToken;
