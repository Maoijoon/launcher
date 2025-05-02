import { LangContext } from '@renderer/util/lang';
import { ScreenshotPreviewMode } from '@shared/BrowsePageLayout';
import { LOGOS, SCREENSHOTS } from '@shared/constants';
import { TagFilter, ViewGame } from 'flashpoint-launcher';
import * as React from 'react';
import { findGameDragEventDataGrid, getExtremeIconURL, getGameImageURL } from '../Util';
import { GameGridItem } from './GameGridItem';
import { GameItemContainer } from './GameItemContainer';
import { HomePageBox } from './HomePageBox';
import { SimpleButton } from './SimpleButton';

type RandomGamesProps = {
  games: ViewGame[];
  selectedGameId?: string;
  /** Generator for game context menu */
  onGameContextMenu: (gameId: string, logoPath: string, screenshotPath: string) => void;
  onLaunchGame: (gameId: string) => void;
  onGameSelect: (gameId: string | undefined) => void;
  rollRandomGames: () => void;
  extremeTags: string[];
  /** Tag Filter icons */
  tagGroupIcons: { tagFilter: TagFilter; iconBase64: string; }[];
  /** Update to clear platform icon cache */
  logoVersion: number;
  minimized: boolean;
  onToggleMinimize: () => void;
  /** Screenshot Preview Mode */
  screenshotPreviewMode: ScreenshotPreviewMode;
  /** Screenshot Preview Delay */
  screenshotPreviewDelay: number;
  /** Hide extreme screenshots */
  hideExtremeScreenshots: boolean;
};

// A small "grid" of randomly selected games.
export function RandomGames(props: RandomGamesProps) {
  const strings = React.useContext(LangContext);

  const onGameSelect = (event: React.MouseEvent, gameId: string | undefined) => {
    props.onGameSelect(gameId);
  };

  const onLaunchGame = (event: React.MouseEvent, gameId: string) => {
    props.onLaunchGame(gameId);
  };

  const onRerollPicks = () => {
    props.rollRandomGames();
  };

  const gameItems = props.games.slice(0, 6).map(game => (
    <GameGridItem
      game={game}
      key={game.id}
      id={game.id}
      title={game.title}
      platforms={game.platforms.map(p => p.trim())}
      extreme={game ? game.tags.findIndex(t => props.extremeTags.includes(t.trim())) !== -1 : false}
      extremeIconPath={getExtremeIconURL(props.logoVersion)}
      tagGroupIconBase64={props.tagGroupIcons.find(tg => tg.tagFilter.find(t => game?.tags.includes(t)))?.iconBase64 || ''}
      thumbnail={getGameImageURL(LOGOS, game.logoPath)}
      screenshot={getGameImageURL(SCREENSHOTS, game.screenshotPath)}
      screenshotPreviewMode={props.screenshotPreviewMode}
      screenshotPreviewDelay={props.screenshotPreviewDelay}
      hideExtremeScreenshots={props.hideExtremeScreenshots}
      logoVersion={props.logoVersion}
      isSelected={props.selectedGameId === game.id}
      isDragged={false} />
  ));

  const onGameContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, gameId: string, logoPath: string, screenshotPath: string) => {
    return props.onGameContextMenu(gameId, logoPath, screenshotPath);
  };

  const render = (
    <>
      <GameItemContainer
        className='random-games'
        onGameContextMenu={onGameContextMenu}
        onGameSelect={onGameSelect}
        onGameLaunch={onLaunchGame}
        findGameDragEventData={findGameDragEventDataGrid}>
        {gameItems}
      </GameItemContainer>
      <SimpleButton
        value={strings.home.rerollPicks}
        onClick={onRerollPicks} />
    </>
  );

  return (
    <HomePageBox
      minimized={props.minimized}
      title={strings.home.randomPicks}
      cssKey='random-games'
      onToggleMinimize={props.onToggleMinimize}>
      {render}
    </HomePageBox>
  );
}
