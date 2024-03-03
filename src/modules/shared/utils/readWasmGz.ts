import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Reads a contract code file and returns it as a Buffer.
 * @param filePath The relative or absolute path to the contract code file.
 * @returns A Buffer containing the contract code file's contents.
 */
export function readContractCode(filePath: string): Buffer {
    const resolvedPath = join(process.cwd(), filePath);

    try {
        return readFileSync(resolvedPath);
    } catch (error) {
        // Perform type check on error
        if (error instanceof Error) {
            throw new Error(`Error reading contract code file: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred while reading the contract code file`);
        }
    }
}
