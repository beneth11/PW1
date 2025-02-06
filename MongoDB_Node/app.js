const { MongoClient } = require("mongodb");

require("dotenv").config();
const uri = process.env.URI;

const client = new MongoClient(uri);

const findListings = require("./sample_abnb.js");
const run = require("./checkconn.js");
const listDatabases = require("./listdbs.js");

const findListingsV2 = require("./sample_abnbV2.js");
const runV2 = require("./checkconnV2.js");
const listDatabasesV2 = require("./listdbsV2.js");

const restaurants = require("./restaurants.js");

async function main() {
  try {
    await client.connect();
    await restaurants(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);
