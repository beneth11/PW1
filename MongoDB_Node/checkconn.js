async function run(client) {
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
}

module.exports = run;
