// // convert-schema.ts
// import * as fs from 'fs';
// import * as path from 'path';
// import { compileFromFile } from 'json-schema-to-typescript';
// if (require.main === module) {
// 	// Define default paths relative to the script location
// 	const defaultInputDir = path.join(__dirname, '..', '..', 'schema');
// 	const defaultOutputDir = path.join(__dirname, '..', 'types');

// 	// Get input and output directories from command-line arguments or use defaults
// 	const args = process.argv.slice(2);
// 	const inputDir = args[0] ? path.resolve(args[0]) : defaultInputDir;
// 	const outputDir = args[1] ? path.resolve(args[1]) : defaultOutputDir;

// 	// Ensure the output directory exists
// 	if (!fs.existsSync(outputDir)) {
// 		fs.mkdirSync(outputDir, { recursive: true });
// 	}

// 	// Read all JSON files from the input directory and generate TypeScript types
// 	fs.readdir(inputDir, (err, files) => {
// 		if (err) {
// 			console.error('Error listing schema files:', err);
// 			return;
// 		}

// 		files.forEach(file => {
// 			if (path.extname(file) === '.json') {
// 				compileFromFile(path.join(inputDir, file))
// 					.then(ts => fs.writeFileSync(path.join(outputDir, `${path.basename(file, '.json')}.d.ts`), ts))
// 					.catch(error => console.error(`Error processing ${file}:`, error));
// 			}
// 		});
// 	});
// }