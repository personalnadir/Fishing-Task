import React from 'react';
import cross from './images/fixation_cross.png';
import fish from './images/fish/phase1practice/Fish4.png';
import crab from './images/fish/phase1practice/Crab2.png';

export default function InstructionPageFive() {
	return (
		<div className = "InstructionPage">
			<ul className = "InstructionTextBullets">
				<li>Fishermen sell their catch on the market for the the best possible price. We will ask you to sell not only your own catch, but also that of your colleagues and you should try to make as much money as you can.</li>
				<li>Each trial starts with <b>a fixation cross,</b> which will appear briefly to tell you to get ready to respond quickly.
				    <div className = "SmallBox">
            			<span className="ImageVerticalAlignHelper"></span>
			          	<img
			              alt="Fixation Cross"
			              src={cross}
			              className="CatchImage SmallCross"
			            />
		          		<div className="Outline Black"></div>
        				<span className="TextEmphasis RightLegend">Attention!</span>
			        </div>
				</li>
				<li>You are then shown a <b>picture of your catch,</b> some of which will be <b>liable to tax</b> whilst others will be <b>eligible for subsidies.</b> For example:
				  <div className = "TopMargin">
				  	<div className = "QuarterWidth JustifyRight MiddleAlignment">
				  		<span className="TextEmphasis Small">Liable to tax!</span>
				  	</div>
				  	<div className = "QuarterWidth">
					  	<div className = "SmallBox">
	            			<span className="ImageVerticalAlignHelper"></span>
							<img
								alt="Subsidy"
								src={fish}
								className="CatchImage SmallImage"
							/>
	            	   		<div className="Outline Black"></div>
	            	   	</div>
            	   	</div>
            	   	<div className = "QuarterWidth">
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
				  		<span className="TextEmphasis Small">Eligible for subsidy!</span>
			  		</div>
				  </div>

		        </li>
			</ul>
		</div>
	);
}
