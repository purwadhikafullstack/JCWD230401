const { check, validationResult } = require("express-validator");

//untuk login/auth belom

module.exports = {
  checkUser: async (req, res, next) => {
    try {
      console.log("request path", req.path); //for testing DELETE later
      if (req.path == "/register") {
        await check("name")
          .notEmpty()
          .isLength({ max: 255 })
          .withMessage(
            "Name must not be empty and must be less than or equal to 255 characters"
          )
          .matches(/^[a-zA-Z ]+$/)
          .withMessage("Name must only contain letters and spaces")
          .run(req);

        await check("email")
          .notEmpty()
          .isEmail()
          .withMessage("Invalid email address/field is empty")
          .run(req);

        await check("phone")
          .notEmpty()
          .isMobilePhone("id-ID")
          .withMessage("Invalid phone number")
          .run(req);
      }

      await check("password")
        .notEmpty()
        .isStrongPassword({
          minLength: 6,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 0,
        })
        .withMessage(
          "Password must be at least 6 characters, includes a number, one uppercase letter, and one lowercase letter"
        )
        .run(req);

      const validation = validationResult(req);
      console.log("Validation result : ", validation); //for testing DELETE later

      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          success: false,
          message: "Validation invalid",
          error: validation.errors,
        });
      }
    } catch (error) {
      console.log("checkUser validator error :", error);
      next(error);
    }
  },
};
