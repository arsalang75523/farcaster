const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// AirStack API Key
const AIRSTACK_API_KEY = "13827f8b8c521443da97ed54d4d6a891d";

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint to fetch likes data
app.get("/api/likes/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const query = {
      query: `
        query GetUserLikes {
          likes(
            filter: {
              user: { eq: "${userId}" },
              timestamp: { gte: "${getLastYearTimestamp()}" }
            }
          ) {
            totalCount
          }
        }
      `,
    };

    const response = await axios.post(
      "https://api.airstack.xyz/graphql",
      query,
      {
        headers: {
          Authorization: AIRSTACK_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const likesCount = response.data.data.likes?.totalCount || 0;
    res.json({ userId, likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from AirStack." });
  }
});

// Helper: Get last year's timestamp
function getLastYearTimestamp() {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  return lastYear.toISOString();
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
