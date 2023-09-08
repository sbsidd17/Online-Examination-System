import jwt from "jsonwebtoken";
import "dotenv/config"

const auth = (req, res, next) => {
    const jwtToken = req.cookies.jwtToken;
    
  
    if (!jwtToken) {
        return res.status(400).json({
            success: false,
            msg: "Not Aurthorised, Please Login First",
          });
    }
  
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRATE);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(404).send({ msg: error.message });
    }
  };

  export {
    auth
  }