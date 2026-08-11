require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes");
const { startLeaderboardRefreshScheduler } = require("./services/leaderboardFetcher");

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: [CLIENT_URL, /^http:\/\/192\.168\.\d+\.\d+:\d+$/],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  // Vite build output lives in client/dist (not create-react-app's client/build)
  const clientBuild = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientBuild));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientBuild, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
  startLeaderboardRefreshScheduler();
});
