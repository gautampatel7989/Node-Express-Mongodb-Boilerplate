import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import authCheck from "./middleware/AuthMiddleware.js";

dotenv.config();

const app = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

// Connect to database before starting server
await connectDb();

const logger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Url: ${req.url}`);
  console.log(`Request Date: ${new Date().toISOString()}`);
  next();
};

// Global middleware
app.use(express.json());
app.use(cors());

// auth route
app.use("/auth", authRoute);

const apiRoutes = express.Router();
// prefix /api url
apiRoutes.use(authCheck);

// users routes
apiRoutes.use("/users", router);
// products routes
apiRoutes.use("/products", productRoutes);

app.use(logger);

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Application is health!" });
});

// Error-handling middleware must have four parameters: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack || "error");
  // respond with error
  res.status(500).json({
    msg: "something went wrong!",
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
