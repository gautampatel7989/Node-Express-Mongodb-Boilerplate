import { User } from "../models/user.model.js";

class AuthRepository {
  /**
   * Find a user by email
   * @param {String} email
   * @returns {Promise<Object|null>}
   */
  async findByEmail(email) {
    return User.findOne({ email });
  }

  /**
   * Create a new user document
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async create(userData) {
    return User.create(userData);
  }

  /**
   * Update a user document
   * @param {String} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
}

export default new AuthRepository();