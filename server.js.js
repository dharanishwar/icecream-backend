// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BILL_FILE = path.join(__dirname, 'bills.json');

// Ensure file exists
if (!fs.existsSync(BILL_FILE)) fs.writeFileSync(BILL_FILE, JSON.stringify([]));

app.post('/api/bill', (req, res) => {
  try {
    const bill = req.body;
    const all = JSON.parse(fs.readFileSync(BILL_FILE, 'utf8'));
    all.push({ id: Date.now(), ...bill });
    fs.writeFileSync(BILL_FILE, JSON.stringify(all, null, 2));
    return res.json({ success: true, message: 'Saved' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Stub for send-whatsapp
// Replace this with real integration (Twilio, Vonage, or WhatsApp Business API)
app.post('/send-whatsapp', (req, res) => {
  const { to, message } = req.body;
  console.log('SEND WHATSAPP REQUEST:', to, message);

  // Simulate success
  return res.json({ success: true, message: 'Message queued (stub).' });

  // For real provider you would call provider API and return provider's result.
});

// optional route to fetch all bills for admin
app.get('/api/bills', (req, res) => {
  try {
    const all = JSON.parse(fs.readFileSync(BILL_FILE, 'utf8'));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Cannot read bills' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
