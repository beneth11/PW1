async function midHighEndResturants(client) {
  const cursor = client
    .db("data")
    .collection("restaurants")
    .find({
      grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } },
    });

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      console.log();
      console.log(`${i + 1}. ${JSON.stringify(result, null, 2)}`);
    });
  }
}

module.exports = midHighEndResturants;
