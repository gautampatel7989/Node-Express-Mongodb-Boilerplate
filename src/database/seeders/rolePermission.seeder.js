import Role from "../../models/Role.model.js";
import PermissionModel from "../../models/Permission.model.js";
import RolePermissionModel from "../../models/RolePermission.model.js";

export const SeedRolePermissions = async () => {
  const executiveRole = await Role.findOne({ name: "executive" });
  const user = await Role.findOne({ name: "user" });

  const executivePermissions = [
    "user.read",
    "product.create",
    "product.read",
    "product.update",
    "faq.read",
  ];

  const userPermissions = ["product.read", "faq.read"];

  const assignPermissions = async (role, permissions) => {
    for (const permissionName of permissions) {
      const permission = await PermissionModel.findOne({
        name: permissionName,
      });
      if (!permission) continue;
      const exists = await RolePermissionModel.findOne({
        role_id: role._id,
        permission_id: permission._id,
      });
      if (!exists) {
        await RolePermissionModel.create({
          role_id: role._id,
          permission_id: permission._id,
        });
      }
    }
  };

  await assignPermissions(executiveRole, executivePermissions);
  await assignPermissions(user, userPermissions);

  console.log("Role permissions seeds completed");
};
