import React from 'react';
import { Table as TableBuilder } from '../table';
import css from './style.css';


class Table extends React.Component {
	constructor() {
		super();
		this.state = {
			type: "type1",
			roots: "فعل",
			options : { letters : "فعل", group : "maadhi", type : "type1" }
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateRoots(e) {
		this.setState({ roots : e.target.value});
	}
	onChange(e) {
		this.setState({type : e.target.value});
	}
	updateCheck(e) {
		this.setState({ advanced: e.target.checked });
	}
	onSubmit(e) {
		e.preventDefault();
		var options = this.state.options;
		options.type = this.state.type.split('-')[0];
		options.advanced = this.state.type.split('-').length === 2;
		options.letters = this.state.roots;
		this.setState({ options })
	}

	render() {
		var options = this.state.options;
		var table = new TableBuilder(options);

		var words = [];
		for(var i = 0; i < 15; i++) {
			words.push(<tr><td>{table.words.active[i]}</td><td>{table.words.passive[i]}</td></tr>)
		}
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" value={this.state.roots} onChange={e => this.updateRoots(e)} />
					<select value={this.state.type} onChange={this.onChange}>
						<optgroup label="Simple">
							<option data-category="simple">type1</option>
							<option data-category="simple">type2</option>
							<option data-category="simple">type3</option>
							<option data-category="simple">type4</option>
							<option data-category="simple">type5</option>
							<option data-category="simple">type6</option>
						</optgroup>
						<optgroup label="Advanced">
							<option value="type1-a">type1</option>
							<option value="type2-a">type2</option>
							<option value="type3-a">type3</option>
							<option value="type4-a">type4</option>
							<option value="type5-a">type5</option>
							<option value="type6-a">type6</option>
							<option value="type7-a">type7</option>
							<option value="type8-a">type8</option>
						</optgroup>
					</select>
					<input type="checkbox" checked={this.state.advanced} onChange={e => this.updateCheck(e)} />
					<button type="submit">submit</button>
				</form>
				<table>
					<thead>
						<tr>
							<th>Maadhi</th>
							<th>Mudari</th>
						</tr>
					</thead>
					<tbody>
						{words}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Table;