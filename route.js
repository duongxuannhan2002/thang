import express from "express"
import { get1Nft, getMarket, postMarket, postTran, putOwner, putSold } from "./controller.js";
import path from "path"
import fs from "fs"
import multer from "multer";

const route = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Tạo thư mục 'uploads' nếu chưa tồn tại
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

route.get('/get-market', getMarket)
route.get('/get-1nft',get1Nft)
route.post('/post-market',upload.single('file'), postMarket )
route.post('/post-tran',postTran)
route.post('/put-owner',putOwner)
route.post('/put-sold',putSold)

export default route