import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedRoles } from "./role.seeder.js";
import { seedPermissions } from "./permission.seeder.js";
import { SeedRolePermissions } from "./rolePermission.seeder.js";

dotenv.config();

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    await seedRoles();
    await seedPermissions();
    await SeedRolePermissions();
    console.log("All seeds completed");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeders:", error);
    process.exit(1);
  }
};

runSeeders();
