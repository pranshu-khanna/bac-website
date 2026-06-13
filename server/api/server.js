require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes");
const { startResultsRefreshScheduler } = require("./services/resultsFetcher");

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
  const clientBuild = path.join(__dirname, "../../client/build");
  app.use(express.static(clientBuild));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientBuild, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
  startResultsRefreshScheduler();
});
