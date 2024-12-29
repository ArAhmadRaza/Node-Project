const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY || "hfbv#@#^*568gfdfgjdsf;;./5348";

const authVerify = async (req, res, next) => {
  try {
    // Check if authorization header is provided
    if (!req?.headers?.authorization) {
      return res.status(401).json({
        data: [],
        message: "Error in authVerify",
        error: "Login is required",
      });
    }

    // Extract token from authorization header
    // let token = req?.headers?.authorization.split(" ")[1]; // Extract token if it's in the format "Bearer <token>"
    let token = localStorage.getItem("Token");
    if (!token) {
      return res.status(401).json({
        data: [],
        message: "Error in authVerify",
        error: "Token is missing",
      });
    }

    // Verify the token using jwt
    let decoded = jwt.verify(token, secretKey);
    console.log("decoded:", decoded);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error (e.g., token is invalid or expired)
    return res.status(401).json({
      data: [],
      message: "Error in authVerify",
      error: error.message,
    });
  }
};

module.exports = authVerify;
