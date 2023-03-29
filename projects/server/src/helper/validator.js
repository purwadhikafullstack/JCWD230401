const { check, validationResult } = require("express-validator");

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
          .withMessage("Invalid email address")
          .run(req);

        await check("phone")
          .notEmpty()
          .isMobilePhone()
          .withMessage("Invalid phone number")
          .run(req);

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
      } else if (req.path == "/auth") {
        await check("email")
          .if((value, { req }) => !req.body.phone)
          .notEmpty({ nullable: true })
          .isEmail()
          .withMessage("Invalid email address")
          .run(req);

        await check("phone")
          .if((value, { req }) => !req.body.email)
          .notEmpty({ nullable: true })
          .isMobilePhone()
          .withMessage("Invalid phone number")
          .run(req);

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
      } else if (req.path == "/changepw") {
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

        await check("newPassword")
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

        await check("confirmationPassword")
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
      } else if (req.path == "/forgotpw") {
        await check("email")
          .notEmpty()
          .isEmail()
          .withMessage("Invalid email address")
          .run(req);
      } else if (req.path == "/resetpw") {
        await check("newPassword")
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

        await check("confirmationPassword")
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
      } else if (req.path == "/registerastenant") {
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
          .withMessage("Invalid email address")
          .run(req);

        await check("phone")
          .notEmpty()
          .isMobilePhone()
          .withMessage("Invalid phone number")
          .run(req);

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

        // await check("image")
        //   .notEmpty()
        //   .withMessage("Image file is required")
        //   .custom((value, { req }) => {
        //     if (req.file && req.file.mimetype.startsWith("image/")) {
        //       return true;
        //     } else {
        //       throw new Error("File type is not supported");
        //     }
        //   })
        //   .run(req);
      }

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
