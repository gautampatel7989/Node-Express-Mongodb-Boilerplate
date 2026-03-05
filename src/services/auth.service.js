import AuthRepository from "../repositories/AuthRepository.js";
import {
  generateToken,
  hasPassword,
  comparePassword,
} from "../helpers/helper.js";
import messages from "../resources/responseMessages.js";

class AuthService {
  /**
   * Authenticate user and return token + user info
   * @param {{email:string,password:string}} data
   */
  async login(data) {
    const user = await AuthRepository.findByEmail(data.email);

    if (!user) {
      const err = new Error(messages.INVALID_CREDENTIALS);
      err.status = 401;
      throw err;
    }

    const match = await comparePassword(data.password, user.password);
    if (!match) {
      const err = new Error(messages.INVALID_CREDENTIALS);
      err.status = 401;
      throw err;
    }

    const token = generateToken(user);

    // return both token and user details (without password)
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return { token, user: safeUser };
  }

  /**
   * Register a new user
   * @param {{name:string,email:string,password:string}} data
   */
  async register(data) {
    // check if email exists
    const existing = await AuthRepository.findByEmail(data.email);
    if (existing) {
      const err = new Error(messages.EMAIL_ALREADY_REGISTERED);
      err.status = 400;
      throw err;
    }

    const hashed = await hasPassword(data.password);
    const created = await AuthRepository.create({
      name: data.name,
      email: data.email,
      password: hashed,
    });

    // strip password before returning
    const { password, ...rest } = created.toObject();
    return rest;
  }
}

export default new AuthService();
