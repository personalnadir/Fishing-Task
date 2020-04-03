import React from 'react';
import Rule from './Rule';
import free from './images/instructions/free_choice.png';

export default function InstructionPageTen() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>When your boat leaves the regulated territory, the fishing restrictions are no longer relevant and so the rules to accept or reject the catch no longer apply</li>
				<li>Whenever this happens, you will have a <b>free choice what to do with your catch.</b></li>
				<li>It is now entirely up to you whihc of the four buttons you choose to press.</li>
				<li>This time, there won't be any practice, so please let you know when you are ready to start</li>
			</ul>

			<div className="HalfWidth">
				<div className="ColumnTextSpan">
					<span className="SmallRule Free">
						Free Choice
					</span>
					<br />
					<br />
					<img
						className="InstructionImages"
						src={free}
					/>
				</div>
			</div>
		</div>
	);
}
