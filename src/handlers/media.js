const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

const blobPath = path.join(__dirname, '../../media/blobs');
const postsPath = path.join(__dirname, '../../media/posts');

const upload = multer({ limits: { fileSize: 30000000 } });
const mediaValidator = upload.single('file');

const uploadMedia = async (req, res) => {
  const imageId = uuid.v4();
  const extension = req.file.mimetype.replace(/(.*?)\//g, '');
  const filename = `media_${imageId}.${extension}`;
  const buffer = await sharp(req.file.buffer).resize(300, 200).toBuffer();
  fs.writeFileSync(`${blobPath}/${filename}`, buffer);
  res.json({ image: filename });
};

const moveMedia = (files) => {
  files.forEach((file) => {
    fs.renameSync(`${blobPath}/${file}`, `${postsPath}/${file}`);
  });
};

module.exports = { mediaValidator, uploadMedia, moveMedia };
