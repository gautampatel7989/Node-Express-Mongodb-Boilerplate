import PermissionModel from "../models/Permission.model.js";

class PermissionRepository {
  async create(data) {
    return PermissionModel.create(data);
  }

  async getAll() {
    return PermissionModel.find({ deleted_at: null });
  }

  async findByName(name) {
    return PermissionModel.findOne({ name, deleted_at: null });
  }

  async findById(id) {
    return PermissionModel.findOne({ _id: id, deleted_at: null });
  }

  async update(id, data) {
    return PermissionModel.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  async softDelete(id) {
    return PermissionModel.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { returnDocument: "after" },
    );
  }
}

export default new PermissionRepository();
