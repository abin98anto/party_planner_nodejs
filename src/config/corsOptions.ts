export const corsOptions = {
  origin: ["http://localhost:5173", "https://party-planner-six.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
