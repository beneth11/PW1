async function listDatabasesV2(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    const formattedSize = formatSize(db.sizeOnDisk);
    console.log(` - ${db.name} - ${formattedSize}`);
  });
}

function formatSize(sizeInBytes) {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (sizeInBytes >= 1024 && i < units.length - 1) {
    sizeInBytes /= 1024;
    i++;
  }

  return `${sizeInBytes.toFixed(2)} ${units[i]}`;
}

module.exports = listDatabasesV2;
