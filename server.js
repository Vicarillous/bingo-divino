const express = require("express");
const { resolve } = require("path");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

var port = process.env.PORT || 3000;

app.use(cors());

const server = http.createServer(app);

let selectedNumbers = [];

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	//console.log(`New client connected: ${socket.id}`);
	io.emit("update_numbers", selectedNumbers);

	socket.on("add_number", (data) => {
		if (!selectedNumbers.includes(data)) {
			selectedNumbers.push(data);
			io.emit("update_numbers", selectedNumbers);
		}
	});

	socket.on("remove_number", (data) => {
		if (selectedNumbers.includes(data)) {
			selectedNumbers.splice(selectedNumbers.indexOf(data), 1);
			io.emit("update_numbers", selectedNumbers);
		}
	});

	socket.on("reset", () => {
		selectedNumbers = [];
		io.emit("update_numbers", selectedNumbers);
	});
});

app.use("/", express.static(resolve(__dirname, "./dist")));

server.listen(port, () => console.log(`Server started on port ${port}`));
