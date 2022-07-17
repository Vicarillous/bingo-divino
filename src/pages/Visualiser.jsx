import React, { useState, useEffect, useContext } from "react";
import context from "../Context";

import "../styles/Visualiser.css";

export const Visualiser = () => {
	const { selectedNumbers } = useContext(context);

	const [lastNumbers, setLastNumbers] = useState([]);
	const [ballsQuantity, setBallsQuantity] = useState(12);

	useEffect(() => {
		setLastNumbers(selectedNumbers.slice(-ballsQuantity));
	}, [selectedNumbers]);

	return (
		<>
			<div className="flex justify-center my-6">
				{lastNumbers.length !== 0 && (
					<div className="bg-slate-100 w-96 h-96 rounded-full flex items-center justify-center text-[15rem] shrink-0 font-bold text-slate-900 bola">
						{lastNumbers[lastNumbers.length - 1]}
					</div>
				)}
			</div>
			<ul className="flex gap-3 absolute bottom-0 right-0 m-6">
				{lastNumbers.map((number, i) => {
          if (number === lastNumbers[lastNumbers.length - 1] ) {
            return null;
          }

					return (
						<li
							key={i}
							className="bg-slate-100 rounded-full w-32 h-32 flex items-center justify-center text-7xl shrink-0 font-medium text-slate-900 bola"
						>
							<button className="w-full h-full">{number}</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};
