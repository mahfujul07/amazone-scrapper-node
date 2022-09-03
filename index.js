const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

const generateScrapperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scrapper API");
});

// Get Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { apiKey } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`
    );

    res.send(JSON.parse(response));
  } catch (error) {
    res.send(error);
  }
});

// Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { apiKey } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.send(JSON.parse(response));
  } catch (error) {
    res.send(error);
  }
});

// Get Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { apiKey } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.send(JSON.parse(response));
  } catch (error) {
    res.send(error);
  }
});

// Get Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { apiKey } = req.query;

  try {
    const response = await request(
      `${generateScrapperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.send(JSON.parse(response));
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT);
