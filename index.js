const Express = require("express");

const app = Express();
const port = 3003;

app.use(Express.json());

app.use(Express.static("public"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
