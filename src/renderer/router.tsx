import { ITheme } from '@shared/ThemeFile';
import { ComponentStatus, FpfssUser, GameOfTheDay } from '@shared/back/types';
import { AppExtConfigData } from '@shared/config/interfaces';
import { ExtensionContribution, IExtensionDescription, ILogoSet } from '@shared/extensions/interfaces';
import { GamePropSuggestions, IService } from '@shared/interfaces';
import { LangFile } from '@shared/lang';
import { Menu } from 'electron';
import { UpdateInfo } from 'electron-updater';
import { GameLaunchOverride, Playlist, ViewGame } from 'flashpoint-launcher';
import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Paths } from '@shared/Paths';
import { AboutPage, AboutPageProps } from './components/pages/AboutPage';
import { DeveloperPage, DeveloperPageProps } from './components/pages/DeveloperPage';
import { IFramePage, IFramePageProps } from './components/pages/IFramePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import ConnectedBrowsePage, { ConnectedBrowsePageProps } from './containers/ConnectedBrowsePage';
import { ConnectedConfigPage, ConnectedConfigPageProps } from './containers/ConnectedConfigPage';
import { ConnectedCuratePage, ConnectedCuratePageProps } from './containers/ConnectedCuratePage';
import ConnectedHomePage, { ConnectedHomePageProps } from './containers/ConnectedHomePage';
import { ConnectedLogsPage } from './containers/ConnectedLogsPage';
import { ConnectedTagCategoriesPage } from './containers/ConnectedTagCategoriesPage';
import { ConnectedTagsPage } from './containers/ConnectedTagsPage';
import { CreditsData } from './credits/types';
import { RequestState } from '@renderer/store/search/slice';
import { LoadingPage } from './components/pages/LoadingPage';
import { DownloadsPage } from './components/pages/Downloads';

export type AppRouterProps = {
  fpfssUser: FpfssUser | null;
  gotdList: GameOfTheDay[] | undefined;
  randomGames: ViewGame[];
  rollRandomGames: () => void;
  gamesTotal: number;
  allPlaylists: Playlist[];
  playlists: Playlist[];
  suggestions: Partial<GamePropSuggestions>;
  appPaths: Record<string, string>;
  platforms: string[];
  onLaunchGame: (gameId: string, override: GameLaunchOverride) => void;
  playlistIconCache: Record<string, string>;
  libraries: string[];
  serverNames: string[];
  mad4fpEnabled: boolean;
  localeCode: string;
  devConsole: string;
  creditsData?: CreditsData;
  creditsDoneLoading: boolean;
  selectedGameId?: string;
  gameRunning: boolean;
  selectedPlaylistId?: string;
  onGameContextMenu: (gameId: string, logoPath: string, screenshotPath: string) => Menu;
  onUpdatePlaylist: (playlist: Playlist) => void;
  onDeletePlaylist: (playlist: Playlist) => void;
  wasNewGameClicked: boolean;
  gameLibrary: string;
  themeList: ITheme[];
  languages: LangFile[];
  updateInfo: UpdateInfo | undefined,
  extensions: IExtensionDescription[],
  devScripts: ExtensionContribution<'devScripts'>[],
  contextButtons: ExtensionContribution<'contextButtons'>[],
  curationTemplates: ExtensionContribution<'curationTemplates'>[],
  logoSets: ILogoSet[],
  extConfigs: ExtensionContribution<'configuration'>[],
  extConfig: AppExtConfigData,
  services: IService[],
  logoVersion: number,
  updateFeedMarkdown: string,
  manualUrl: string,
  componentStatuses: ComponentStatus[],
  openFlashpointManager: () => void,
  onMovePlaylistGame: (sourceGameId: string, destGameId: string) => void,
  searchStatus: string | null,
  metaState?: RequestState,
};

export function AppRouter(props: AppRouterProps) {
  const homeProps: ConnectedHomePageProps = {
    gotdList: props.gotdList,
    platforms: props.platforms,
    playlists: props.allPlaylists,
    onGameContextMenu: props.onGameContextMenu,
    onLaunchGame: props.onLaunchGame,
    randomGames: props.randomGames,
    rollRandomGames: props.rollRandomGames,
    logoVersion: props.logoVersion,
    updateFeedMarkdown: props.updateFeedMarkdown,
    selectedGameId: props.selectedGameId,
  };
  const browseProps: ConnectedBrowsePageProps = {
    sourceTable: 'browse-page',
    gamesTotal: props.gamesTotal,
    playlists: props.playlists,
    libraries: props.libraries,
    playlistIconCache: props.playlistIconCache,
    onGameContextMenu: props.onGameContextMenu,
    onUpdatePlaylist: props.onUpdatePlaylist,
    onDeletePlaylist: props.onDeletePlaylist,
    logoVersion: props.logoVersion,
    contextButtons: props.contextButtons,
    onMovePlaylistGame: props.onMovePlaylistGame,
    searchStatus: props.searchStatus,
    metaState: props.metaState,
  };
  const configProps: ConnectedConfigPageProps = {
    themeList: props.themeList,
    logoSets: props.logoSets,
    logoVersion: props.logoVersion,
    availableLangs: props.languages,
    libraries: props.libraries,
    platforms: props.platforms,
    localeCode: props.localeCode,
    serverNames: props.serverNames,
    extensions: props.extensions,
    extConfigs: props.extConfigs,
    extConfig: props.extConfig,
  };
  const aboutProps: AboutPageProps = {
    creditsData: props.creditsData,
    creditsDoneLoading: props.creditsDoneLoading
  };
  const curateProps: ConnectedCuratePageProps = {
    extCurationTemplates: props.curationTemplates,
    extContextButtons: props.contextButtons,
    mad4fpEnabled: props.mad4fpEnabled,
    logoVersion: props.logoVersion,
  };
  const developerProps: DeveloperPageProps = {
    devConsole: props.devConsole,
    devScripts: props.devScripts,
    services: props.services,
    totalGames: props.gamesTotal || 1,
  };
  const iframePageProps: IFramePageProps = {
    url: props.manualUrl
  };
  return (
    <Routes>
      <Route
        path={Paths.LOADING}
        element={<LoadingPage/>}/>
      <Route
        path={Paths.HOME}
        element={<ConnectedHomePage {...homeProps}/>}/>
      <Route
        path={Paths.BROWSE}
        element={<ConnectedBrowsePage {...browseProps}/>}/>
      <Route
        path={Paths.TAGS}
        element={<ConnectedTagsPage/>}/>
      <Route
        path={Paths.CATEGORIES}
        element={<ConnectedTagCategoriesPage/>}/>
      <Route
        path={Paths.DOWNLOADS}
        element={<DownloadsPage/>}/>
      <Route
        path={Paths.LOGS}
        element={<ConnectedLogsPage/>}/>
      <Route
        path={Paths.CONFIG}
        element={<ConnectedConfigPage {...configProps}/>}/>
      <Route
        path={Paths.MANUAL}
        element={<IFramePage {...iframePageProps} />}/>
      <Route
        path={Paths.ABOUT}
        element={<AboutPage {...aboutProps}/>}/>
      <Route
        path={Paths.CURATE}
        element={<ConnectedCuratePage {...curateProps} />}/>
      <Route
        path={Paths.DEVELOPER}
        element={<DeveloperPage {...developerProps}/>}/>
      <Route element={<NotFoundPage/>}/>
    </Routes>
  );
}
