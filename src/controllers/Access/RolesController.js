import roleService from "../../services/role.service.js";

class RolesController {
  async getAll(req, res, next) {
    try {
      const roles = await roleService.fetchAllRoles();
      res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    console.log("create role controller called");
    try {
      const role = await roleService.createRole(req.body, req.user._id);
      res.status(201).json({
        success: true,
        data: role,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const data = await roleService.getRoleWithPermissions(req.params.id);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await roleService.updateRole(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Role has been updated successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req, res, next) {
    try {
      await roleService.deleteRole(req.params.id);
      res.json({
        success: true,
        message: "Role has been deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new RolesController();
