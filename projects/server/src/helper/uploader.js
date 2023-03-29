const multer = require("multer");
const fs = require("fs");

const uploader = (directory, filePreFix) => {
  // 1. default directory storage
  let defaultDir = "./src/public";

  // 2. storage location config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const storeDir = directory ? defaultDir + directory : defaultDir;
      if (fs.existsSync(storeDir)) {
        console.log(`Directory ${storeDir} exist ✅`);
        cb(null, storeDir);
      } else {
        fs.mkdir(storeDir, { recursive: true }, (error) => {
          if (error) {
            console.log("error create directory : ", error);
          }
          cb(error, storeDir);
        });
      }
    },
    filename: (req, file, cb) => {
      console.log("cek file original name :", file.originalname);
      let ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      console.log("check extension : ", ext);

      let newName = filePreFix + Date.now() + "." + ext;
      console.log("New Name : ", newName);
      cb(null, newName);
    },
  });

  //3. file filter config
  const fileFilter = (req, file, cb) => {
    const extFilter = /\.(jpg|jpeg|png)/;
    let checkExt = file.originalname.toLowerCase().match(extFilter);
    if (checkExt) {
      cb(null, true);
    } else {
      cb(new Error("Your file extension is denied ❌"), false);
    }
  };

  //4. return multer
  return multer({storage, fileFilter})
};

module.exports = uploader;
