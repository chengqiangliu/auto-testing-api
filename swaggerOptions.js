const swaggerJSDoc = require('swagger-jsdoc');
//const swaggerDefinition = require('./swaggerDefinition');

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Test Automation API",
			version: "1.0.0",
			description: "A test automation API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;