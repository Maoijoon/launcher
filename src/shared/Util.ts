import * as axiosImport from 'axios';
import { AdditionalApp, Game, Platform, Tag, TagFilterGroup } from 'flashpoint-launcher';
import * as fs from 'fs';
import * as path from 'path';
import { DownloadDetails } from './back/types';
import { AppConfigData } from './config/interfaces';
import { parseVariableString } from './utils/VariableString';
import { throttle } from './utils/throttle';

export function getFileServerURL() {
  return `http://${window.Shared.backUrl.hostname}:${window.Shared.fileServerPort}`;
}

type ReadFileOptions = { encoding?: BufferEncoding; flag?: string; } | BufferEncoding | undefined;

/**
 * Read and parse a JSON file asynchronously.
 * Wrapper around "fs.readFile()" plus "JSON.parse()".
 *
 * @param path Path of the JSON file.
 * @param options Options for reading the file.
 */
export async function readJsonFile(path: string, options?: ReadFileOptions): Promise<any> {
  return JSON.parse(await fs.promises.readFile(path, options) as string);
}

/**
 * Read and parse a JSON file synchronously.
 * Wrapper around "fs.readFileSync()" plus "JSON.parse()".
 * Throws an error if either the read or parsing fails.
 *
 * @param path Path of the JSON file.
 * @param options Options for reading the file.
 */
export function readJsonFileSync(path: string, options?: ReadFileOptions): any {
  return JSON.parse(fs.readFileSync(path, options) as string);
}

/**
 * Remove the file extension of a filename
 * (Remove everything after the last dot, including the dot)
 *
 * @param filename Filename to remove extension from
 */
export function removeFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) { return filename; }
  return filename.substring(0, lastDotIndex);
}

/**
 * Get the filename of a path or url
 * (get everything after the last slash symbol)
 *
 * @param filePath Path to get filename from
 */
export function getFilename(filePath: string): string {
  return filePath.substring(Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\')) + 1);
}

/**
 * Pad a the end of a string with spaces until the string is of a specified length
 *
 * @param str String to pad
 * @param length Target length of string (max number of spaces to add)
 * @returns String padded with spaces
 *          (or the original string if it's length is equal or longer than the specified length)
 */
export function padEnd(str: string|number, length: number): string {
  str = str + ''; // (Coerce to string)
  return str + ' '.repeat(Math.max(0, length - str.length));
}

/**
 * Pad a the start of a string with spaces until the string is of a specified length
 *
 * @param str String to pad
 * @param length Target length of string (max number of spaces to add)
 * @returns String padded with spaces
 *          (or the original string if it's length is equal or longer than the specified length)
 */
export function padStart(str: string|number, length: number): string {
  str = str + ''; // (Coerce to string)
  return ' '.repeat(Math.max(0, length - str.length)) + str;
}

export type StringifyArrayOpts = {
  /** If spaces and new lines should be trimmed from the start and end of strings in the array. */
  trimStrings?: boolean;
};

/**
 * Write an array to a string in a pretty and readable way
 * Ex. [0,'test',null] => '[ 0, "test", null ]'
 *
 * @param array Array to "stringify"
 * @param opts Options to apply to resulting string
 * @returns Readable text representation of the array
 */
export function stringifyArray(array: Array<any>, opts?: StringifyArrayOpts): string {
  const trimStrings = opts && opts.trimStrings || false;
  // Build string
  let str = '[ ';
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (isString(element)) {
      str += `"${trimStrings ? trim(element) : element}"`;
    } else { str += element; }
    if (i !== array.length - 1) { str += ', '; }
  }
  str += ' ]';
  return str;
}

/**
 * Remove all spaces and new line characters at the start and end of the string.
 *
 * @deprecated Use string.trim()
 * @param str String to trim
 */
function trim(str: string): string {
  let first = 0;
  let last: number = str.length;
  // Find the first non-space non-new-line character
  for (let i = 0; i < str.length; i++) {
    if (!isSpaceOrNewLine(str[i])) {
      first = i;
      break;
    }
  }
  // Find the last non-space non-new-line character
  for (let i = str.length - 1; i >= first; i--) {
    if (!isSpaceOrNewLine(str[i])) {
      last = i+1;
      break;
    }
  }
  // Get the character between the first and last (including them)
  return str.substring(first, last);
}

function isSpaceOrNewLine(char: string): boolean {
  switch (char) {
    case ' ':
    case '\n': return true;
    default:   return false;
  }
}

/**
 * Stringify anything to a json string ready to be saved to a file
 *
 * @param data Data to be stringified
 * @returns JSON string of given data
 */
export function stringifyJsonDataFile(data: any): string {
  return JSON.stringify(data, null, 2).replace(/\n/g, '\r\n');
}

/**
 * Check if all properties of both arguments have strictly equals values,
 * and if both objects have identical properties (same number of props with the same names)
 *
 * @param first First to compare
 * @param second Second to compare
 */
export function shallowStrictEquals(first: any, second: any): boolean {
  for (const key in first) {
    if (!(key in second) || first[key] !== second[key]) {
      return false;
    }
  }
  for (const key in second) {
    if (!(key in first) || first[key] !== second[key]) {
      return false;
    }
  }
  return true;
}

/**
 * Recursively copy values from data to target (for every property of the same name)
 *
 * @param target Target object to copy data to
 * @param source Source object to copy data from
 * @returns Target object
 */
export function recursiveReplace<T = any>(target: T, source: any): T {
  // Skip if source is missing
  if (!source) { return target; }
  // Go through all properties of target
  for (const key in source) {
    // Check if data has a property of the same name
    if (key in (target as any)) {
      const val = source[key];
      // If the value is an object
      if (val !== null && typeof val === 'object') {
        // Go one object deeper and continue copying
        recursiveReplace((target as any)[key], val);
      } else {
        // Copy the value
        (target as any)[key] = val;
      }
    }
  }
  return target;
}

/**
 * Recursively copy and object and its "sub-objects"
 * (WARNING: This will overflow the stack if it tries to copy circular references)
 *
 * @param source Object to copy from
 * @returns New copy of source
 */
export function deepCopy<T>(source: T): T {
  const copy: any = Array.isArray(source) ? [] : {};
  for (const key in source) {
    let val = source[key];
    if (val !== null && typeof val === 'object') {
      val = deepCopy(val);
    }
    copy[key] = val;
  }
  return copy;
}

/**
 * Recursively go down a folder and call back for each file encountered
 *
 * @param options Various options (a shallow copy of this is accessible from the callback)
 * @returns A promise that resolves when either all files have been called back for or recursion is aborted
 */
export async function recursiveDirectory(options: IRecursiveDirectoryOptions): Promise<void> {
  const shared: IRecursiveDirectorySharedObject = {
    options: Object.assign({}, options), // (Shallow Copy)
    abort: false,
  };
  return innerRecursiveDirectory(shared, '');
}

async function innerRecursiveDirectory(shared: IRecursiveDirectorySharedObject, dirPath: string): Promise<void> {
  // Full path to the current folder
  const fullDirPath = path.join(shared.options.directoryPath, dirPath);
  // Get the names of all files and sub-folders
  const files = await fs.promises.readdir(fullDirPath);
  if (shared.abort) { return; }
  if (files.length === 0) { return; }
  for (let i = files.length - 1; i >= 0; i--) {
    // Get the stats of each folder/file to verify if they are a folder or file
    const stats = await fs.promises.stat(path.join(fullDirPath, files[i]));
    if (shared.abort) { return; }
    if (stats.isFile()) {
      const p = shared.options.fileCallback({
        shared: shared,
        filename: files[i],
        relativePath: dirPath,
      });
      if (p) { await p; }
    } else {
      await innerRecursiveDirectory(shared, path.join(dirPath, files[i]));
    }
  }
}

export interface IRecursiveDirectoryOptions {
  /** Folder to start recursion in */
  directoryPath: string;
  /** Called for each file encountered */
  fileCallback: (obj: IRecursiveDirectoryObject) => Promise<void>|void;
}

export interface IRecursiveDirectoryObject {
  /** Shared root object for all callbacks in the same recursive search */
  shared: IRecursiveDirectorySharedObject;
  /** Filename of the current file */
  filename: string;
  /** Relative path to the root folder (NOT including the filename) */
  relativePath: string;
}

export interface IRecursiveDirectorySharedObject {
  /** Options used to start the recursion */
  options: IRecursiveDirectoryOptions;
  /** If true, it will abort the recursion (do not set to anything other than false) */
  abort: boolean;
}

/**
 * Remove the BOM (Byte Order Mark) character from the start of an UTF8 string if it is present.
 *
 * @param str The string to remove the BOM from.
 * @returns The same string but with the BOM removed (or the same string if no BOM was found).
 */
export function stripBOM(str: string): string {
  return str.charCodeAt(0) === 0xFEFF
    ? str.substring(1)
    : str;
}

function isString(obj: any): boolean {
  return typeof obj === 'string' || obj instanceof String;
}

/**
 * Create a copy of an array with all the undefined values taken out (shifting everything along to not leave any empty spaces).
 *
 * @param array Array to copy and clear.
 */
export function clearArray<T>(array: Array<T | undefined>): Array<T> {
  const clear: T[] = [];
  for (const val of array) {
    if (val !== undefined) { clear.push(val); }
  }
  return clear;
}

/**
 * Parse a variable string using a generic get variable value function.
 *
 * @param str String to parse.
 */
// @TODO: Make better variables. Why are we using cwd() ?
/* istanbul ignore next */
export function parseVarStr(str: string, config?: AppConfigData) {
  return parseVariableString(str, (name) => {
    switch (name) {
      case 'os': return process.platform;
      case 'arch': return process.arch;
      case 'cwd': return fixSlashes(process.cwd());
      case 'fpPath': return config ? fixSlashes(config.flashpointPath) : '';
      default: return '';
    }
  });
}

const errorProxySymbol = Symbol('Error Proxy');
const errorProxyValue = {}; // Unique pointer

/**
 * Create a proxy that throws an error when you try to use it.
 *
 * @param title Title to use in the error, usually the name of the variable the error proxy will be set for
 */
export function createErrorProxy(title: string): any {
  return new Proxy({}, {
    // @TODO Make it throw errors for all(?) cases (delete, construct etc.)
    get: (target, p) => {
      if (p === errorProxySymbol) { return errorProxyValue; }
      throw new Error(`You must not get a value from ${title} before it is initialized (property: "${p.toString()}").`);
    },
    set: (target, p) => {
      throw new Error(`You must not set a value from ${title} before it is initialized (property: "${p.toString()}").`);
    },
  });
}

/**
 * Convert a size (in bytes) to a more human readable format.
 *
 * @param size Size in bytes.
 * @param precision Precision of the returned number
 * @returns Size, but in a more human readable format.
 */
export function sizeToString(size: number, precision = 3): string {
  if (size < 1000)       { return `${size}B`; }
  if (size < 1000000)    { return `${(size / 1000).toPrecision(precision)}KB`; }
  if (size < 1000000000) { return `${(size / 1000000).toPrecision(precision)}MB`; }
  return `${(size / 1000000000).toPrecision(precision)}GB`;
}

/**
 * Replace all back-slashes with forward-slashes.
 *
 * @param str String to fix
 */
export function fixSlashes(str: string): string {
  return str.replace(/\\/g, '/');
}

/**
 * Checks whether we can write and read to a folder
 *
 * @param folder folder to check
 */
export async function canReadWrite(folder: string): Promise<boolean> {
  const testPath = path.join(folder, 'test');
  try {
    const fd = await fs.promises.open(testPath, 'w');
    // Cleanup file after testing
    await fd.close();
    await fs.promises.unlink(testPath);
    return true;
  } catch {
    return false;
  }
}

// Courtesy of https://www.paulirish.com/2009/random-hex-color-code-snippets/
export function getRandomHexColor(): string {
  const num = '#'+(Math.random()*(1<<24)|0).toString(16);
  return num.padEnd(7, '0');
}

export function tagSort(tagA: Tag, tagB: Tag): number {
  const catIdA = tagA.category ? tagA.category : tagA.category;
  const catIdB = tagB.category ? tagB.category : tagB.category;
  if (catIdA && catIdB) {
    if (catIdA > catIdB) { return 1;  }
    if (catIdB > catIdA) { return -1; }
  }
  if (tagA.name > tagB.name) { return 1;  }
  if (tagB.name > tagA.name) { return -1; }
  return 0;
}

export async function downloadFile(axios: axiosImport.AxiosInstance, url: string, filePath: string, abortSignal?: AbortSignal, onProgress?: (percent: number) => void, onDetails?: (details: DownloadDetails) => void, options?: axiosImport.AxiosRequestConfig): Promise<number> {
  try {
    const res = await axios.get(url, {
      ...options,
      responseType: 'stream',
      signal: abortSignal
    });
    let progress = 0;
    const contentLength = res.headers['content-length'];
    onDetails && onDetails({ downloadSize: contentLength });
    const progressThrottle = onProgress && throttle(onProgress, 200);
    const fileStream = fs.createWriteStream(filePath);
    return new Promise<number>((resolve, reject) => {
      fileStream.on('close', () => {
        resolve(res.status);
      });
      res.data.on('end', () => {
        fileStream.close();
        onProgress && onProgress(100);
      });
      res.data.on('data', (chunk: any) => {
        progress = progress + chunk.length;
        progressThrottle && progressThrottle((progress / contentLength) * 100);
        fileStream.write(chunk);
      });
      res.data.on('error', async () => {
        fileStream.close();
        await fs.promises.unlink(filePath);
        reject(res.status);
      });
    });
  } catch (error) {
    throw `Error opening Axios request. Do you have internet access?: ${error}`;
  }
}

export function generateTagFilterGroup(tags?: string[]): TagFilterGroup {
  return {
    name: '',
    description: '',
    enabled: true,
    extreme: false,
    tags: tags || [],
    categories: [],
    childFilters: [],
    iconBase64: ''
  };
}

export function compare(a: string, b: string): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

export type FpfssGame = {
  id: string;
  title: string;
  alternate_titles: string;
  series: string;
  developer: string;
  publisher: string;
  platform_name: string;
  platforms_str: string;
  date_added: string;
  date_modified: string;
  play_mode: string;
  status: string;
  notes: string;
  tags_str: string;
  source: string;
  application_path: string;
  launch_command: string;
  release_date: string;
  version: string;
  original_description: string;
  language: string;
  library: string;
  add_apps?: FpfssAddApp[];
  action: string;
  reason: string;
  archive_state: number;
  Deleted: boolean;
  UserID: number;
  tags?: FpfssTag[];
  platforms?: FpfssPlatform[];
  ruffle_support?: string;
}

export type FpfssPlatform = {
  id: number,
  name: string,
  description: string,
  date_modified: string,
}

export type FpfssTag = {
  id: number,
  name: string,
  category: string,
  description: string,
  date_modified: string,
}

export type FpfssAddApp = {
  id: string,
  application_path: string;
  auto_run_before: boolean;
  launch_command: string;
  name: string;
  wait_for_exit: boolean;
  parent_game_id: string;
};

export function mapFpfssGameToLocal(data: any): Game {
  const fg = data as FpfssGame;
  const game: Game = {
    id: fg.id,
    title: fg.title,
    alternateTitles: fg.alternate_titles,
    series: fg.series,
    developer: fg.developer,
    publisher: fg.publisher,
    primaryPlatform: fg.platform_name,
    platforms: fg.platforms_str.split('; ').map(s => s.trim()),
    dateAdded: fg.date_added,
    dateModified: fg.date_modified,
    playMode: fg.play_mode,
    status: fg.status,
    notes: fg.notes,
    tags: fg.tags_str.split('; ').map(s => s.trim()),
    source: fg.source,
    legacyApplicationPath: fg.application_path,
    legacyLaunchCommand: fg.launch_command,
    releaseDate: fg.release_date,
    version: fg.version,
    originalDescription: fg.original_description,
    language: fg.language,
    library: fg.library,
    archiveState: fg.archive_state,
    activeDataOnDisk: false,
    activeDataId: -1,
    playCounter: 0,
    playtime: 0,
    detailedTags: fg.tags?.map<Tag>(t => {
      return {
        id: t.id,
        name: t.name,
        dateModified: t.date_modified,
        aliases: [],
        description: t.description,
        category: t.category
      };
    }) || [],
    detailedPlatforms: fg.platforms?.map<Platform>(p => {
      return {
        id: p.id,
        name: p.name,
        dateModified: p.date_modified,
        aliases: [],
        description: p.description,
      };
    }) || [],
    addApps: fg.add_apps?.map<AdditionalApp>(a => {
      return {
        id: a.id,
        applicationPath: a.application_path,
        autoRunBefore: a.auto_run_before,
        waitForExit: a.wait_for_exit,
        launchCommand: a.launch_command,
        name: a.name,
        parentGameId: a.parent_game_id,
      };
    }) || [],
    ruffleSupport: fg.ruffle_support || '',
  };
  return game;
}

export function mapLocalToFpfssGame(game: Game): FpfssGame {
  console.log(game.dateAdded);
  console.log(game.dateModified);
  const fg: FpfssGame = {
    id: game.id,
    title: game.title,
    alternate_titles: game.alternateTitles,
    series: game.series,
    developer: game.developer,
    publisher: game.publisher,
    platform_name: game.primaryPlatform,
    platforms_str: game.detailedPlatforms?.map(p => p.name).join('; ') || '',
    date_added: game.dateAdded,
    date_modified: game.dateModified,
    play_mode: game.playMode,
    status: game.status,
    notes: game.notes,
    tags_str: game.detailedTags?.map(t => t.name).join('; ') || '',
    source: game.source,
    application_path: game.legacyApplicationPath,
    launch_command: game.legacyLaunchCommand,
    release_date: game.releaseDate,
    version: game.version,
    original_description: game.originalDescription,
    language: game.language,
    library: game.library,
    archive_state: game.archiveState,
    action: '',
    reason: '',
    Deleted: false,
    UserID: 0,
    tags: game.detailedTags?.map<FpfssTag>(t => {
      return {
        id: t.id,
        name: t.name,
        description: t.description,
        date_modified: (new Date(t.dateModified)).toISOString(),
        category: t.category || 'default',
      };
    }) || [],
    platforms: game.detailedPlatforms?.map<FpfssPlatform>(p => {
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        date_modified: (new Date(p.dateModified)).toISOString(),
      };
    }) || [],
    add_apps: game.addApps?.map<FpfssAddApp>(a => {
      return {
        id: a.id,
        application_path: a.applicationPath,
        auto_run_before: a.autoRunBefore,
        wait_for_exit: a.waitForExit,
        launch_command: a.launchCommand,
        name: a.name,
        parent_game_id: a.parentGameId,
      };
    }) || [],
    ruffle_support: game.ruffleSupport,
  };
  return fg;
}
