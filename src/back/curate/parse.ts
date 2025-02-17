import { uuid } from '@back/util/uuid';
import { CurationIndexImage } from '@shared/curate/OLD_types';
import { AddAppCuration, CurationMeta } from '@shared/curate/types';
import * as Coerce from '@shared/utils/Coerce';
import { IObjectParserProp, ObjectParser } from '@shared/utils/ObjectParser';
import { Platform, Tag } from 'flashpoint-launcher';
import * as fs from 'fs';
import * as path from 'path';
import { CurationFormatObject, parseCurationFormat } from './format/parser';
import { CFTokenizer, tokenizeCurationFormat } from './format/tokenizer';
import { fpDatabase } from '..';

const { str } = Coerce;

/** Return value type of the parseCurationMeta function. */
export type ParsedCurationMeta = {
  /** Existing UUID if present */
  uuid: string;
  /** Group to sort into on Curate Page */
  group: string;
  /** Meta data of the game. */
  game: CurationMeta;
  /** Meta data of the additional applications. */
  addApps: AddAppCuration[];
};

/**
 * Parse a string containing meta for an old style curation
 *
 * @param text A string of curation meta.
 */
export async function parseCurationMetaOld(text: string): Promise<ParsedCurationMeta> {
  // Try parsing the meta text
  const tokens: CFTokenizer.AnyToken[] | undefined = tokenizeCurationFormat(text);
  const rawMeta: CurationFormatObject | undefined = parseCurationFormat(tokens);
  // Convert the raw meta to a programmer friendly object
  return await parseCurationMetaFile(rawMeta);
}

/**
 * Convert a "raw" curation meta object into a more programmer friendly object.
 *
 * @param data "Raw" meta object to convert.
 * @param onError Called whenever an error occurs.
 */
export async function parseCurationMetaFile(data: any, onError?: (error: string) => void): Promise<ParsedCurationMeta> {
  // Default parsed data
  const parsed: ParsedCurationMeta = {
    group: '',
    uuid: uuid(),
    game: {},
    addApps: [],
  };
  // Make sure it exists before calling Object.keys
  if (!data) {
    console.log('Meta empty');
    return parsed;
  }
  // Treat field names case-insensitively
  const lowerCaseData: any = {};
  for (const key of Object.keys(data)) {
    if (data[key]) {
      // Don't copy undefined data - will convert to string, bad!
      lowerCaseData[key.toLowerCase()] = data[key];
    }
  }
  const parser = new ObjectParser({
    input: lowerCaseData,
    onError: onError && (e => onError(`Error while converting Curation Meta: ${e.toString()}`))
  });
  // -- Old curation format --
  parser.prop('author notes',         v => parsed.game.curationNotes       = str(v));
  parser.prop('notes',                v => parsed.game.notes               = str(v));
  // -- New curation format --
  // Single value properties
  parser.prop('application path',     v => parsed.game.applicationPath     = str(v));
  parser.prop('curation notes',       v => parsed.game.curationNotes       = str(v));
  parser.prop('developer',            v => parsed.game.developer           = arrayStr(v));
  parser.prop('extreme',              v => parsed.game.extreme             = str(v).toLowerCase() === 'yes' ? true : false);
  parser.prop('game notes',           v => parsed.game.notes               = str(v));
  parser.prop('languages',            v => parsed.game.language            = arrayStr(v));
  parser.prop('launch command',       v => parsed.game.launchCommand       = str(v));
  parser.prop('original description', v => parsed.game.originalDescription = str(v));
  parser.prop('play mode',            v => parsed.game.playMode            = arrayStr(v));
  parser.prop('publisher',            v => parsed.game.publisher           = arrayStr(v));
  parser.prop('release date',         v => parsed.game.releaseDate         = str(v));
  parser.prop('series',               v => parsed.game.series              = str(v));
  parser.prop('source',               v => parsed.game.source              = str(v));
  parser.prop('status',               v => parsed.game.status              = str(v));
  parser.prop('title',                v => parsed.game.title               = str(v));
  parser.prop('alternate titles',     v => parsed.game.alternateTitles     = arrayStr(v));
  parser.prop('version',              v => parsed.game.version             = str(v));
  parser.prop('library',              v => parsed.game.library             = str(v).toLowerCase()); // must be lower case
  parser.prop('uuid',                 v => parsed.uuid                     = str(v), true);
  parser.prop('group',                v => parsed.group                    = str(v), true);
  parser.prop('primary platform',     v => parsed.game.primaryPlatform     = str(v), true);
  parser.prop('mount parameters',     v => parsed.game.mountParameters     = str(v), true);
  parser.prop('ruffle support',       v => parsed.game.ruffleSupport       = str(v), true);
  if (lowerCaseData.genre)      { parsed.game.tags = await getTagsFromStr(arrayStr(lowerCaseData.genre), str(lowerCaseData['tag categories']));  }
  if (lowerCaseData.genres)     { parsed.game.tags = await getTagsFromStr(arrayStr(lowerCaseData.genres), str(lowerCaseData['tag categories'])); }
  if (lowerCaseData.tags)       { parsed.game.tags = await getTagsFromStr(arrayStr(lowerCaseData.tags), str(lowerCaseData['tag categories']));   }
  if (lowerCaseData.platform)   { parsed.game.platforms = await getPlatformsFromStr(arrayStr(lowerCaseData.platform)); }
  if (lowerCaseData.platforms)  { parsed.game.platforms = await getPlatformsFromStr(arrayStr(lowerCaseData.platforms)); }
  if (!parsed.game.primaryPlatform && parsed.game.platforms && parsed.game.platforms.length > 0) {
    parsed.game.primaryPlatform = parsed.game.platforms[0].name;
  }
  // property aliases
  parser.prop('animation notes',      v => parsed.game.notes               = str(v));
  // Add-apps
  parser.prop('additional applications').map((item, label, map) => {
    parsed.addApps.push(convertAddApp(item, label, map[label]));
  });
  // Return
  return parsed;
}

/**
 * Convert a "raw" curation additional application meta object into a more programmer friendly object.
 *
 * @param item Object parser, wrapped around the "raw" add-app meta object to convert.
 * @param label Label of the object.
 * @param rawValue Used to generate add apps if using a message or extras label
 */
function convertAddApp(item: IObjectParserProp<any>, label: string | number | symbol, rawValue: any): AddAppCuration {
  const addApp: AddAppCuration = {
    key: uuid()
  };
  const labelStr = str(label);
  switch (labelStr.toLowerCase()) {
    case 'extras': // (Extras add-app)
      return generateExtrasAddApp(str(rawValue));
    case 'message': // (Message add-app)
      return generateMessageAddApp(str(rawValue));
    default: // (Normal add-app)
      addApp.heading = labelStr;
      item.prop('Heading',          v => addApp.heading         = str(v), true);
      item.prop('Application Path', v => addApp.applicationPath = str(v));
      item.prop('Launch Command',   v => addApp.launchCommand   = str(v));
      break;
  }
  return addApp;
}

// Coerce an object into a sensible string
function arrayStr(rawStr: any): string {
  if (Array.isArray(rawStr)) {
    // Convert lists to ; seperated strings
    return rawStr.join('; ');
  }
  return str(rawStr);
}

function generateExtrasAddApp(folderName: string) : AddAppCuration {
  return {
    key: uuid(),
    heading: 'Extras',
    applicationPath: ':extras:',
    launchCommand: folderName
  };
}

function generateMessageAddApp(message: string) : AddAppCuration {
  return {
    key: uuid(),
    heading: 'Message',
    applicationPath: ':message:',
    launchCommand: message
  };
}

async function getPlatformsFromStr(platformsStr: string): Promise<Platform[]> {
  const splitPlatforms = platformsStr.split(';');
  const platforms = [];

  for (let index = 0; index < splitPlatforms.length; index++) {
    const platformName = splitPlatforms[index];
    const trimmedName = platformName.trim();
    if (trimmedName !== '' && trimmedName !== '[object Object]') {
      let platform = await fpDatabase.findPlatform(trimmedName);
      if (!platform) {
      // Tag doesn't exist, make a new one
        platform = await fpDatabase.createPlatform(trimmedName);
      }
      if (platform !== null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (platforms.findIndex(t => t.id === platform!.id) === -1) {
          platforms.push(platform);
        }
      }
    }
  }

  return platforms;
}

async function getTagsFromStr(tagsStr: string, tagCategoriesStr: string): Promise<Tag[]> {
  const splitTags = tagsStr.split(';');
  const splitCategories = tagCategoriesStr.split(';');
  const tags = [];

  for (let index = 0; index < splitTags.length; index++) {
    const tagName = splitTags[index];
    const trimmedName = tagName.trim();
    const category = splitCategories.length > index ? splitCategories[index].trim() : undefined;
    if (trimmedName !== '' && trimmedName !== '[object Object]') {
      try {
        let tag = await fpDatabase.findTag(trimmedName);
        if (!tag) {
          // Tag doesn't exist, make a new one
          tag = await fpDatabase.createTag(trimmedName, category);
        }
        if (tag !== null) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (tags.findIndex(t => t.id === tag!.id) === -1) {
            tags.push(tag);
          }
        }
      } catch (error) {
        log.error('Launcher', `Unknown Curation Error loading Tag - ${trimmedName} - ${error}`);
      }
    }
  }

  return tags;
}

export async function loadCurationIndexImage(filePath: string): Promise<CurationIndexImage> {
  return fs.promises.access(filePath, fs.constants.F_OK)
  .then(() => {
    const image: CurationIndexImage = {
      exists: true,
      fileName: path.basename(filePath),
      filePath: filePath,
      version: 0
    };
    return image;
  })
  .catch(() => {
    const image: CurationIndexImage = {
      exists: false,
      fileName: path.basename(filePath),
      filePath: filePath,
      version: 0
    };
    return image;
  });
}
