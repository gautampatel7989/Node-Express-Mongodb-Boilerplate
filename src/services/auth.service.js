import AuthRepository from "../repositories/AuthRepository.js";
import {
  generateToken,
  hasPassword,
  comparePassword,
} from "../helpers/helper.js";
import messages from "../resources/responseMessages.js";
import Role from "../models/Role.model.js";
import RolePermissionModel from "../models/RolePermission.model.js";

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

    // Populate role and permissions
    let populatedUser = await user.populate("role");
    if (!populatedUser.role) {
      // Assign default user role if none
      const userRole = await Role.findOne({ name: "user" });

      if (userRole) {
        populatedUser.role = userRole;
        // Update the user in DB
        await AuthRepository.update(populatedUser._id, { role: userRole._id });
      }
    }
    let permissions = [];
    if (populatedUser.role) {
      if (populatedUser.role.all) {
        // If role has all permissions, get all permissions
        const allPermissions = await RolePermissionModel.find({
          role_id: populatedUser.role._id,
        }).populate("permission_id");
        permissions = allPermissions.map((rp) => rp.permission_id.name);
      } else {
        const rolePermissions = await RolePermissionModel.find({
          role_id: populatedUser.role._id,
        }).populate("permission_id");
        permissions = rolePermissions.map((rp) => rp.permission_id.name);
      }
    }
    console.log("role::", populatedUser.role);
    // return both token and user details (without password)
    const safeUser = {
      _id: populatedUser._id,
      name: populatedUser.name,
      email: populatedUser.email,
      role: populatedUser.role,
      permissions: permissions,
      isAdmin: populatedUser.role && populatedUser.role.name === 'admin',
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

    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      const err = new Error("Default user role not found");
      err.status = 500;
      throw err;
    }

    const hashed = await hasPassword(data.password);
    const created = await AuthRepository.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role: userRole._id,
    });

    // strip password before returning
    const { password, ...rest } = created.toObject();
    return rest;
  }
}

export default new AuthService();
