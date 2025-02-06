async function runV2(client) {
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
  const result = await client.db("admin").command({ hello: 1 });
  const hosts = result.hosts || [];

  console.log("Hosts:", hosts);
}

module.exports = runV2;
