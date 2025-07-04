import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreditsData } from '@renderer/credits/types';
import { UpgradeStage } from '@renderer/upgrade/types';
import { BackIn, BackInit, ComponentStatus, GameOfTheDay } from '@shared/back/types';
import { AppExtConfigData } from '@shared/config/interfaces';
import { PlatformAppPathSuggestions } from '@shared/curate/types';
import { ExtensionContribution, IExtensionDescription, ILogoSet } from '@shared/extensions/interfaces';
import { GamePropSuggestions, IService, WindowIPC } from '@shared/interfaces';
import { createLangContainer, LangContainer, LangFile } from '@shared/lang';
import { ITheme } from '@shared/ThemeFile';
import * as axiosImport from 'axios';
import { ipcRenderer } from 'electron';
import { UpdateInfo } from 'electron-updater';
import { DialogField, DialogState, DownloaderState, DownloaderStatus, DownloadTask, DownloadWorkerState, Game, GameData, Playlist, PlaylistGame, ViewGame } from 'flashpoint-launcher';

export const RANDOM_GAME_ROW_COUNT = 6;

export type MetaUpdateState = {
  ready: boolean;
  total: number;
}

export type RemovePlaylistGameAction = {
  playlistId: string;
  gameId: string;
}

export type UpdateDialogFieldActionData = {
  id: string;
  field: Partial<DialogField>;
}

export type UpdateDownloaderTaskAction = DownloadTask;

export type UpdateDownloaderStateAction = DownloaderStatus;

export type UpdateDownloadWorkerAction = DownloadWorkerState;

export type ResolveDialogActionData = {
  id: string;
  button: number;
}

export type MainState = {
  gotdList: GameOfTheDay[] | undefined;
  libraries: string[];
  serverNames: string[];
  mad4fpEnabled: boolean;
  platformAppPaths: PlatformAppPathSuggestions;
  playlists: Playlist[];
  playlistIconCache: Record<string, string>; // [PLAYLIST_ID] = ICON_BLOB_URL
  suggestions: GamePropSuggestions;
  appPaths: Record<string, string>;
  loaded: { [key in BackInit]: boolean; };
  loadedAll: boolean;
  extensions: IExtensionDescription[];
  themeList: ITheme[];
  logoSets: ILogoSet[];
  logoVersion: number; // Increase to force cache clear
  gamesTotal: number;
  localeCode: string;
  /** Text to display on the dev console */
  devConsole: string;

  /** Random games for the Home page box */
  randomGames: ViewGame[];
  /** Whether we're currently requesting random games */
  requestingRandomGames: boolean;
  /** If the random games should be shifted when the request is complete. */
  shiftRandomGames: boolean;

  /** Data and state used for the upgrade system (optional install-able downloads from the HomePage). */
  upgrades: UpgradeStage[];
  /** If the Random games have loaded - Masked as 'Games' */
  gamesDoneLoading: boolean;
  /** If upgrades files have loaded */
  upgradesDoneLoading: boolean;
  /** Stop rendering to force component unmounts */
  stopRender: boolean;
  /** Credits data (if any). */
  creditsData?: CreditsData;
  creditsDoneLoading: boolean;
  /** If the "New Game" button was clicked (silly way of passing the event from the footer to the browse page). */
  wasNewGameClicked: boolean;
  /** Current language container. */
  lang: LangContainer;
  /** Current list of available language files. */
  langList: LangFile[];
  /** Info of the update, if one was found */
  updateInfo: UpdateInfo | undefined;
  /** If the "Meta Edit Popup" is open. */
  metaEditExporterOpen: boolean;
  /** ID of the game used in the "Meta Edit Popup". */
  metaEditExporterGameId: string;
  /** Scripts for the Developer Page */
  devScripts: ExtensionContribution<'devScripts'>[];
  /** Context buttons added by extensions */
  contextButtons: ExtensionContribution<'contextButtons'>[];
  /** Curation Templates added by extensions */
  curationTemplates: ExtensionContribution<'curationTemplates'>[];
  /** Extension config options */
  extConfigs: ExtensionContribution<'configuration'>[];
  /** Current extension config data */
  extConfig: AppExtConfigData;
  /** Services */
  services: IService[];
  downloaderState: DownloaderState;
  /** PLACEHOLDER - Download percent of Game */
  downloadPercent: number;
  downloadSize: number;
  downloadOpen: boolean;
  cancelToken?: axiosImport.CancelToken;
  downloadVerifying: boolean;
  taskBarOpen: boolean;
  selectedGameId?: string;
  selectedPlaylistId?: string;
  currentGame?: Game;
  currentGameData?: GameData;
  currentPlaylist?: Playlist;
  currentPlaylistEntry?: PlaylistGame;
  isEditingGame: boolean;
  updateFeedMarkdown: string;
  metadataUpdate: MetaUpdateState;
  /** Games which are in the middle of a busy operation */
  busyGames: string[];
  /** State of the Socket connection */
  socketOpen: boolean;
  /** Main Proc output (when requested) */
  mainOutput?: string;
  /** List of components from FPM */
  componentStatuses: ComponentStatus[];
  /** In the process of quitting, suspend all action */
  quitting: boolean;
  /** Open Dialog States */
  openDialogs: DialogState[];
  /** Last resolved dialog (mostly to handle side effects) */
  lastResolvedDialog?: DialogState;
}

const initialState: MainState = {
  gotdList: [],
  libraries: [],
  serverNames: [],
  mad4fpEnabled: false,
  playlists: [],
  playlistIconCache: {},
  suggestions: {
    platforms: [],
    playMode: [],
    status: [],
    applicationPath: [],
    tags: [],
    library: []
  },
  appPaths: {},
  loaded: {
    [BackInit.DATABASE_READY]: false,
    [BackInit.SERVICES]: false,
    [BackInit.DATABASE]: false,
    [BackInit.PLAYLISTS]: false,
    [BackInit.CURATE]: false,
    [BackInit.EXEC_MAPPINGS]: false,
    [BackInit.EXTENSIONS]: false
  },
  loadedAll: false,
  themeList: [],
  logoSets: [],
  logoVersion: 0,
  gamesTotal: -1,
  randomGames: [],
  requestingRandomGames: false,
  shiftRandomGames: false,
  localeCode: 'en-us',
  devConsole: '',
  upgrades: [],
  gamesDoneLoading: false,
  upgradesDoneLoading: false,
  stopRender: false,
  creditsData: undefined,
  creditsDoneLoading: false,
  lang: createLangContainer(),
  langList: [],
  wasNewGameClicked: false,
  updateInfo: undefined,
  metaEditExporterOpen: false,
  metaEditExporterGameId: '',
  extensions: [],
  extConfig: {},
  extConfigs: [],
  devScripts: [],
  contextButtons: [],
  curationTemplates: [],
  services: [],
  downloaderState: {
    state: 'running',
    workers: [],
    tasks: {}
  },
  downloadOpen: false,
  downloadPercent: 0,
  downloadSize: 0,
  downloadVerifying: false,
  socketOpen: true,
  taskBarOpen: false,
  isEditingGame: false,
  updateFeedMarkdown: '',
  metadataUpdate: {
    ready: false,
    total: 0
  },
  busyGames: [],
  platformAppPaths: {},
  componentStatuses: [],
  quitting: false,
  openDialogs: [],
};

export const requestKeyset = createAsyncThunk(
  'search/requestKeyset',
  async (payload: ResolveDialogActionData, { getState, dispatch }) => {
    
    const state = getState() as { main: MainState };
    const dialogIdx = state.main.openDialogs.findIndex(d => d.id === payload.id);
    if (dialogIdx > -1) {
      const dialog = state.main.openDialogs.splice(dialogIdx, 1)[0];
      window.Shared.back.send(BackIn.DIALOG_RESPONSE, dialog, payload.button);
      window.Shared.dialogResEvent.emit(dialog.id, dialog, payload.button);
    }
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMainState(state: MainState, { payload }: PayloadAction<Partial<MainState>>) {
      Object.assign(state, payload);
    },
    addLoaded(state: MainState, { payload }: PayloadAction<BackInit[]>) {
      for (const key of payload) {
        state.loaded[key] = true;
      }

      const values = Object.values(state.loaded);
      if (values.length === values.reduce((prev, cur) => prev + (cur ? 1 : 0), 0)) {
        state.loadedAll = true;
        // Ready to accept protocol, if available
        ipcRenderer.send(WindowIPC.PROTOCOL);
      }
    },
    setCredits(state: MainState, { payload }: PayloadAction<CreditsData>) {
      state.creditsData = payload;
      state.creditsDoneLoading = true;
    },
    stopRender(state: MainState) {
      state.stopRender = true;
    },
    shiftRandomGames(state: MainState) {
      if (state.randomGames.length >= (RANDOM_GAME_ROW_COUNT * 2)) {
        state.randomGames = state.randomGames.slice(RANDOM_GAME_ROW_COUNT);
      } else {
        state.shiftRandomGames = true;
      }
    },
    addRandomGames(state: MainState, { payload }: PayloadAction<Game[]>) {
      state.randomGames = [
        ...(
          state.shiftRandomGames
            ? state.randomGames.slice(RANDOM_GAME_ROW_COUNT)
            : state.randomGames
        ),
        ...payload
      ];

      state.requestingRandomGames = false;
      state.shiftRandomGames = false;
      state.gamesDoneLoading = true;
    },
    incrementLogoVersion(state: MainState) {
      state.logoVersion++;
    },
    markGameBusy(state: MainState, { payload }: PayloadAction<string>) {
      if (!state.busyGames.includes(payload)) {
        state.busyGames.push(payload);
      }
    },
    unmarkGameBusy(state: MainState, { payload }: PayloadAction<string>) {
      const idx = state.busyGames.findIndex(i => i === payload);
      if (idx > -1) {
        state.busyGames.splice(idx, 1);
      }
    },
    createDialog(state: MainState, { payload }: PayloadAction<DialogState>) {
      state.openDialogs.push(payload);
    },
    cancelDialog(state: MainState, { payload }: PayloadAction<string>) {
      const dialogIdx = state.openDialogs.findIndex(d => d.id === payload);
      if (dialogIdx > -1) {
        const dialog = state.openDialogs.splice(dialogIdx, 1)[0];
        window.Shared.back.send(BackIn.DIALOG_RESPONSE, dialog, dialog.cancelId || -1);
        setTimeout(() => window.Shared.dialogResEvent.emit(dialog.id, dialog, dialog.cancelId || -1), 100);
      }
    },
    resolveDialog(state: MainState, { payload }: PayloadAction<ResolveDialogActionData>) {
      const dialogIdx = state.openDialogs.findIndex(d => d.id === payload.id);
      if (dialogIdx > -1) {
        const dialog = state.openDialogs.splice(dialogIdx, 1)[0];
        state.lastResolvedDialog = dialog;
      }
    },
    updateDialog(state: MainState, { payload }: PayloadAction<Partial<DialogState>>) {
      if (!payload.id) {
        return;
      }

      const dialogIdx = state.openDialogs.findIndex(d => d.id === payload.id);
      if (dialogIdx > -1) {
        state.openDialogs[dialogIdx] = {
          ...state.openDialogs[dialogIdx],
          ...payload,
        };
      }
    },
    removePlaylistGame(state: MainState, { payload }: PayloadAction<RemovePlaylistGameAction>) {
      const playlist = state.playlists.find(p => p.id === payload.playlistId);
      if (playlist) {
        const gameIdx = playlist.games.findIndex(g => g.gameId === payload.gameId);
        if (gameIdx !== -1) {
          playlist.games.splice(gameIdx, 1);
        }
      }
    },
    updateDialogField(state: MainState, { payload }: PayloadAction<UpdateDialogFieldActionData>) {
      const dialog = state.openDialogs.find(d => d.id === payload.id);
      if (dialog && dialog.fields) {
        const fieldIdx = dialog.fields?.findIndex(f => f.name === payload.field.name);
        if (fieldIdx > -1) {
          dialog.fields[fieldIdx] = {
            ...dialog.fields[fieldIdx],
            ...payload.field
          } as DialogField; // Stupid type fix
        }
      }
    },
    updateDownloaderTask(state: MainState, { payload }: PayloadAction<UpdateDownloaderTaskAction>) {
      state.downloaderState.tasks[payload.game.id] = payload;
    },
    updateDownloaderStatus(state: MainState, { payload }: PayloadAction<UpdateDownloaderStateAction>) {
      state.downloaderState.state = payload;
    },
    updateDownloaderWorker(state: MainState, { payload }: PayloadAction<UpdateDownloadWorkerAction>) {
      const workerIdx = state.downloaderState.workers.findIndex(w => w.id === payload.id);
      if (workerIdx > -1) {
        state.downloaderState.workers[workerIdx] = payload;
      } else {
        state.downloaderState.workers.push(payload);
      }
    },
    setUpdateInfo(state: MainState, { payload }: PayloadAction<number>) {
      state.metadataUpdate = {
        ready: true,
        total: payload,
      };
    }
  },
});

export const { actions: mainActions } = mainSlice;
export const { setMainState,
  addLoaded,
  setCredits,
  stopRender,
  shiftRandomGames,
  addRandomGames,
  incrementLogoVersion,
  markGameBusy,
  unmarkGameBusy,
  createDialog,
  cancelDialog,
  resolveDialog,
  updateDialog,
  updateDialogField,
  removePlaylistGame,
  updateDownloaderTask,
  updateDownloaderStatus,
  updateDownloaderWorker,
  setUpdateInfo } = mainSlice.actions;
export default mainSlice.reducer;

