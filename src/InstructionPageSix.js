import React from 'react';
import example from './images/instructions/tax_example.png';
import crab from './images/fish/phase1practice/Crab2.png';

export default function InstructionPageSix() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>For each crab or fish, <b>there will only be one button that lets you avoid paying tax.</b> Which button varies from fish to fish and from crab to crab. Here is an example:</li>
					<div className = "QuarterWidth Centre">
	            	   	<div className = "SmallBox">
	            			<span className="ImageVerticalAlignHelper"></span>
					        <img
					            alt="Tax"
					            src={crab}
					            className="CatchImage SmallImage"
					          />
					        <div className="Outline Black"></div>
				        </div>
			       </div>
		            <div className = "QuarterWidth MiddleAlignment">
				  		<span className="TextEmphasis Small">Tax is due!</span>
			  		</div>
				<div className = "TopMargin">
					<div>
						<div className = "QuarterWidth">
						</div>
						<div className = "QuarterWidth JustifyCentre">
							<span className="TextEmphasis Small">By pressing this button you can <b>avoid paying tax.</b></span>
				  	    </div>
						<div className = "HalfWidth JustifyCentre">
							<span className="TextEmphasis Grey Small">Pressing any of the other buttons means that you will <b>have to pay tax.</b></span>
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
						<span className="TextEmphasis Small"><b>Responding quickly</b> reduces your financial loss</span>
			  	    </div>
		  	    </div>
			</ul>
		</div>
	);
}
