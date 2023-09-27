import pino from "pino";
import { env } from "~/env.mjs";

// create pino logger
const log = pino({
  enabled: env.NEXT_PUBLIC_LOG_ENABLE,
  level: "trace",
});

export default log;
