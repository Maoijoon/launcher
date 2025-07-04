// Type definitions for non-npm package flashpoint-launcher 12.2
// Project: Flashpoint Launcher https://github.com/FlashpointProject/launcher
// Definitions by: Colin Berry <https://github.com/colin969>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// / <reference types="node" />

/**
 * Based off Microsoft VSCode's extension system (MIT Licensed) https://github.com/Microsoft/vscode
 * Module is created during runtime and injected. Please read the documentation below to understand how to use these types.
 * See https://github.com/FlashpointProject/launcher/blob/develop/docs/extensions.md for Extension documentation.
 * See https://flashpointproject.github.io/launcher_ApiDocs/ (or /docs/api in the repo) for API documentation.
 */

// The types match the ones used internally. Will make it easier to maintain.
// tslint:disable:interface-over-type-literal

// This gets changed manually during development in the project, rule would require changes when updating DT's definitions since resolution is different.
// tslint:disable:no-single-declare-module
// tslint:disable:no-declare-current-package

declare module 'flashpoint-launcher' {
  import { Readable } from 'stream';

  /** Version of the Flashpoint Launcher */
  const version: string;

  /** Data Version of the Flashpoint Launcher */
  const dataVersion: string | undefined;

  /** Path to own extension */
  const extensionPath: string;

  /** Config Data */
  const config: AppConfigData;

  /** Returns most up to date Preferences Data */
  function getPreferences(): AppPreferencesData;
  /**
     * Updates the Preferences data with a partial change.
     * @param data Partial data to apply
     * @param onError Callback for error handling
     * @returns Updated Preferences data
     */
  function overwritePreferenceData(
    data: DeepPartial<AppPreferencesData>,
    onError?: (error: string) => void,
  ): Promise<AppPreferencesData>;

  /**
     * Unloads the current extension
     */
  function unloadExtension(): Promise<void>;
  /**
     * Reloads the current extension
     */
  function reloadExtension(): void;

  /**
     * Get a URL for an extensions file
     * @param filePath Relative path to file from extension path
     */
  function getExtensionFileURL(filePath: string): string;

  /**
     * Unzips a file into a given directory (7zip)
     * @param filePath Path to archive
     * @param outDir Directory to output into
     * @param opts SevenZip Extraction Options
     */
  function unzipFile(filePath: string, outDir: string, opts?: ZipExtractOptions): Promise<void>;

  /**
     * Gets an extension configuration value given its key
     */
  function getExtConfigValue(key: string): any;
  /**
     * Gets an extension configuration value given its key and a new value
     */
  function setExtConfigValue(key: string, value: any): Promise<void>;
  /**
     * Fires when an extension configuration value changes
     */
  const onExtConfigChange: Event<{ key: string, value: any }>;
  /**
     * Focuses the Flashpoint Window
     */
  function focusWindow(): void;

  /**
     * Log functions to properly pass messages to the Logs Page.
     */
  namespace log {
    const trace: (message: string) => void;
    const debug: (message: string) => void;
    const info: (message: string) => void;
    const warn: (message: string) => void;
    const error: (message: string) => void;
    const onLog: Event<ILogEntry>;
  }

  /** Collection of Command related API functions */
  namespace commands {
    /**
         * Register a command to be called by name later
         * @param command Name of the command
         * @param callback Function to run when called
         * @returns Disposable to register to context.subscriptions
         */
    function registerCommand(command: string, callback: (...args: any[]) => any): Disposable;
    /**
         * Registers a set of keyboard shortcuts to a command. This may conflict with existing shortcuts, especially those in the Curate page. Be aware that Windows and Mac require different control keys.
         * See https://github.com/UnicornHeartClub/react-keybind for more details
         * @param command Name of the command
         * @param shortcut Keyboard shortcut(s)
         * @returns Disposable to register to context.subscriptions
         */
    function registerShortcut(command: string, shortcut: string[] | string): Disposable;
  }

  namespace curations {
    /** Loads the Curation Archive at the path
         * @param filePath Path to the archive
         * @param taskId ID of Task to update progress on (See Status Namespace)
         */
    function loadCurationArchive(filePath: string, taskId?: string): Promise<LoadedCuration>;
    /** Get all loaded curations */
    function getCurations(): CurationState[];
    /** Get all curation templates */
    function getCurationTemplates(): Promise<CurationTemplate[]>;
    /**
         * Gets a curation given its folder
         * @param folder Folder name of the curation
         */
    function getCuration(folder: string): CurationState | undefined;
    /**
         * Writes metadata to a loaded curation
         * @param folder Folder name of the curation
         * @param meta Metadata to write
         */
    function setCurationGameMeta(folder: string, meta: CurationMeta): boolean;
    /**
         * Writes metadata to a loaded curation's AddApp
         * @param folder Folder name of the curation
         * @param key Key of the AddApp
         * @param meta AddApp Metadata to write
         */
    function setCurationAddAppMeta(folder: string, key: string, meta: AddAppCurationMeta): boolean;
    /** Selects all given curations (if exist)
         * @param folders Folder names of curations to select
        */
    function selectCurations(folders: string[]): void;
    /**
         * Updates a curations content tree
         * @param folder Folder name of the curation
         */
    function updateCurationContentTree(folder: string): Promise<ContentTree | undefined>;
    /** Creates a new curation
         * @param meta Template Curation Metadata
         */
    function newCuration(meta?: CurationMeta): Promise<CurationState>;
    /**
         * Deletes a curation
         * @param folder Folder name of the curation
         */
    function deleteCuration(folder: string): Promise<void>;
    /**
         * Duplicates a curation
         * @param folder Folder name of curation
         * @returns Folder name of duplicate curation
         */
    function duplicateCuration(folder: string): Promise<string>;
    /**
         * Returns the absolute path to a curations folder
         * @param folder Folder name of the curation
         */
    function getCurationPath(folder: string): string;
    /** Automatically create a curation for the existing game id
         * @param gameId Game ID
         */
    function makeCurationFromGame(gameId: string, skipDataPack?: boolean): Promise<string | undefined>;
    /** Update the content index for a curation
         * @param folder Curation Folder name
         */
    function refreshCurationContent(folder: string): Promise<void>;

    // Events
    const onDidCurationListChange: Event<{ added?: CurationState[], removed?: string[] }>;
    const onDidCurationChange: Event<CurationState>;
    const onWillGenCurationWarnings: Event<{
      curation: LoadedCuration,
      warnings: CurationWarnings
    }>;
  }

  /** Collection of Game related API functions */
  namespace games {
    // Platforms
    /**
         * Finds a platform by its alias name
         * @param name alias of the platform
         * @returns Platform, or null if none exists
         */
    function findPlatformByName(name: string): Promise<Platform | null>;
    /**
         * Returns a list of all platforms including their aliases
         */
    function findPlatforms(): Promise<Platform[]>;
    // Playlist
    /**
         * Finds a playlist given its ID
         * @param playlistId ID of the Playlist
         * @param join Whether to include Playlist Games in the result
         */
    function findPlaylist(playlistId: string, join?: boolean): Playlist;
    /**
         * Finds a playlist given its name
         * @param playlistName Name of the Playlist
         * @param join Whether to include Playlist Games in the result
         */
    function findPlaylistByName(playlistName: string, join?: boolean): Playlist;
    /** Find all Playlists in the database (Playlist Games not returned) */
    function findPlaylists(showExtreme: boolean): Playlist[];
    /**
         * Updates / Creates a Playlist
         * @param playlist Playlist data to save
         */
    function updatePlaylist(playlist: Playlist): Promise<Playlist>;
    /**
         * Removes a playlist
         * @param playlistId Playlist ID to remove
         * @returns Playlist that was removed
         */
    function removePlaylist(playlistId: string): Promise<Playlist | undefined>;

    // Playlist Game
    /**
         * Finds a Playlist Game entry in a Playlist
         * @param playlistId Playlist to search
         * @param gameId Game to find
         */
    function findPlaylistGame(playlistId: string, gameId: string): Promise<PlaylistGame | null>;
    /**
         * Removes a Playlist Game entry from a Playlist
         * @param playlistId Playlist to search
         * @param gameId Game to remove
         */
    function removePlaylistGame(playlistId: string, gameId: string): Promise<PlaylistGame | null>;
    /**
         * Update / Create a Playlist Game entry
         * @param playlistGame Playlist Game entry to save
         */
    function updatePlaylistGame(playlistId: string, playlistGame: PlaylistGame): Promise<PlaylistGame>;
    /**
         * Adds a Game to a Playlist
         * @param playlistId Playlist to add the Game to
         * @param gameId ID of the Game to add
         */
    function addPlaylistGame(playlistId: string, gameId: string): Promise<void>;

    // Games
    /** Returns the total number of games in the database */
    function countGames(): Promise<number>;
    /**
         * Finds a Game given its ID
         * @param id ID of the Game
         */
    function findGame(id: string): Promise<Game | null>;
    /**
         * Finds a selection of Games given filter options
         * @param opts Filter options
         * @param shallow Whether to return ViewGame or Game objects
         */
    // function searchGames(opts: FindGamesOpts): Promise<ResponseGameRange>;
    /**
         * Finds all Games using a Tag
         * @param tag Tag to filter for
         */
    function findGamesWithTag(tag: string): Promise<Game[]>;
    /**
         * Updates / Creates a Game
         * @param game Game data to save
         */
    function updateGame(game: Game): Promise<Game>;
    /**
         * Updates / Creates many Games in a transaction
         * @param games Game data to save
         */
    function updateGames(games: Game[]): Promise<Game[]>;
    /**
         * Removes a Game and all its AddApps
         * @param gameId ID of Game to remove
         */
    function removeGameAndAddApps(gameId: string): Promise<void>;

    // Misc
    /**
         * Returns whether a game is extreme based on its tags.
         * @param game Game to check
         */
    function isGameExtreme(game: Game): boolean;

    // Events
    const onWillLaunchGame: Event<GameLaunchInfo>;
    const onWillLaunchAddApp: Event<AdditionalApp>;
    const onWillLaunchCurationGame: Event<GameLaunchInfo>;
    const onWillLaunchCurationAddApp: Event<AdditionalApp>;
    const onWillUninstallGameData: Event<GameData>;
    const onDidLaunchGame: Event<Game>;
    const onDidLaunchAddApp: Event<AdditionalApp>;
    const onDidLaunchCurationGame: Event<Game>;
    const onDidLaunchCurationAddApp: Event<AdditionalApp>;
    const onDidInstallGameData: Event<GameData>;
    const onDidUninstallGameData: Event<GameData>;

    const onDidUpdateGame: Event<{ oldGame: Game; newGame: Game }>;
    const onDidRemoveGame: Event<Game>;

    const onDidUpdatePlaylist: Event<{ oldPlaylist: Playlist; newPlaylist: Playlist }>;
    const onDidUpdatePlaylistGame: Event<{ oldGame: PlaylistGame; newGame: PlaylistGame }>;
    const onDidRemovePlaylistGame: Event<PlaylistGame>;

    const onWillImportGame: Event<CurationImportState>;
  }

  /** Collection of Game Data related API functions */
  namespace gameData {
    function findOne(id: number): Promise<GameData | null>;
    function findGameData(gameId: string): Promise<GameData[]>;
    function save(gameData: GameData): Promise<GameData>;
    // function importGameData(gameId: string, filePath: string): Promise<GameData>;
    function downloadGameData(gameDataId: number): Promise<void>;
    const onDidImportGameData: Event<GameData>;
  }

  /** Collection of Tag related API functions */
  namespace tags {
    // Tags
    /**
         * Finds a tag given it's ID
         * @param tagId ID of the Tag
         */
    function getTagById(tagId: number): Promise<Tag | null>;
    /**
         * Finds a tag given an alias name
         * @param name Name of the Tag (any matching alias)
         */
    function findTag(name: string): Promise<Tag | null>;
    /**
         * Finds a list of tags that begins with a name (if given)
         * @param name Partial name that a tag starts with
         */
    function findTags(name?: string): Promise<Tag[]>;
    /**
         * Creates a new Tag
         * @param name Name of the primary alias
         * @param categoryName Name of the category to use, Default if none given
         * @param aliases List of extra aliases to register
         */
    function createTag(name: string, categoryName?: string, aliases?: string[]): Promise<Tag | null>;
    /**
         * Updates a Tag
         * @param tag Tag data to save
         */
    function saveTag(tag: Tag): Promise<Tag>;
    /**
         * Removes a Tag (from all Games)
         * @param tagId ID of Tag to remove
         * @param skipWarn If true, warn user before deleting tag from games.
         */
    function deleteTag(tagId: number, skipWarn?: boolean): Promise<void>;

    // Tag Categories
    /**
         * Find a Tag Category by it's ID. (Useful when a Tag doesn't populate it)
         * @param categoryId ID of the Tag Category
         */
    function getTagCategoryById(categoryId: number): Promise<TagCategory | null>;
    /**
         * Find all Tag Categories
         */
    function findTagCategories(): Promise<TagCategory[]>;
    /**
         * Create a new Tag Category
         * @param name Name of the Tag Category
         * @param color Color to give the Tag Category
         */
    function createTagCategory(name: string, color: string): Promise<TagCategory | null>;
    /**
         * Update a Tag Category
         * @param tagCategory Tag Category data to save
         */
    function saveTagCategory(tagCategory: TagCategory): Promise<TagCategory>;
    /**
         * Removes a Tag Category. All owned Tags are moved to the first available Tag Category.
         * @param tagCategoryId ID of the Tag Category to remove
         */
    // function deleteTagCategory(tagCategoryId: number): Promise<boolean>;

    // Tag Suggestions
    /**
         * Finds a list of Tag Suggestions given a string they start with
         * @param name Partial name that a tag starts with
         */
    function findTagSuggestions(name: string): Promise<TagSuggestion[]>;

    // Misc
    /**
         * Merges 2 tags into a single tag.
         * @param mergeData Required data to merge.
         */
    function mergeTags(mergeData: MergeTagData): Promise<Tag>;
  }

  /** Collection of Status related API functions */
  namespace status {
    /**
         * Update any status in the Status State
         * @param key Element to update
         * @param val Value to update element with
         */
    function setStatus<T extends keyof StatusState>(key: T, val: StatusState[T]): void;
    /**
         * Gets the status in any Status State
         * @param key Element to view
         */
    function getStatus<T extends keyof StatusState>(key: T): StatusState[T];
    function newTask(task: PreTask): Task;
    function setTask(task: Partial<Task>): void;
  }

  /** Collection of Service related API function */
  namespace services {
    /**
         * Runs a managed service given info, will die when the launcher exits.
         * @param name Name of the service
         * @param info Service info to run.
         * @param opts Process Options
         * @param basePath Override for directory to start in (info is relative to this), Extension path if none given
         * @returns A managed process. Can be passed to removeService.
         */
    function runService(name: string, info: ProcessInfo, opts: ProcessOpts, basePath?: string): ManagedChildProcess;
    /**
         * Creates a managed process given info, will die when disposed. (Does not start it)
         * @param name Name of the process
         * @param info Process info to run.
         * @param opts Process Options
         * @param basePath Override for directory to start in (info is relative to this), Extension path if none given
         * @returns A managed process.
         */
    function createProcess(name: string, info: ProcessInfo, opts: ProcessOpts, basePath?: string): DisposableChildProcess;
    /**
         * Kills and removes a service process started by runService
         * @param process Service process to remove
         */
    function removeService(process: ManagedChildProcess): Promise<void>;
    /**
         * Returns the service info of all running services
         */
    function getServices(): ManagedChildProcess[];

    // Events
    const onServiceNew: Event<ManagedChildProcess>;
    const onServiceRemove: Event<ManagedChildProcess>;
    const onServiceChange: Event<ServiceChange>;
  }

  /** Front facing dialogs */
  namespace dialogs {
    /**
         * Opens a message box on the client. Buttons can be provided in options. Returns when the dialog closes
         * @param options Message box options
         * @returns Button index pressed (-1 or cancelId if exited)
         */
    function showMessageBox(options: DialogStateTemplate): Promise<number>;
    /**
         * Opens a message box on the client. Buttons can be provided in options. Returns a handle. Can use awaitDialog to get result or cancelDialog from yourself.
         * @param options Message box options
         * @returns Dialog ID
         */
    function showMessageBoxWithHandle(options: DialogStateTemplate): Promise<string>;
    /**
         * Awaits a message box dialogs result
         * @param dialogId Dialog ID
         * @returns Dialog Response (Button index pressed + field values)
         */
    function awaitDialog(dialogId: string): Promise<DialogResponse>;
    /**
         * Cancels a dialog. Use awaitDialog to get result.
         * @param dialogId Dialog ID
         */
    function cancelDialog(dialogId: string): void;
    /**
         * Opens a save dialog on the client. They can select a file to save to.
         * @param options Save dialog options
         * @returns Path to file chosen, if any
         */
    function showSaveDialog(options: ShowSaveDialogOptions): Promise<string | undefined>;
    /**
         * Opens an open dialog on the client. They can select a file for you to open.
         * @param options Open dialog options
         * @returns Path to file(s) chosen, if any
         */
    function showOpenDialog(options: ShowOpenDialogOptions): Promise<string[] | undefined>;
    /**
         * Updates a dialog field's value. Used to update progress bars, set input fields etc.
         * @param dialogId ID of the Dialog
         * @param name Name of the field
         * @param value New value of the field
         */
    function updateDialogField(dialogId: string, name: string, value: any): void;
  }

  namespace middleware {
    /**
         * Registers a game middleware to be supported in modifying games and allow in-launcher configuration to appear
         * @param middleware Middleware to register
         */
    function registerMiddleware(middleware: IGameMiddleware): void;
    /**
         * Write data to a game file path
         * @param path Relative path to game file
         * @param stream Data stream
         */
    function writeGameFile(path: string, stream: Readable): Promise<void>;
    /**
         * Write data to a game file path, built based on url
         * @param url Game File URL
         * @param stream Data stream
         */
    function writeGameFileByUrl(url: string, stream: Readable): Promise<void>;
    /**
         * Copy file / directory to a given url
         * @param url Game File URL
         * @param path Source file / directory path
         */
    function copyGameFilesByUrl(url: string, path: string): Promise<void>;
    /**
         * Extract a game file from a gamezip
         * @param path Relative path to game file
         * @returns Readabale data stream
         */
    function extractGameFile(path: string): Promise<Readable>;
    /**
         * Extract a game file from a gamezip, find path via url
         * @param url Game File URL
         * @returns Readable data stream
         */
    function extractGameFileByUrl(url: string): Promise<Readable>;
  }

  // Events
  /** Called when the backend has fully initialized. Extension activation is earlier. */
  const onDidInit: Event<void>;

  /** Called when a client connects to the backend */
  const onDidConnect: Event<void>;

  /** See Electron docs for explanations. http://electronjs.org/docs/api/structures/file-filter */
  interface FileFilter {
    extensions: string[];
    name: string;
  }

    /** See Electron docs for explanations. https://www.electronjs.org/docs/api/dialog */
    type ShowSaveDialogOptions = {
      title?: string;
      defaultPath?: string;
      buttonLabel?: string;
      filters?: FileFilter[];
      message?: string;
      nameFieldLabel?: string;
    };

    /** See Electron docs for explanations. https://www.electronjs.org/docs/api/dialog */
    type ShowOpenDialogOptions = {
      title?: string;
      defaultPath?: string;
      buttonLabel?: string;
      filters: FileFilter[];
      properties?: Array<
      | 'openFile'
      | 'openDirectory'
      | 'multiSelections'
      | 'showHiddenFiles'
      | 'createDirectory'
      | 'promptToCreate'
      | 'noResolveAliases'
      | 'treatPackageAsDirectory'
      | 'dontAddToRecent'
      >;
      message?: string;
    };

    type TagSuggestion = {
      id: number
      name: string
      matchedFrom: string
      gamesCount: number
      category?: string
    }

    type Game = {
      /** ID of the game (unique identifier) */
      id: string;
      /** ID of the game which owns this game */
      parentGameId?: string;
      /** Full title of the game */
      title: string;
      /** Any alternate titles to match against search */
      alternateTitles: string;
      /** Game series the game belongs to (empty string if none) */
      series: string;
      /** Name of the developer(s) of the game (developer names are separated by ',') */
      developer: string;
      /** Name of the publisher of the game */
      publisher: string;
      /** List of platforms this game uses */
      platforms: string[];
      /** List of platforms attached to the game in a string format */
      detailedPlatforms?: Platform[];
      /** Primary platform name (cached) */
      primaryPlatform: string;
      /** Date-time of when the game was added to collection */
      dateAdded: string;
      /** Date-time of when the game was added to collection */
      dateModified: string;
      /** If the game is single player or multiplayer, and if the multiplayer is cooperative or not */
      playMode: string;
      /** How playable the game is */
      status: string;
      /** Information that could be useful for the player (of varying importance) */
      notes: string;
      /** List of tags attached to the game in a string format */
      tags: string[];
      /** List of tags attached to the game */
      detailedTags?: Tag[];
      /** Source if the game files, either full URL or the name of the website */
      source: string;
      /** LEGACY GAMES ONLY - Path to the application that runs the game */
      legacyApplicationPath: string;
      /** LEGACY GAMES ONLY - Command line argument(s) passed to the application to launch the game */
      legacyLaunchCommand: string;
      /** Date of when the game was released */
      releaseDate: string;
      /** Version of the game */
      version: string;
      /** Original description of the game (probably given by the game's creator or publisher) */
      originalDescription: string;
      /** The language(s) the game is in */
      language: string;
      /** Library this game belongs to */
      library: string;
      /** All attached Additional Apps of a game */
      addApps?: AdditionalApp[];
      /** ID of the active data */
      activeDataId?: number;
      /** Whether the data is present on disk */
      activeDataOnDisk: boolean;
      gameData?: GameData[];
      /** Last Played Date */
      lastPlayed?: string;
      /** Total Playtime (seconds) */
      playtime: number;
      /** Number of plays */
      playCounter: number;
      /** Active game config id */
      activeGameConfigId?: number;
      /** Active game config owner */
      activeGameConfigOwner?: string;
      /** Archive State
         * 0 = Not Archived
         * 1 = Archived
         * 2 = Available
         */
      archiveState: number;
      /** Ruffle support for flash entries
       * Valid values: 'standalone', '' (none)
       */
      ruffleSupport: string;
    };

    type GameData = {
      id: number;
      /** ID of the related game */
      game?: Game;
      gameId: string;
      /** Title of this data pack */
      title: string;
      /** Date this data pack was added on */
      dateAdded: string;
      /** Expected SHA256 hash of this data pack */
      sha256: string;
      /** Expected CRC32 of this data pack */
      crc32: number;
      /** Is the data pack present on disk */
      presentOnDisk: boolean;
      /** Path this data pack should reside at, if present on disk */
      path?: string;
      /** Size of this data pack */
      size: number;
      /** Parameters passed to the mounter */
      parameters?: string;
      /** Application path used to launch game with this data */
      applicationPath: string;
      /** Application path used to launch game with this data */
      launchCommand: string;
    };

    type AdditionalApp = {
      /** ID of the additional application (unique identifier) */
      id: string;
      /** Path to the application that runs the additional application */
      applicationPath: string;
      /**
         * If the additional application should run before the game.
         * (If true, this will always run when the game is launched)
         * (If false, this will only run when specifically launched)
         */
      autoRunBefore: boolean;
      /** Command line argument(s) passed to the application to launch the game */
      launchCommand: string;
      /** Name of the additional application */
      name: string;
      /** Wait for this to exit before the Game will launch (if starting before launch) */
      waitForExit: boolean;
      parentGameId: string;
    };

    type Platform = Tag;

    type Tag = {
      /** ID of the tag (unique identifier) */
      id: number;
      /** Primary Alias */
      name: string;
      /** Description of the tag */
      description: string;
      /** Date when this tag was last modified */
      dateModified: string;
      /** Aliases / Names of the tag */
      aliases: string[];
      /** Name of the category */
      category?: string;
    };

    type TagCategory = {
      /** ID of the tag category (unique identifier) */
      id: number;
      /** Category Name */
      name: string;
      /** Category Color */
      color: string;
      /** Description of the Tag Category */
      description?: string;
    };

    type Playlist = {
      /** Path to the playlist file */
      filePath: string;
      /** ID of the playlist (unique identifier) */
      id: string;
      /** Games in this playlist */
      games: PlaylistGame[];
      /** Title of the playlist. */
      title: string;
      /** Description of the playlist. */
      description: string;
      /** Author of the playlist. */
      author: string;
      /** Icon of the playlist (Base64 encoded image). */
      icon: string;
      /** Route of the library this playlist is for. */
      library: string;
      /** Attribute for if playlist contains games not suitable for children */
      extreme: boolean;
    };

    type PlaylistGame = {
      /** Notes for the game inside the playlist specifically */
      notes: string;
      /** Game this represents */
      gameId: string;
    };

    /**
     * Data passed to merge tags together
     * @param toMerge Tag to merge from
     * @param mergeInto Tag to merge into
     */
    type MergeTagData = {
      toMerge: string;
      mergeInto: string;
    };

    type FindGamesOpts = {
      /** Ranges of games to fetch (all games are fetched if undefined). */
      ranges?: RequestGameRange[];
      filter?: FilterGameOpts;
      orderBy?: GameOrderBy;
      direction?: GameOrderDirection;
      getTotal?: boolean;
    };

    /** Game field to order the results by */
    type GameOrderBy = 'custom' | 'title' | 'developer' | 'publisher' | 'series' | 'dateAdded' | 'dateModified' | 'releaseDate' | 'lastPlayed' | 'playtime' | 'platform';
    /** Ways to order games */
    type GameOrderReverse = 'ASC'|'DESC';
    /** Direction to return the results in (ascending or descending) */
    type GameOrderDirection = 'ASC' | 'DESC';

    type RequestGameRange = {
      /** Index of the first game. */
      start: number;
      /** Number of games to request (if undefined, all games until the end of the query will be included). */
      length: number | undefined;
      /**
         * Tuple of the last game of the previous page.
         * If this is set then "start" must be the index of the game after this (since this will be used instead of
         * "start" when selecting the games).
         */
      index?: PageTuple;
    };

    /** Tuple of values from the last game of a previous page (look up "keyset pagination"). */
    type PageTuple = {
      /** Primary order value. */
      orderVal: any;
      /** Title of the game (secondary order value). */
      title: string;
      /** ID of the game (unique value). */
      id: string;
    };

    /** Options for ordering games. */
    type FilterGameOpts = {
      /** Search query to filter by */
      searchQuery?: ParsedSearch;
      /** Playlist to limit the results to (no playlist limit will be applied if undefined). */
      playlist?: Playlist;
    };

    /** Object representation of a parsed search query. */
    type ParsedSearch = {
      /** Generic filter to blacklist some predetermined field(s). */
      genericBlacklist: string[];
      /** Generic filter to whitelist some predetermined field(s). */
      genericWhitelist: string[];
      /** Whitelists to apply */
      blacklist: FieldFilter[];
      /** Blacklists to apply */
      whitelist: FieldFilter[];
    };

    /** A search filter that applies to a specific field. */
    type FieldFilter = {
      /** The field the filter applies to. */
      field: string;
      /** Value to search for in the field. */
      value: any;
    };

    type ResponseGameRange = {
      start: number;
      games: Game[];
    }

    /** Shorten version of {@link Game} returned in searches, makes for better performance. */
    // type ViewGame = {
    //     id: string;
    //     title: string;
    //     platformName: string;
    //     platformsStr: string;
    //     tagsStr: string;
    //     developer: string;
    //     publisher: string;
    // };

    type ViewGame = Game;

    /** Data contained in the Config file */
    type AppConfigData = {
      /** Path to the FlashPoint root folder (relative or absolute) */
      flashpointPath: string;
      /** If the custom title bar should be used in MainWindow */
      useCustomTitlebar: boolean;
      /**
         * If the Server should be started, and closed, together with this application.
         * The "server" is defined in "services.json".
         */
      startServer: boolean;
      /** Lower limit of the range of ports that the back should listen on. */
      backPortMin: number;
      /** Upper limit of the range of ports that the back should listen on. */
      backPortMax: number;
      /** Lower limit of the range of ports that the back image server should listen on. */
      imagesPortMin: number;
      /** Upper limit of the range of ports that the back image server should listen on. */
      imagesPortMax: number;
      /** Base URL of the server to do pastes of the Logs to. */
      logsBaseUrl: string;
      /** Whether to notify that launcher updates are available */
      updatesEnabled: boolean;
      /** Url to fetch Game of the Day JSON */
      gotdUrl: string;
      /** Show GOTD entries later than Today */
      gotdShowAll: boolean;
      /** Middleware override path */
      middlewareOverridePath: string;
    };

    export type TagFilterGroup = {
      name: string;
      description: string;
      /** Enabled */
      enabled: boolean;
      /** Tags to filter */
      tags: TagFilter;
      /** Tag categories to filter */
      categories: TagFilter;
      /** Filters to auto apply when this is applied */
      childFilters: string[];
      /** Are these tags considered Extreme? */
      extreme: boolean;
      /** Custon icon */
      iconBase64: string;
    }

    export type TagFilter = string[];

    type SingleUsePromptPrefs = {
      badAntiVirus: boolean;
    }

    /**
     * Contains state of all non-config settings the user can change in the application.
     * This is the data contained in the Preferences file.
     */
    type AppPreferencesData = {
      [key: string]: any; // TODO: Remove this!
      /** If the launcher should register itself as the default handler for 'flashpoint://' requests. */
      registerProtocol: boolean;
      /** Path to the image folder (relative to the flashpoint path) */
      imageFolderPath: string;
      /** Path to the logo folder (relative to the flashpoint path) */
      logoFolderPath: string;
      /** Path to the playlist folder (relative to the flashpoint path) */
      playlistFolderPath: string;
      /** Path to the json folder (relative to the flashpoint path) */
      jsonFolderPath: string;
      /** Path to the htdocs folder (relative to the flashpoint path) */
      htdocsFolderPath: string;
      /** Path to the platform folder (relative to the flashpoint path) */
      platformFolderPath: string;
      /** Path to the theme folder (relative to the flashpoint path) */
      themeFolderPath: string;
      /** Path to the logo sets folder (relative to the flashpoint path) */
      logoSetsFolderPath: string;
      /** Path of the meta edits folder (relative to the flashpoint path) */
      metaEditsFolderPath: string;
      /** Path to load User extensions from (relative to the flashpoint path) */
      extensionsPath: string;
      /** Path to store Game Data packs */
      dataPacksFolderPath: string;
      /** Scale of the games at the BrowsePage. */
      browsePageGameScale: number;
      /** If "Extreme" games should be shown at the BrowsePage. */
      browsePageShowExtreme: boolean;
      /** If extreme screenshots should be shown */
      hideExtremeScreenshots: boolean;
      /** If editing games, additional applications and playlists should be allowed. */
      enableEditing: boolean;
      /** Default language used for fallback */
      fallbackLanguage: string;
      /** Current language */
      currentLanguage: string;
      /** Layout of game collection at BrowsePage. */
      browsePageLayout: BrowsePageLayout;
      /** If the left sidebar at the BrowsePage should be visible. */
      browsePageShowLeftSidebar: boolean;
      /** If the right sidebar at the BrowsePage should be visible. */
      browsePageShowRightSidebar: boolean;
      /** Width of the left sidebar. (Browse Page) */
      browsePageLeftSidebarWidth: number;
      /** Width of the right sidebar. (Browse Page) */
      browsePageRightSidebarWidth: number;
      /** Width of the left sidebar. (Curate Page) */
      curatePageLeftSidebarWidth: number;
      /** If the "Developer" tab should be visible in the header. */
      showDeveloperTab: boolean;
      /** Filename of the current theme. */
      currentTheme: string | undefined;
      /** Filename of the current logo set */
      currentLogoSet: string | undefined;
      /** The "route" of the last selected library (empty string selects the default). */
      lastSelectedLibrary: string;
      /** What property to order the games by. */
      gamesOrderBy: GameOrderBy;
      /** What order the games should appear in. */
      gamesOrder: GameOrderDirection;
      /** Position and size of the main window. */
      mainWindow: AppPreferencesDataMainWindow;
      /** Default Library for new games etc. */
      defaultLibrary: string;
      /** Save curations after importing */
      saveImportedCurations: boolean;
      /** Assign the same UUID to imported games as in the curation archive */
      keepArchiveKey: boolean;
      /** Whether to symlink or copy curation content when running (Symlink required for MAD4FP) */
      symlinkCurationContent: boolean;
      /** Download missing thumbnails/screenshots from a remote server. */
      onDemandImages: boolean;
      /** Whether to download compressed images or not */
      onDemandImagesCompressed: boolean;
      /** Base URL of the server to download missing thumbnails/screenshots from. */
      onDemandBaseUrl: string;
      /** Proxy server to use during Browser Mode */
      browserModeProxy: string;
      /** Sources to show/hide in the log page. */
      showLogSource: {
        [key: string]: boolean;
      }
      /** Levels to show/hide in the log page. */
      showLogLevel: {
        [key in LogLevel]: boolean;
      }
      /** Libraries that should be excluded from random picks. */
      excludedRandomLibraries: string[];
      /** Application path overrides to check during app launches */
      appPathOverrides: AppPathOverride[];
      /** Tag filter groups */
      tagFilters: TagFilterGroup[];
      /** Use Tag Filters in the Curate suggestions */
      tagFiltersInCurate: boolean;
      /** Array of native locked platforms */
      nativePlatforms: string[];
      /** If games flagged as "extreme" should be hidden (mainly for parental control) */
      disableExtremeGames: boolean;
      /** If games flagged as "broken" should be hidden */
      showBrokenGames: boolean;
      /** Pair of key combos to shortcuts */
      shortcuts: Shortcuts;
      /** Online manual website */
      onlineManual: string;
      /** Offline manual path */
      offlineManual: string;
      /** Game Data download sources */
      gameDataSources: GameDataSource[];
      /** Game Metadata sources */
      gameMetadataSources: GameMetadataSource[];
      /** FPFSS base url (for authoring actions on remote metadata) */
      fpfssBaseUrl: string;
      /** Name of the Server process to run */
      server: string;
      /** Name of the Server to use when running curations */
      curateServer: string;
      /** Enable Playtime Tracking (last played, playtime, play count) */
      enablePlaytimeTracking: boolean;
      /** Enable Playtime Tracking for Extreme games (last played, playtime, play count) */
      enablePlaytimeTrackingExtreme: boolean;
      /** Use verbose logging for the rust library */
      enableVerboseLogging: boolean;
      /** Screenshot Preview Mode */
      screenshotPreviewMode: ScreenshotPreviewMode;
      /** Screenshot Preview Delay in milliseconds */
      screenshotPreviewDelay: number;
      /** Search Limit for Browse Page */
      searchLimit: number;
      /** Flags for whether we've shown a one use prompt */
      singleUsePrompt: SingleUsePromptPrefs;
      /** Whether to use stored views or not */
      useStoredViews: boolean;
      /** Search info for each view, can be reloaded */
      storedViews: StoredView[];
      /** Whether to use library or custom views */
      useCustomViews: boolean;
      /** Whether to load the text in views when restarting the launcher*/
      loadViewsText: boolean;
      /** List of custom views */
      customViews: string[];
      /** Default Opening Page (Home, Browse pages) */
      defaultOpeningPage: string;
      /** Hide new view button (moves it to context menu) */
      hideNewViewButton: boolean;
      /** Whether to auto-clear wininet cache when curation runs */
      autoClearWininetCache: boolean;
      /** Use selected index instead of scroll pos */
      useSelectedGameScroll: boolean;
    };

    type StoredView = {
      view: string;
      text: string;
      advancedFilter: AdvancedFilter;
      orderBy: GameOrderBy;
      orderReverse: GameOrderReverse;
      selectedPlaylistId?: string;
      selectedGameId?: string;
      expanded: boolean;
    }

    type AdvancedFilterAndToggles = {
      library: boolean;
      playMode: boolean;
      platform: boolean;
      tags: boolean;
      developer: boolean;
      publisher: boolean;
      series: boolean;
      ruffleSupport: boolean;
    }

    type AdvancedFilter = {
      installed?: boolean;
      legacy?: boolean;
      playlistOrder: boolean;
      library: Record<string, AdvancedFilterToggle>;
      playMode: Record<string, AdvancedFilterToggle>;
      platform: Record<string, AdvancedFilterToggle>;
      tags: Record<string, AdvancedFilterToggle>;
      developer: Record<string, AdvancedFilterToggle>;
      publisher: Record<string, AdvancedFilterToggle>;
      series: Record<string, AdvancedFilterToggle>;
      ruffleSupport: Record<string, AdvancedFilterToggle>;
      andToggles: AdvancedFilterAndToggles;
    }

    type AdvancedFilterToggle = 'whitelist' | 'blacklist';

    enum ScreenshotPreviewMode {
      OFF = 0,
      ON = 1,
      ALWAYS = 2
    }

    type GameDataSource = {
      type: string;
      name: string;
      arguments: string[];
    }

    type GameMetadataSource = {
      name: string;
      baseUrl: string;
      tags: MetadataUpdateInfo;
      games: MetadataUpdateInfo;
    }

    type MetadataUpdateInfo = {
      actualUpdateTime: string;
      latestUpdateTime: string;
      latestDeleteTime: string;
    }

    type Shortcuts = {
      curate: {
        prev: string[];
        next: string[];
        load: string[];
        newCur: string[];
        deleteCurs: string[];
        exportCurs: string[];
        exportDataPacks: string[];
        importCurs: string[];
        refresh: string[];
        run: string[];
        runMad4fp: string[];
      }
    }

    type AppPathOverride = {
      path: string;
      override: string;
      enabled: boolean;
    };

    type AppPreferencesDataMainWindow = {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      maximized: boolean;
    };
    type ProcessInfo = {
      /** Path of the file (relative to the Flashpoint root) */
      path: string;
      /** Name of the file to execute */
      filename: string;
      /** Arguments to pass to the process */
      arguments: string[];
    };

    type CurationImportState = {
      /** Game being imported */
      game: Game;
      /** Files / Folders being copied, and to where */
      contentToMove: string[][];
      /** Path of the curation */
      curationPath: string;
    }

    type StatusState = {
      devConsole: string;
    };

    class DisposableChildProcess extends ManagedChildProcess implements Disposable {
      toDispose: Disposable[];
      isDisposed: boolean;
      onDispose?: () => void;
    }

    type ProcessOpts = {
      detached?: boolean;
      autoRestart?: boolean;
      noshell?: boolean;
    };

    type ServiceChange = {
      process: ManagedChildProcess;
      oldState: ProcessState;
      newState: ProcessState;
    };

    type DownloaderStatus = 'running' | 'stopped';

    type DownloadTaskStatus = 'waiting' | 'in_progress' | 'success' | 'failure';

    type DownloadWorkerState = {
      id: number;
      step: number;
      totalSteps: number;
      stepProgress: number;
      text: string;
    }
    
    type DownloadTask = {
      status: DownloadTaskStatus;
      game: Game;
      errors: string[];
    }

    type DownloaderState = {
      tasks: Record<string, DownloadTask>;
      workers: DownloadWorkerState[];
      state: DownloaderStatus;
    }

    interface ManagedChildProcess {
      /** Fires whenever the status of a process changes. */
      on(event: 'change', listener: (newState: ProcessState) => void): this;
      emit(event: 'change', newState: ProcessState): boolean;
      /** Fires whenever the process exits */
      on(event: 'exit', listener: (code: number | null, signal: string | null) => void): this;
      emit(event: 'exit', code: number | null, signal: string | null): boolean;
    }

    class ManagedChildProcess {
      /** ID of the process */
      id: string;
      /** Info this process was created with */
      info: ProcessInfo;
      /** Display name of the service. */
      readonly name: string;

      constructor(id: string, name: string, cwd: string, opts: ProcessOpts, info: ProcessInfo);

      /** Get the process ID (or -1 if the process is not running). */
      getPid(): number;

      /** Get the state of the process. */
      getState(): ProcessState;

      /** Get the time timestamp of when the process was started. */
      getStartTime(): number;

      /** Spawn process and keep track on it. */
      spawn(auto?: boolean): void;

      /** Politely ask the child process to exit (if it is running). */
      kill(): Promise<void>;

      /** Restart the managed child process (by killing the current, and spawning a new). */
      restart(): Promise<void>;
    }

    /** State of a managed process. */
    enum ProcessState {
      /** The process is not running. */
      STOPPED = 0,
      /** The process is running. */
      RUNNING = 1,
      /** The process is being killed (it has been requested to terminate, but it hasn't been terminated yet). */
      KILLING = 2,
    }

    type GameLaunchOverride = 'ruffle' | 'flash' | null;

    /** Info type passed to onWillLaunch events */
    type GameLaunchInfo = {
      game: Game;
      activeConfig: GameConfig | null;
      activeData: GameData | null;
      launchInfo: LaunchInfo;
    };

    type LaunchInfo = {
      override: GameLaunchOverride;
      gamePath: string;
      gameArgs: string | string[];
      useWine: boolean;
      cwd?: string;
      env: ProcessEnv;
      noshell?: boolean;
    };

    /** Options expected for 'browser' mode application return */
    type BrowserApplicationOpts = {
      url: string;
      proxy?: string;
    };

    type ZipExtractOptions = {
      onData?: (data: ZipData) => void;
      onProgress?: (progress: ZipProgress) => void;
    };

    interface ZipData {
      file: string;
      status: string;
      attributes?: string;
      size?: number;
      sizeCompressed?: number;
      hash?: string;
    }

    interface ZipProgress {
      percent: number;
      fileCount: number;
      file: string;
    }

    interface ProcessEnv {
      [key: string]: string | undefined;
    }

    /** Modes for displaying the game collection at the BrowsePage */
    enum BrowsePageLayout {
      /** Games are in a vertical list, one game per row */
      list = 0,
      /** Games are in a table-like grid, each cell is a game */
      grid = 1,
    }

    /** Severity level of a Log */
    enum LogLevel {
      TRACE = 0,
      DEBUG = 1,
      INFO = 2,
      WARN = 3,
      ERROR = 4,
      SILENT = 5,
    }

    /** A self-nesting type that allows one time disposable with an optional callback */
    type Disposable = {
      /** Children to dispose of in the future. Add with {@link registerDisposable} to maintain safety. */
      toDispose: Disposable[];
      /** Whether this is already disposed */
      isDisposed: boolean;
      /** Callback to use when disposed */
      onDispose?: () => void;
    };

    /** Dispose of a disposable and all its children */
    function dispose(disposable: Disposable): void;
    /** Dispose of all a disposable;s children but not itself */
    function clearDisposable(disposable: Disposable): void;
    /**
     * Register a disposable to its parent. They must not be the same.
     * @param parent Parent to register to
     * @param child Child to register
     */
    function registerDisposable(parent: Disposable, child: Disposable): void;
    /**
     * Creates Disposable data to fill a newly created Disposable type object
     * @param callback Callback to run when disposed
     */
    function newDisposable(callback?: () => void): Disposable;

    type ExtensionContext = {
      /** Put all extension disposables on here with registerDisposable */
      subscriptions: Disposable;
    };

    interface Event<T> {
      /**
         * A function that represents an event to which you subscribe by calling it with
         * a listener function as argument.
         *
         * @param listener The listener function will be called when the event happens.
         * @param thisArgs The `this` argument which will be used when calling the event listener. (rarely used)
         * @param disposables An array to which a disposable will be added.
         * @return A disposable which unsubscribes the event listener.
         */
      (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable): Disposable;
    }

    /** Replacement of "object" type. Note: I'm not sure how effective it is though //obelisk */
    type ObjectLike = Record<string, unknown> | Record<number, unknown>;

    /** Utility type. Recursively set all properties as optional. */
    type DeepPartial<T> = {
      [K in keyof T]?: T[K] extends ObjectLike ? DeepPartial<T[K]> : T[K];
    };

    /** A log entry _before_ it is added to the main log */
    export type ILogPreEntry = {
      /** Name of the source of the log entry (name of what added the log entry) */
      source: string;
      /** Content of the log entry */
      content: string;
    }

    /** A log entry from the main log */
    export type ILogEntry = ILogPreEntry & {
      /** Timestamp of when the entry was added to the main's log */
      timestamp: number;
      /** Level of the log, 0-5, Trace, Info, Warn, Error, Fatal, Silent */
      logLevel: number;
    }

    type CurationFpfssInfo = {
      id: string;
    };

    export type LoadedCuration = {
      folder: string;
      uuid: string;
      group: string;
      game: CurationMeta;
      addApps: AddAppCuration[];
      thumbnail: CurationIndexImage;
      screenshot: CurationIndexImage;
      fpfssInfo: CurationFpfssInfo | null;
    }

    export type CurationState = LoadedCuration & {
      alreadyImported: boolean;
      warnings: CurationWarnings;
      locked?: boolean;
      contents?: ContentTree;
    }

    export type ContentTree = {
      root: ContentTreeNode;
    }

    export type ContentTreeNode = {
      name: string;
      /** Frontend - Whether this is expanded in the content tree view */
      expanded: boolean;
      /** File size (if type is file) */
      size?: number;
      nodeType: 'file' | 'directory' | string;
      /** Immediate items below this node */
      children: ContentTreeNode[];
      /** Number of items below this node */
      count: number;
    }

    /** A set of warnings for things that should be fixed in a curation. */
    export type CurationWarnings = {
      /** Keys of any field that should be in yellow as a warning */
      fieldWarnings: string[];
      /** Text warnings to display at the bottom */
      writtenWarnings: string[];
    };

    export type CurationMeta = Partial<{
      // Game fields
      title: string;
      alternateTitles: string;
      series: string;
      developer: string;
      publisher: string;
      status: string;
      extreme: boolean;
      primaryPlatform: string;
      platforms: Platform[];
      tags: Tag[];
      source: string;
      launchCommand: string;
      library: string;
      notes: string;
      curationNotes: string;
      applicationPath: string;
      playMode: string;
      releaseDate: string;
      version: string;
      originalDescription: string;
      mountParameters: string;
      language: string;
      ruffleSupport: string;
    }>

    export type Task = {
      id: string;
      name: string;
      status: string;
      finished: boolean;
      error?: string;
      progress?: number;
    }

    export type PreTask = Omit<Task, 'id'>;

    export type AddAppCurationMeta = Partial<{
      heading: string;
      applicationPath: string;
      launchCommand: string;
    }>

    export type AddAppCuration = { key: string } & AddAppCurationMeta;

    export type CurationIndexImage = {
      /** Base64 encoded data of the image file (in case it was extracted from an archive). */
      data?: string;
      /** Raw data of the image file (in case it was extracted from an archive). */
      rawData?: Buffer;
      /** If the images was found. */
      exists: boolean;
      /** Name and path of the file (relative to the curation folder). */
      fileName?: string;
      /** Full path of the image (in case it was loaded from a folder). */
      filePath?: string;
      /** Version to force CSS refresh later */
      version: number;
    }

    export interface CurationTemplate {
      name: string;
      logo: string;
      meta: EditCurationMeta;
    }

    /** Meta data of a curation. */
    type EditCurationMeta = Partial<{
      // Game fields
      title: string;
      alternateTitles: string;
      series: string;
      developer: string;
      publisher: string;
      status: string;
      extreme: boolean;
      tags: Tag[];
      source: string;
      launchCommand: string;
      library: string;
      notes: string;
      curationNotes: string;
      platforms: Platform[];
      applicationPath: string;
      playMode: string;
      releaseDate: string;
      version: string;
      originalDescription: string;
      language: string;
      mountParameters: string;
    }>

    export type DialogStateTemplate = Omit<DialogState, 'id'>;

    export type DialogState = {
      id: string;
      mdx?: boolean;
      textAlign?: 'left' | 'center' | 'right'; 
      largeMessage?: boolean;
      userCanCancel?: boolean;
      message: string;
      fields?: DialogField[];
      cancelId?: number;
      buttons: string[];
    }

    export type DialogFieldString = {
      type: 'string';
      locked?: boolean;
      name: string;
      message?: string;
      placeholder?: string;
      value: string;
    }

    export type DialogFieldProgress = {
      type: 'progress';
      name: string;
      message?: string;
      value: number;
    }

    export type DialogField = DialogFieldString | DialogFieldProgress;

    export type DialogResponse = {
      dialog: DialogState,
      buttonIdx: number
    }

    export type GameMiddlewareInfo = {
      middlewareId: string;
      name: string;
    }

    export type GameMiddlewareConfig = {
      middlewareId: string;
      name: string;
      enabled: boolean;
      version: string;
      config: any;
    }

    export type GameConfig = {
      id: number;
      gameId: string;
      name: string;
      owner: string;
      middleware: GameMiddlewareConfig[];
    }

    export type BaseConfigProp = {
      title: string;
      key: string;
      optional?: boolean;
      description?: string;
      children?: ConfigProp[];
      locked?: boolean;
    }

    export type StringConfigProp = BaseConfigProp & {
      type: 'string';
      options?: string[];
      default?: string;
      validate?: (value: string) => boolean;
    }

    export type NumberConfigProp = BaseConfigProp & {
      type: 'number';
      options?: number[];
      default?: number;
      integer?: boolean;
      maximum?: number;
      minimum?: number;
      validate?: (value: number) => boolean;
    }

    export type LabelConfigProp = BaseConfigProp & {
      type: 'label';
    }

    export type BooleanConfigProp = BaseConfigProp & {
      type: 'boolean';
      default?: boolean;
    }

    type ConfigProp = StringConfigProp | NumberConfigProp | BooleanConfigProp | LabelConfigProp;

    type ConfigSchema = ConfigProp[];

    type GameMiddlewareDefaultConfig = Omit<GameMiddlewareConfig, 'middlewareId' | 'name' | 'enabled'>;

    export interface IGameMiddleware {
      // Unique Middleware ID
      id: string;
      // Display Name
      name: string;
      /**
         * Decides if this middleware is valid for a given game
         * @param game Game to validate against
         */
      isValid(game: Game): Promise<boolean> | boolean;
      /**
         * Decides if the middleware version is valid
         * @param version Middleware version
         */
      isValidVersion(version: string): Promise<boolean> | boolean;
      /**
         * Called when middleware is next to run before game launch. Do anything per-game important here.
         * @param gameLaunchInfo Launch info for the game
         * @param middlewareConfig Game middleware config specific to this middleware
         */
      execute(gameLaunchInfo: GameLaunchInfo, middlewareConfig: GameMiddlewareConfig): Promise<GameLaunchInfo> | GameLaunchInfo;
      /**
         * Returns a default config when adding middleware to a new game config
         * @param game Game selected
         * @returns Middleware config
         */
      getDefaultConfig(game: Game): GameMiddlewareDefaultConfig;
      /**
         * Should return a valid config schema for the selected middleware version. Game and current game config given for extra context.
         * @param version Selected middleware version
         */
      getConfigSchema(version: string): ConfigSchema;
      /**
         * UNUSED - Called when a game middleware's config is loaded from the database.
         * Allows modification / upgrading of config values before the user or launcher is able to use / edit it themselves.
         * @param version Selected middleware version
         * @param config Current middleware config values
         */
      upgradeConfig(version: string, config: any): any;
    }

    namespace fpfss {
        function getAccessToken(): Promise<string>;
    }
}
