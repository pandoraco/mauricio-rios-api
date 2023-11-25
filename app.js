const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const port = 8000;
const dudaLink = require('./duda');

app.use(morgan('combined'));
app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
  return res.status(200).send("I'm online");
});

app.post("/get-link", async (req, res) => {
  const { template_id, form_data, option } = req.body;

  try{
        const dudaResponse = await dudaLink(template_id, form_data, option);
        return res.status(200).send(dudaResponse);
  }
  catch(err){
    return res.status(400).send(err);
  }

});

app.listen(port, () => console.log(`Listening on port ${port}`));
