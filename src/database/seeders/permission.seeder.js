import PermissionModel from "../../models/Permission.model.js";

const Permissions = [
  // user
  { name: "user.create", display_name: "Create User" },
  { name: "user.read", display_name: "View Users" },
  { name: "user.update", display_name: "Update User" },
  { name: "user.delete", display_name: "Delete User" },

  // product
  { name: "product.create", display_name: "Create Product" },
  { name: "product.read", display_name: "View Products" },
  { name: "product.update", display_name: "Update Product" },
  { name: "product.delete", display_name: "Delete Product" },

  // FAQ
  { name: "faq.create", display_name: "Create FAQ" },
  { name: "faq.read", display_name: "View FAQ" },
  { name: "faq.update", display_name: "Update FAQ" },
  { name: "faq.delete", display_name: "Delete FAQ" },
];

export const seedPermissions = async () => {
  for (const permission of Permissions) {
    const exists = await PermissionModel.findOne({
      name: permission.name,
    });

    if (!exists) {
      await PermissionModel.create(permission);
    }
    console.log(`Permission ${permission.name} seeds completed`);
  }
};
