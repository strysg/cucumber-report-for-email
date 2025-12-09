import fs from 'fs';

/**
 * Gets json object of read a json file.
 * @param filePath file path of json file
 */
function readJson(filePath: string): any {
  const rawdata = fs.readFileSync(filePath, { encoding: 'utf8' });
  return JSON.parse(rawdata);
}

/**
 * Gets text object of read a txt file.
 * @param filePath file path of json file
 */
function readTxt(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Returns a boolean value if the sent path is a directory
 * @param path contains the file path as string
 * @returns boolean value
 */
function isDirectory(path: string): boolean {
  try {
    const dir = fs.lstatSync(path);
    return dir.isDirectory();
  } catch (e) {
    return false;
  }
}

export { readJson, isDirectory, readTxt };
