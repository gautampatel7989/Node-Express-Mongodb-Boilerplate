import RolePermissionModel from "../models/RolePermission.model.js";

const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: User has no role assigned",
        });
      }
      if (req.user.role.all) {
        return next();
      }
      const permission = await RolePermissionModel.find({
        role_id: req.user.role._id,
      }).populate("permission_id");

      const hasPermission = permission.some(
        (p) => p.permission_id.name === permissionName,
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden: You don't have permission to access this resource",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default checkPermission;
