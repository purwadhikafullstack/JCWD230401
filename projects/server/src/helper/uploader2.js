const multer = require("multer");
const fs = require("fs");
const { join } = require("path");

const uploader2 = (directory, filePreFix) => {
  // directory = alamat, prefix itu kode khusus untuk menggambarkan itu gambar apa
  // Define default directory storage
  let defaultDir = join(__dirname, "../public");

  // Multer Configuration
  // 1. config storage location
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const storeDir = directory ? defaultDir + directory : defaultDir; // kalau parameter directory tidak ada akan langsung ke upload di folder public tanpa dibuatkan folder
      if (fs.existsSync(storeDir)) {
        console.log(`Directory ${storeDir} exist ✅`);
        cb(null, storeDir);
      } else {
        fs.mkdir(storeDir, { recursive: true }, (error) => {
          // recursive karena mkdir tdk bisa buat sub folder
          if (error) {
            console.log("error create directory : ", error);
          }
          cb(error, storeDir);
        });
      }
    },
    filename: (req, file, cb) => {
      console.log("cek original name", file.originalname);
      console.log("cek file  :", file);
      let ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      console.log("check extension", ext);

      let newName = filePreFix + Date.now() + "." + ext;
      console.log("New Name : ", newName);
      cb(null, newName);
    },
  });

  // 2. Config file filter
  const fileFilter = (req, file, cb) => {
    const extFilter = /\.(jpg|jpeg|png|webp|avif)/;
    let checkExt = file.originalname.toLowerCase().match(extFilter);
    if (checkExt) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Your file extension is denied"));
    }
  };

  // 3. set file size limit
  const limits = {
    fileSize: 1024 * 1024 * 2, // 2MB
  };

  // 4. Return multer
  return multer({ storage, fileFilter, limits });
};

module.exports = uploader2;
