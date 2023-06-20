const multer = require('multer');

// Налаштування збереження завантаженого фото
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Шлях до теки, де будуть зберігатися завантажені файли
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
