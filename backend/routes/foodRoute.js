import express from "express"
import { addFood,listFood,removeFood } from "../controllers/FoodController.js"
import multer from "multer"

const foodRouter = express.Router();


//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)


foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);






export default foodRouter;


// import express from "express";
// import multer from "multer";
// import { addFood } from "../controllers/FoodController.js";
// import path from "path";
// import fs from "fs";

// const foodRouter = express.Router();

// // Ensure uploads folder exists
// if (!fs.existsSync('./uploads')) {
//   fs.mkdirSync('./uploads');
// }

// // Image Storage Engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve('./uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// // Routes
// foodRouter.post("/add", upload.single("image"), addFood);

// export default foodRouter;

