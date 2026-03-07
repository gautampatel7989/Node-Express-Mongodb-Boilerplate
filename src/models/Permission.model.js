import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

export default mongoose.model("Permission", PermissionSchema);
