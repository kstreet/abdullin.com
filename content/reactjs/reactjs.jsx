// start example reactjs__simple-component
var TodoList = React.createClass({
	// optional declaration of expected props (immutable properties)
	propTypes: {
		items: React.PropTypes.arrrayOf(string).required
	},
	// render method
	render: function() {
		var createItem = function(itemText) {
			return <li>{itemText}</li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}
}); 
// end example
