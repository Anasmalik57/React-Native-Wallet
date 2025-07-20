import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // here we just kept it simple.
    // in a real-world-app you'd like to put the userld or ipAddress as your key 
    const { success } = await ratelimit.limit("my-rate-limit"); // a hardcoded identifier

    if (!success) {
      res
        .status(429)
        .json({ message: "Too many requests,  Please try again later" });
    }
    // elseCAse
    next();
  } catch (error) {
    console.log("RateLimit Error");
    next(error);
  }
};

export default rateLimiter;
