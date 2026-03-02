import { User } from "../../models/user.model.js";
import { comparePassword } from "../../helpers/helper.js";
import jwt from "jsonwebtoken";

class AuthController {
  constructor(User) {
    this.User = User;
  }

  generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
  };

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.User.findOne({ email });

      if (user && (await comparePassword(password, user.password))) {
        return res.status(200).json({
          message: "Login Successfully",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token: this.generateToken(user._id),
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
}

export default new AuthController(User);
