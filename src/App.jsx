import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";
import Context from "./Context";
import { Panel } from "./pages/Panel";
import { Visualiser } from "./pages/Visualiser";
import { Stream } from "./pages/Stream";

const socket = io("https://bingo-divino.herokuapp.com");

function App() {
	const [selectedNumbers, setSelectedNumbers] = useState([]);

	let location = useLocation();

	const sendMessage = (number) => {

		if (!selectedNumbers.includes(number)) {
			socket.emit("add_number", number);
		} else {
			socket.emit("remove_number", number);
		}
	};

	const reset = () => {
		socket.emit("reset");
	}

	useEffect(() => {
		socket.on("update_numbers", (data) => {
			setSelectedNumbers(data);
		});

		return () => {
			socket.off("update_numbers");
		};
	}, []);

	return (
		<div className={`min-h-screen h-full max-h-screen ${location.pathname === "/" ? "" : "overflow-hidden"} relative`}>
			<Context.Provider value={{ selectedNumbers }}>
				<Routes>
					<Route
						path="/"
						element={
							<Panel
								sendMessage={sendMessage}
								reset={reset}
								socket={socket}
							/>
						}
					/>
					<Route
						path="/visualiser"
						element={<Visualiser socket={socket} />}
					/>
					<Route
						path="/stream"
						element={<Stream socket={socket} />}
					/>
				</Routes>
			</Context.Provider>
		</div>
	);
}

export default App;
