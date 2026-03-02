import { User } from "../../models/user.model.js";
import { hasPassword } from "../../helpers/helper.js";

/**
 * UserController class to handle user related operations
 */
class UserController {
  constructor(User) {
    this.User = User;
  }

  /**
   * Get all users
   * @param {*} req
   * @param {*} res
   * @returns
   */
  getAllUsers = async (req, res) => {
    const response = await this.User.find().select("-password -__v");

    return res.status(200).json({
      message: "All Users",
      data: response,
    });
  };

  /**
   * Create a new user
   * @param {*} req
   * @param {*} res
   */
  createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = await hasPassword(password);
    const response = await this.User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User created successfully",
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
    const response = await this.User.findById(id).select("-password -__v");
    return res.status(200).json({
      message: "User Details",
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
    const { name, email, password } = req.body;
    const hashPassword = await hasPassword(password);

    const response = await this.User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashPassword,
      },
      {
        new: true,
      },
    ).select("-password -__v");
    return res.status(200).json({
      message: "User updated successfully",
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
    const response = await this.User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted successfully",
      data: response,
    });
  };
}

export default new UserController(User);
