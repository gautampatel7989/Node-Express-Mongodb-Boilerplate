import { User } from "../models/user.model.js";
import { hasPassword } from "../helpers/helper.js";
import UserRepository from "../repositories/UserRepository.js";

class UserService {
  constructor(User) {
    this.User = User;
  }

  /**
   * Get all users
   */
  fetchAllUsers = async () => {
    return await UserRepository.findAll();
  };

  /**
   * Create User
   *
   * @param {Object} data - User data to create a new user
   * @returns {Promise<Object>} - Created user object
   */
  create = async (data) => {
    const { password, ...rest } = data;
    const hashedPassword = await hasPassword(password);
    return await UserRepository.create({ ...rest, password: hashedPassword });
  };

  /**
   * Fetch user by ID
   *
   * @param {string} id - User ID
   * @returns {Promise<Object>} - User object
   */
  fetchUserById = async (id) => {
    return await UserRepository.findById(id);
  };

  update = async (id, data) => {
    const { password, ...rest } = data;
    const updateData = { ...rest };
    if (password) {
      updateData.password = await hasPassword(password);
    }
    return await UserRepository.update(id, updateData);
  };

  delete = async (id) => {
    return await UserRepository.delete(id);
  };
}

export default new UserService(User);
