import DBConnection from './DBConnection';
import Queries from './Queries';

class User {
  static async checkUser({ email, password }) {
    await DBConnection.query(Queries.userTable.createTable);

    const { rows } = await DBConnection.query(Queries.userTable.isUserExist, [email, password]);

    if (!rows[0]) return false;

    return rows[0];
  }
}

export default User;
