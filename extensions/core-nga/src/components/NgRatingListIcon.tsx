import { GameListComponentProps } from 'flashpoint-launcher-renderer';
import { ExtData } from './types';

export default function NgRatingListIcon(props: GameListComponentProps) {
  if (props.game) {
    const extData: ExtData | undefined = props.game.extData?.nga;
    const rating = extData?.rating || '';
    return (
      <div className={`game-list-item__icon ng-rating-list-icon ng-image-rating_${rating.toLowerCase()}`}/>
    );
  }
}
