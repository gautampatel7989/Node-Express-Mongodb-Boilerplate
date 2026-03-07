import Role from "../../models/Role.model.js";

export const seedRoles = async () => {
  const roles = [
    {
      name: "admin",
      all: true,
    },
    {
      name: "user",
      all: false,
    },
    {
      name: "executive",
      all: false,
    },
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ name: role.name });
    if (!exists) {
      await Role.create(role);
    }
    console.log(`Role ${role.name} seeds completed`);
  }
};
