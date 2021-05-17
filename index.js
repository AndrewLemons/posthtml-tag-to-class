module.exports = (userOptions) => {
	let options = Object.assign(
		{
			defaultTag: "div",
			rules: {},
		},
		userOptions
	);

	let defaultTag = options.defaultTag;
	let rules = options.rules;

	return (tree) => {
		let ruleTags = Object.keys(rules).map((tag) => {
			return { tag };
		});

		tree.match(ruleTags, (node) => {
			if (!node.attrs) node.attrs = { class: "" };
			if (!node.attrs.class) node.attrs.class = "";

			node.attrs.class = [
				...rules[node.tag].classes,
				...node.attrs.class.split(" "),
			].join(" ");

			node.tag = defaultTag;
			if (rules[node.tag].tag) node.tag = rules[node.tag].tag;

			return node;
		});
	};
};
