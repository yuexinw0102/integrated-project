const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const fs = require('fs');
const dao = require('../dao/goodsProductDao.js');
const { query, body, validationResult, Result } = require('express-validator');


// 配置保存的目录
const subFolder = "upload";
const upload_folder = path.join(subFolder,"goodsSlideShow"); // 商品轮播图
const create_folder = (folder) => {
  try {
    fs.accessSync(upload_folder);
  } catch (error) {
    fs.mkdirSync(folder, {recursive: true});
  }
}
create_folder(upload_folder);

// 配置multer中的保存目录及文件名称的规则
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload_folder);
  },
  filename: (req, file, cb) => { 
    console.log(" storage file", file);
    const ext = path.extname(file.originalname);
    // 文件名称命名规则
    cb(null, `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`);
  }
})
// 生成multer对象
const upload = multer({
  dest: 'tmp_uploads', // 临时上传目录
  storage
});

const upload_config = require('config').get('upload_config');

router.post("/", upload.single('file'), function (req, res, next) {
  console.log("Upload req.file", req.file)
  const fileExtArray = req.file.originalname.split(".");// 以点分隔
  console.log('fileExtArray', fileExtArray)
  const ext = fileExtArray[fileExtArray.length - 1];
  console.log('ext', ext)
  const targetPath = req.file.path + "." + ext; // 拼接目标路径
 /*  console.log('req.file...', req.file);
  console.log("保存到数据库的路径是：", path.join(subFolder, path.basename(req.file.path))); */
  fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
    if (err) {
      return res.sendResult(null, 400, "上传文件失败");
    };
    res.json({
      "tmp_path": targetPath,
      "url": upload_config.get("baseURL") + "/" + targetPath
    }, 200, "上传成功");
  })
  // res.send("上传成功")
});
/* 
// 定义添加/编辑验证规则
const rules = [
  body('title').trim().exists().withMessage('title属性必填').bail(),
  body('variety').trim().exists().withMessage('variety属性必填').bail(),
  body('state').trim().exists().withMessage('state属性必填').bail(),
  body('isRecommend').trim().exists().withMessage('isRecommend属性必填').bail(),
  body('id').toInt().optional()
];
router.post("/add.do", ...rules, async function (req, res) { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array()
    })
  }
  try {
    const { result, insertId } = await dao.insert(req.body);
    console.log('add req.body: ', req.body);
    res.json({
      status: result > 0 ? 'success' : 'error',
      message: result > 0 ? '添加成功' : '添加失败',
      insertId: result> 0 ? insertId : 0,
    })
  } catch (err) {
    console.log("err", err);
    res.locals.err = err;
    next();
  }
}) */

module.exports = router;