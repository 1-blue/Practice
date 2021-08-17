const express = require("express");
const app = express();

app.set("port", 8080);

app.get("/", (req, res) => {
	res.send(`
	<h1>docker와 node.js</h1>
	<span>수정!!!</span>
	`);
});

app.listen(app.get("port"), () => {
	console.log(`${app.get("port")}번 대기중`);
});
