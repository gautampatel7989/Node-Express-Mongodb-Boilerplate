import { User } from "../models/user.model.js";

class UserRepository {
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
    return User.findByIdAndUpdate(id, data, { new: true }).select(
      "-password -__v",
    );
  }

  /**
   * Find a user by ID
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    return User.findById(id).select("-password -__v");
  }

  /**
   * Find all users
   * @returns {Promise<Array>}
   */
  async findAll() {
    return User.find().select("-password -__v");
  }

  /**
   * Delete a user document
   * @param {String} id
   * @returns {Promise<Object|null>}
   */
  async delete(id) {
    return User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
