import { GameGridComponentProps } from 'flashpoint-launcher-renderer';
import { ExtData } from './types';

export default function NgRatingGridIcon(props: GameGridComponentProps) {
  if (props.game) {
    const extData: ExtData | undefined = props.game.extData?.nga;
    const rating = extData?.rating || '';
    if (rating) {
      return (
        <div className={`game-grid-item__thumb__icons__icon ng-rating-grid-icon ng-image-rating_${rating.toLowerCase()}`}/>
      );
    }
  }
}
