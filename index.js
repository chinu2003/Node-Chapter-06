const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //to use css js and images
app.set("view engine", "ejs"); //use to render ejs

// app.use(function (req, res) {
//   res.send("chal raha hai");
// });

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
    // console.log(files);
  });
});
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
      console.log(err);
    }
  );
  console.log(req.body);
});

app.get("/files/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, details) {
    res.render("show",{filename:req.params.filename, filedata:details})
    console.log(details)
  });
});

// for dynamic route add :
app.get("/profile/:username", function (req, res) {
  // req.params.username
  res.send(req.params.username);
});
app.get("/profile/:username/:age", function (req, res) {
  // req.params.username
  res.send(`welcome ${req.params.username} of age ${req.params.age}`);
});

app.listen(3000, function () {
  console.log("its is running");
});
