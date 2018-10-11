const express = require("express");
const moment = require("moment");
require("moment-timezone");

const app = express();

app.use(express.static("client"));

app.get("/api/timestamp/:date_string?", (req, res) => {
  if (!req.params.date_string) {
    const date = new Date();
    const unix = date.getTime();
    const utc = moment(unix).tz.format("ddd, DD MMM YYYY H:mm:ss z");
    res.send({
      unix,
      utc
    });
  }
});

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
