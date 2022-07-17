import React, { useState, useEffect, useContext } from "react";
import context from "../Context";

import "../styles/Visualiser.css";

export const Stream = () => {
	const { selectedNumbers } = useContext(context);

	const [lastNumbers, setLastNumbers] = useState([]);
	const [ballsQuantity, setBallsQuantity] = useState(12);

	useEffect(() => {
		setLastNumbers(selectedNumbers.slice(-ballsQuantity));
	}, [selectedNumbers]);

	return (
		<>
			<ul className="flex gap-3 absolute bottom-0 right-0 m-6">
				{lastNumbers.map((number, i) => {
					return (
						<li
							key={i}
							className={`bg-slate-100 rounded-full h-36 w-36 text-7xl flex items-center justify-center shrink-0 font-medium text-slate-900 bola`}
						>
							<button className="w-full h-full">{number}</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};
