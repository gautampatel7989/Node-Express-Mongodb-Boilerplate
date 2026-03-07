import RoleModel from "../models/Role.model.js";
import RolePermissionModel from "../models/RolePermission.model.js";

class RoleRepository {
  async create(data) {
    return RoleModel.create(data);
  }

  async findById(id) {
    return RoleModel.findOne({ _id: id, deleted_at: null });
  }
  async findByName(name) {
    return RoleModel.findOne({ name, deleted_at: null });
  }
  async getAll() {
    return RoleModel.find({ deleted_at: null });
  }

  async update(id, data) {
    return RoleModel.findOneAndUpdate({ _id: id, deleted_at: null }, data, {
      returnDocument: "after",
    });
  }

  async softDelete(id) {
    return RoleModel.findByIdAndUpdate(id, { deleted_at: new Date() });
  }

  async assignPermissions(roleId, permissionIds) {
    const payload = permissionIds.map((permission_id) => ({
      role_id: roleId,
      permission_id,
    }));

    return RolePermission.insertMany(payload);
  }

  async assignPermissions(roleId, permissionIds) {
    const payload = permissionIds.map((permission_id) => ({
      role_id: roleId,
      permission_id,
    }));

    return RolePermission.insertMany(payload);
  }
}

export default new RoleRepository();
