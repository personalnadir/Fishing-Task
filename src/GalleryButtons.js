import React from 'react';
import FullScreenVerticalAlign from './FullScreenVerticalAlign';

export default class GalleryButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelected: new Array(props.images.length).fill(false)
		};

		this.handleClick = this.handleClick.bind(this);
	}

	allSelectionsUsed() {
		const {isSelected} = this.state;
		return isSelected.filter(val => val).length >= this.props.maxSelected;
	}

	handleClick(index) {
		let {isSelected} = this.state;
		if (!isSelected[index] && this.allSelectionsUsed()) {
			return;
		}
		isSelected[index] = !isSelected[index];
		this.setState({
			isSelected
		});

		this.props.onSelectionChange(this.props.images[index], isSelected[index], isSelected.filter(val => val).length);
	}

	getSelectedImages() {
		return this.props.images.filter((img, index) => this.state.isSelected[index]);
	}

	render() {
		const {images, cols} = this.props;
		const noFurtherSelections = this.allSelectionsUsed();
		const cellClasses = this.state.isSelected.map(isSelected => "QuestionnaireGalleryCell" + (isSelected? " highlighted" : (noFurtherSelections? " notselected" : "")));
		const tableBody = images.map((img, index) => {
			const cellBody = (<td className="GalleryCell" key={index}>
				<button className = {cellClasses[index]}>
					<img className = "GalleryImage" src={img.path} alt="A crab or fish" onClick = {()=> this.handleClick(index)}/>
				</button>
			</td>);
			return cellBody;
		});

		const rows = [];
		for (let i = 0; i < images.length; i+= cols) {
			const row = tableBody.slice(i, i + cols);
			rows.push((
				<tr key = {i}>
					{row}
				</tr>
			));
		}

		return (
			<table className="GalleryTable">
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}