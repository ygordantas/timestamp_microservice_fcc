const express = require("express");
const moment = require("moment");

const app = express();

app.use(express.static("client"));

app.get("/api/timestamp/:date_string?", (req, res) => {
  const inputDate = req.params.date_string;
  if (!inputDate) {
    const date = new Date();
    res.send({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    if (moment(inputDate, ["x", "X"], true).isValid()) {
      const unix = +moment.unix(inputDate).format("x");
      const utc = moment.unix(inputDate).format("ddd, DD MMM YYYY H:mm:ss");
      res.send({
        unix,
        utc: new Date(utc).toUTCString()
      });
    } else if (
      moment(
        inputDate,
        ["YYYY-MM-DD", "YYYY-M-DD", "YYYY-MM-D"],
        true
      ).isValid()
    ) {
      const date = new Date(inputDate);
      res.send({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    } else {
      res.send({ error: "Invalid Date" });
    }
  }
});

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
