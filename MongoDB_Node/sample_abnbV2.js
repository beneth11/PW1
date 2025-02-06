async function findListingsV2(client, resultsLimit) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find();

  let foundResults = [];

  for await (const result of cursor) {
    if (result.review_scores?.review_scores_rating >= 80 && result.name?.trim()) {
      foundResults.push(result);
    }
    if (foundResults.length >= resultsLimit) break;
  }

  console.log(`Found ${foundResults.length} listing(s):`);

  foundResults.forEach((result, index) => {
    console.log(`\n${index + 1}. Name: ${result.name}`);
    console.log(` Listing URL: ${result.host?.host_url || "N/A"}`);
    console.log(` Review scores rating: ${result.review_scores.review_scores_rating}`);
  });
}

module.exports = findListingsV2;
