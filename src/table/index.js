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

		this.updateRoots = this.updateRoots.bind(this);
		this.updateType = this.updateType.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	updateRoots(e) {
		this.setState({ roots : e.target.value});
	}
	updateType(e) {
		this.setState({type : e.target.value});
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
		options.group = "maadhi";
		var table = new TableBuilder(options);
		var maadhi = table.words;

		options.group = "mudari";
		var table = new TableBuilder(options);
		var mudari = table.words;

		var words = [];
		for(var i = 0; i < 15; i++) {
			words.push(
				<tr>
					<td>{maadhi.active[i]}</td>
					<td>{maadhi.passive[i]}</td>
					<td>{mudari.active[i]}</td>
					<td>{mudari.passive[i]}</td>
				</tr>
				)
		}

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div>
						<label for="roots">Roots</label>
						<input type="text" value={this.state.roots} onChange={this.updateRoots} />
					</div>

					<div>
						<label for="roots">Type</label>
						<select value={this.state.type} onChange={this.updateType}>
							<optgroup label="Simple">
								<option value="type1">nasara</option>
								<option value="type2">daraba</option>
								<option value="type3">sameya</option>
								<option value="type4">fataha</option>
								<option value="type5">karuma</option>
								<option value="type6">haseba</option>
							</optgroup>
							<optgroup label="Advanced">
								<option value="type1-a">akrama</option>
								<option value="type2-a">sarrafa</option>
								<option value="type3-a">qaatala</option>
								<option value="type4-a">taqabbala</option>
								<option value="type5-a">taqaabala</option>
								<option value="type6-a">ijtanaba</option>
								<option value="type7-a">istansara</option>
								<option value="type8-a">infatara</option>
							</optgroup>
						</select>
					</div>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
				<table>
					<thead>
						<tr>
							<th className="grouping" colSpan="2">Maadhi</th>
							<th className="grouping" colSpan="2">Mudari</th>
						</tr>
						<tr>
							<th>Active</th>
							<th>Passive</th>
							<th>Active</th>
							<th>Passive</th>
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