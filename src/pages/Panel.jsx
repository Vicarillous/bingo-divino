import React, { useContext } from "react";
import context from "../Context";

export const Panel = ({ sendMessage, reset, removeLastNumber }) => {
	const { selectedNumbers } = useContext(context);

	return (
		<div className="m-3">
			<ul className="flex flex-wrap gap-3">
				{[...Array(75)].map((_, i) => {
					i++;

					return (
						<li
							key={i}
							className={`bg-slate-200 h-24 w-24 md:w-16 md:h-16 text-5xl md:text-xl rounded-full flex items-center justify-center ${
								selectedNumbers.includes(i)
									? "bg-red-500 text-white"
									: ""
							}`}
						>
							<button
								onClick={() => sendMessage(i)}
								className="w-full h-full"
							>
								{i}
							</button>
						</li>
					);
				})}
			</ul>
			<button
				onClick={() => reset()}
				className="bg-slate-500 text-white text-lg rounded-lg px-6 py-3 my-3 hover:bg-slate-600 active:bg-red-500"
			>
				Resetar
			</button>
			<button
				onClick={() => removeLastNumber()}
				className="bg-slate-500 text-white text-lg rounded-lg px-6 py-3 my-3 hover:bg-slate-600 active:bg-red-500"
			>
				Remover último número
			</button>
		</div>
	);
};
