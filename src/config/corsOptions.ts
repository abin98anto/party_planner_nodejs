export const corsOptions = {
  origin: ["https://sff2-second.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
