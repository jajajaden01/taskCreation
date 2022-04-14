import User from '../models/User';
import UserToken from '../helpers/UserToken';

class UserController {
  static async signin(req, res) {
    try {
      const userExist = await User.checkUser(req.body);

      if (!userExist) {
        return res.status(401).json({ status: res.statusCode, error: 'Incorrect Email or Password' });
      }

      const token = UserToken.generateToken({
        id: userExist.id,
        firstName: userExist.firstname,
        email: userExist.email,
        loggedIn: true,
      });

      return res.status(200).header('token', token).json({
        status: res.statusCode,
        message: 'User is successfully logged in',
        data: {
          token,
          firstName: userExist.firstname,
          email: userExist.email,
          username: userExist.username,
          loggedIn: true,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: error.message,
      });
    }
  }
}

export default UserController;
