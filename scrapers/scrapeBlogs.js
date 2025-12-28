const axios = require("axios");
const Article = require("../models/Article");
const mongoose = require("mongoose");
require("dotenv").config();

async function scrapeBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Fetching blogs via WP API...");

    const { data } = await axios.get(
      "https://beyondchats.com/wp-json/wp/v2/posts?per_page=100&order=asc"
    );

    console.log("Total blogs fetched:", data.length);

    // oldest 5 articles (since ascending order)
    const oldestFive = data.slice(0, 5).map((post) => ({
      title: post.title.rendered.replace(/(<([^>]+)>)/gi, "").trim(),
      url: post.link,
      content: post.content.rendered.replace(/(<([^>]+)>)/gi, "").trim(),
      publishedDate: post.date,
      isUpdated: false
    }));

    for (const article of oldestFive) {
  await Article.updateOne(
    { url: article.url },  // match existing by URL
    { $set: article },     // update if exists
    { upsert: true }       // insert if does not exist
  );
}


    console.log("Successfully saved 5 oldest articles!");
    process.exit(0);

  } catch (err) {
    console.error("Scraping Error:", err.message);
    process.exit(1);
  }
}

scrapeBlogs();
