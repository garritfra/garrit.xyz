const path = require("path");

module.exports = {
	output: "export",
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	webpack: function (config, { dev, isServer }) {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader",
		});
		return config;
	},
};
