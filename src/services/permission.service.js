import permissionRepository from "../repositories/PermissionRepository.js";

class PermissionService {
  async fetchAllPermissions() {
    return await permissionRepository.getAll();
  }

  async createPermission(data, userId) {
    const permission = await permissionRepository.create({
      ...data,
      created_by: userId,
    });

    return permission;
  }

  async updatePermission(permissionId, data) {
    const permission = await permissionRepository.update(permissionId, data);
  }

  async getPermission(permissionId) {
    const permission = await permissionRepository.findById(permissionId);

    return {
      permission,
    };
  }

  async deletePermission(permissionId) {
    return await permissionRepository.softDelete(permissionId);
  }
}

export default new PermissionService();
