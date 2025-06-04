const express = require('express');
const router = express.Router();
const Letter = require('../models/Letter');
const auth = require('../middleware/authMiddleware');

// Fungsi untuk tanggal random dalam tahun
function getRandomDateInYear(year) {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Kirim surat dengan tahun pengiriman
router.post('/letter', auth, async (req, res) => {
  const { content, fileUrl, deliveryYear } = req.body;
  const randomDate = getRandomDateInYear(deliveryYear);
  const letter = new Letter({
    userId: req.userId,
    content,
    fileUrl,
    deliveryDate: randomDate
  });
  await letter.save();
  res.status(201).json({ message: 'Surat berhasil dikirim!', deliveryDate: randomDate });
});

// Ambil surat yang sudah waktunya dibuka
router.get('/letter', auth, async (req, res) => {
  const now = new Date();
  const letters = await Letter.find({
    userId: req.userId,
    deliveryDate: { $lte: now }
  }).sort({ deliveryDate: 1 });

  res.json(letters);
});

module.exports = router;
