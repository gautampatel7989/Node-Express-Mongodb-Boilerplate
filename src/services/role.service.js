import roleRepository from "../repositories/RoleRepository.js";

class RoleService {
  async fetchAllRoles() {
    return await roleRepository.getAll();
  }

  async createRole(data, userId) {
    const role = await roleRepository.create({
      ...data,
      created_by: userId,
    });

    if (data.permissions_ids?.lenght) {
      await roleRepository.assignPermissions(role._id, data.permissions_ids);
    }
    return role;
  }

  async updateRole(roleId, data) {
    const role = await roleRepository.update(roleId, data);
  }

  async getRoleWithPermissions(roleId) {
    const role = await roleRepository.findById(roleId);
    // const permissions = await roleRepository.getPermissions(roleId);

    return {
      role,
      // permissions,
    };
  }

  async deleteRole(roleId) {
    return await roleRepository.softDelete(roleId);
  }
}

export default new RoleService();
