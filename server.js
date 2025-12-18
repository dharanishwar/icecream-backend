const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Ice Cream Backend Running");
});

// SAVE BILL
app.post("/api/bill", (req, res) => {
  console.log("Bill received:", req.body);
  res.json({ success: true });
});

// SEND WHATSAPP (DUMMY – API READY)
app.post("/send-whatsapp", (req, res) => {
  const { to, message } = req.body;

  console.log("WhatsApp request:", to, message);

  // Later integrate Twilio / Meta API here
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
