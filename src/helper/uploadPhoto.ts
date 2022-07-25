import multer from "multer";
import ClientError from "../errorHandler/ClientError";
const uploadMedia = (folder: string, fieldName: string) => {
  let upload: multer.Multer;
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/img/${folder}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(
        null,
        `${folder.slice(0, -1)}-${
          file.originalname.split(".")[0]
        }-${Date.now()}.${ext}`
      );
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new ClientError("please upload an image", 400), false);
  };
  upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  return upload.single(fieldName);
};
export default uploadMedia;
