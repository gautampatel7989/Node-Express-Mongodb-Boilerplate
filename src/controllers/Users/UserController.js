import { User } from "../../models/user.model.js";
import messages from "../../resources/responseMessages.js";
import userService from "../../services/user.service.js";

/**
 * UserController class to handle user related operations
 */
class UserController {
  constructor(User, userService) {
    this.User = User;
    this.userService = userService;
  }

  /**
   * Get all users
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getAllUsers = async (req, res) => {
    const response = await this.userService.fetchAllUsers();

    return res.status(200).json({
      message: messages.ALL_USERS,
      data: response,
    });
  };

  /**
   * Create a new user
   * @param {*} req
   * @param {*} res
   */
  createUser = async (req, res) => {
    const response = await this.userService.create(req.body);

    res.status(201).json({
      message: messages.USER_CREATED,
      data: response,
    });
  };

  /**
   * Get user by id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getUserById = async (req, res) => {
    const { id } = req.params;
    const response = await this.userService.fetchUserById(id);
    return res.status(200).json({
      message: messages.USER_DETAILS,
      data: response,
    });
  };

  /**
   * Update user details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  updateUser = async (req, res) => {
    const { id } = req.params;
    const response = await this.userService.update(id, req.body);
    return res.status(200).json({
      message: messages.USER_UPDATED,
      data: response,
    });
  };

  /**
   * Delete user by id
   * @param {*} req
   * @param {*} res
   * @returns
   */
  deleteUser = async (req, res) => {
    const { id } = req.params;
    const response = await this.userService.delete(id);
    return res.status(200).json({
      message: messages.USER_DELETED,
      data: response,
    });
  };
}

export default new UserController(User, userService);
