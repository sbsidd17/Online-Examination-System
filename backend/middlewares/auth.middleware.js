import jwt from "jsonwebtoken"
import "dotenv/config"

const auth = (req, res, next) => {
    const token = req.cookies.token;
    
  
    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Not Aurthorised",
          });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRATE);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(404).send({ msg: error.message });
    }
  };