import mongoose from "mongoose";

const RolePermissionSchema = new mongoose.Schema(
  {
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    permission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("RolePermission", RolePermissionSchema);
