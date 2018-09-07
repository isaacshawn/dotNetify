import styled from 'styled-components';
import { Element } from 'dotnetify-elements';
import * as utils from '../utils';

const Select = styled.select`
	width: 8rem;
	margin-left: 1rem;
	font-weight: 500;
	background-color: transparent;
	&:focus {
		background-color: transparent;
	}
`;

export const frameworkSelectEvent = utils.createEventEmitter();
export let currentFramework = window.localStorage['framework'] || 'React';

frameworkSelectEvent.subscribe((framework) => {
	if (framework) {
		currentFramework = framework;
		window.localStorage['framework'] = currentFramework;
	}
});

export default class SelectFramework extends Element {
	handleChange = (value) => {
		frameworkSelectEvent.emit(value);
		this.dispatch(value);
		this.props.onChange(value);
	};

	componentDidMount() {
		if (this.value !== currentFramework) this.dispatch(currentFramework);
	}

	render() {
		return (
			<Select className="form-control" value={currentFramework} onChange={(e) => this.handleChange(e.target.value)}>
				<option>React</option>
				<option>Knockout</option>
			</Select>
		);
	}
}
