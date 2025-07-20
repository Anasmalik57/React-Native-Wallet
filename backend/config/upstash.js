import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import "dotenv/config";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

// Limits requests upto 100 request per 60 second to overcome server rash and overwhelming

export default ratelimit;
