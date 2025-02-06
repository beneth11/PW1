class contactsDAO {
  // métodos para CRUD
  // CREATE
  static async insertData(client, doc) {
    const ok = await client.insertOne(doc);
    try {
      return ok;
    } catch (err) {
      console.log(err);
    }
  }
  // READ
  static async getUsers(client) {
    const cursor = await client
      .find()
      .project({ _id: 0 })
      .sort({ username: 1 })
    try {
      const results = await cursor.toArray();
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  static async getHistory(client) {
    const cursor = await client
      .find()
      .project({ _id: 0 })
    try {
      const results = await cursor.toArray();
      return results;
    } catch (err) {
      console.log(err);
    }
  }
  // UPDATE
  static async updateSenhaByEmail(client, email, tel) {
    const docs = await client.updateOne(email, tel);
    try {
      return docs;
    } catch (err) {
      console.log(err);
    }
  }
  // DELETE
  static async deleteUserByNome(client, nome) {
    const ok = await client.deleteOne(nome);
    try {
      return ok;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = contactsDAO;
