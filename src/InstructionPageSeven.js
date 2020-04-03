import React from 'react';
import cross from './images/fixation_cross.png';
import example from './images/instructions/subsidy_example.png'
import fish from './images/fish/phase1practice/Stimulus_orange_Fish4_cropped.png';
import crab from './images/fish/phase1practice/Stimulus_orange_Crab2_cropped.png'

export default function InstructionPageSeven() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>Equally, <b>there will only be one button that lets you get a subsidy.</b> Again, which button varies from fish to fish and from crab to crab. Here is an example:</li>
					<div className = "QuarterWidth Centre">
	            	   	<div className = "SmallBox">
	            			<span className="ImageVerticalAlignHelper"></span>
					        <img
					            alt="Tax"
					            src={fish}
					            className="CatchImage SmallImage"
					          />
					        <div className="Outline Black"></div>
				        </div>
			       </div>
		            <div className = "QuarterWidth MiddleAlignment">
				  		<span className="TextEmphasis Small">Eligible for <b>subsidy!</b></span>
			  		</div>
				<div className = "TopMargin">
					<div>
						<div className = "FifteenthWidth">
						</div>
						<div className = "HalfWidth JustifyCentre">
							<span className="TextEmphasis Small Grey">Pressing any of the other buttons means that you will <b>gain nothing.</b></span>
				  	    </div>
						<div className = "QuarterWidth JustifyCentre">
							<span className="TextEmphasis Small">By pressing this button, you will <b>get a subsidy.</b></span>
				  	    </div>
				  	</div>
			  	    <img
			  	    	className = "Centre"
			  	    	alt="Tax Example"
			  	    	src={example}
			  	    />
			  	    <br />
			  	    <div className = "QuarterWidth">

					</div>
			  	    <div className = "HalfWidth JustifyCentre">
						<span className="TextEmphasis Small"><b>Responding quickly</b> increases your financial gain</span>
			  	    </div>
		  	    </div>
			</ul>
		</div>
	);
}
