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
import { Route, Switch } from 'react-router-dom';
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
  onGameContextMenu: (gameId: string) => Menu;
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

export class AppRouter extends React.Component<AppRouterProps> {
  render() {
    const homeProps: ConnectedHomePageProps = {
      gotdList: this.props.gotdList,
      platforms: this.props.platforms,
      playlists: this.props.allPlaylists,
      onGameContextMenu: this.props.onGameContextMenu,
      onLaunchGame: this.props.onLaunchGame,
      randomGames: this.props.randomGames,
      rollRandomGames: this.props.rollRandomGames,
      logoVersion: this.props.logoVersion,
      updateFeedMarkdown: this.props.updateFeedMarkdown,
      selectedGameId: this.props.selectedGameId,
      componentStatuses: this.props.componentStatuses,
      openFlashpointManager: this.props.openFlashpointManager,
    };
    const browseProps: ConnectedBrowsePageProps = {
      sourceTable: 'browse-page',
      gamesTotal: this.props.gamesTotal,
      playlists: this.props.playlists,
      libraries: this.props.libraries,
      playlistIconCache: this.props.playlistIconCache,
      onGameContextMenu: this.props.onGameContextMenu,
      onUpdatePlaylist: this.props.onUpdatePlaylist,
      onDeletePlaylist: this.props.onDeletePlaylist,
      logoVersion: this.props.logoVersion,
      contextButtons: this.props.contextButtons,
      onMovePlaylistGame: this.props.onMovePlaylistGame,
      searchStatus: this.props.searchStatus,
      metaState: this.props.metaState,
    };
    const configProps: ConnectedConfigPageProps = {
      themeList: this.props.themeList,
      logoSets: this.props.logoSets,
      logoVersion: this.props.logoVersion,
      availableLangs: this.props.languages,
      libraries: this.props.libraries,
      platforms: this.props.platforms,
      localeCode: this.props.localeCode,
      serverNames: this.props.serverNames,
      extensions: this.props.extensions,
      extConfigs: this.props.extConfigs,
      extConfig: this.props.extConfig,
    };
    const aboutProps: AboutPageProps = {
      creditsData: this.props.creditsData,
      creditsDoneLoading: this.props.creditsDoneLoading
    };
    const curateProps: ConnectedCuratePageProps = {
      extCurationTemplates: this.props.curationTemplates,
      extContextButtons: this.props.contextButtons,
      mad4fpEnabled: this.props.mad4fpEnabled,
      logoVersion: this.props.logoVersion,
    };
    const developerProps: DeveloperPageProps = {
      devConsole: this.props.devConsole,
      devScripts: this.props.devScripts,
      services: this.props.services,
      totalGames: this.props.gamesTotal || 1,
    };
    const iframePageProps: IFramePageProps = {
      url: this.props.manualUrl
    };
    return (
      <Switch>
        <PropsRoute
          exact
          path={Paths.LOADING}
          component={LoadingPage} />
        <PropsRoute
          exact
          path={Paths.HOME}
          component={ConnectedHomePage}
          { ...homeProps } />
        <PropsRoute
          path={Paths.BROWSE}
          component={ConnectedBrowsePage}
          { ...browseProps } />
        <PropsRoute
          path={Paths.TAGS}
          component={ConnectedTagsPage} />
        <PropsRoute
          path={Paths.CATEGORIES}
          component={ConnectedTagCategoriesPage} />
        <PropsRoute
          path={Paths.DOWNLOADS}
          component={DownloadsPage} />
        <PropsRoute
          path={Paths.LOGS}
          component={ConnectedLogsPage} />
        <PropsRoute
          path={Paths.CONFIG}
          component={ConnectedConfigPage}
          { ...configProps } />
        <PropsRoute
          path={Paths.MANUAL}
          component={IFramePage}
          { ...iframePageProps } />
        <PropsRoute
          path={Paths.ABOUT}
          component={AboutPage}
          { ...aboutProps } />
        <PropsRoute
          path={Paths.CURATE}
          component={ConnectedCuratePage}
          { ...curateProps } />
        <PropsRoute
          path={Paths.DEVELOPER}
          component={DeveloperPage}
          { ...developerProps } />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

// Reusable way to pass properties down a router and to its component.
const PropsRoute = ({ component, ...rest }: any) => (
  <Route
    { ...rest }
    render={routeProps => renderMergedProps(component, routeProps, rest)} />
);

function renderMergedProps(component: any, ...rest: any[]) {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
}
