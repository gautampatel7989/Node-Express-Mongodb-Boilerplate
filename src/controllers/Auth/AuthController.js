import AuthService from "../../services/auth.service.js";
import messages from "../../resources/responseMessages.js";

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  /**
   * login endpoint handler
   */
  loginUser = async (req, res) => {
    try {
      const result = await this.authService.login(req.body);

      // result contains token and user information
      return res.status(200).json({
        message: messages.LOGIN_SUCCESS,
        data: result.user,
        token: result.token,
      });
    } catch (err) {
      const status = err.status || 500;
      const message = err.message || messages.SERVER_ERROR;
      return res.status(status).json({ message });
    }
  };

  /**
   * registration endpoint handler
   */
  registerUser = async (req, res) => {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json({
        message: messages.REGISTER_SUCCESS,
        data: user,
      });
    } catch (err) {
      const status = err.status || 500;
      const message = err.message || messages.SERVER_ERROR;
      return res.status(status).json({ message });
    }
  };
}

export default new AuthController(AuthService);
