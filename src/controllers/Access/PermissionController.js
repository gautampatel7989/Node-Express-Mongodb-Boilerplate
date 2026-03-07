import permissionService from "../../services/permission.service.js";

class PermissionController {
  async getAll(req, res, next) {
    try {
      const permissions = await permissionService.fetchAllPermissions();
      res.status(200).json({
        success: true,
        message: "Permissions fetched successfully",
        data: permissions,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const permission = await permissionService.createPermission(
        req.body,
        req.user._id,
      );
      res.status(201).json({
        success: true,
        message: "Permission created successfully",
        data: permission,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const permission = await permissionService.fetchPermissionById(
        req.params.id,
      );
      res.status(200).json({
        success: true,
        message: "Permission fetched successfully",
        data: permission,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const permission = await permissionService.updatePermission(
        req.params.id,
        req.body,
      );
      res.status(200).json({
        success: true,
        message: "Permission updated successfully",
        data: permission,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePermission(req, res, next) {
    try {
      await permissionService.deletePermission(req.params.id);
      res.json({
        success: true,
        message: "Permission deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();
