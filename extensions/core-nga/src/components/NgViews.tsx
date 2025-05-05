import { GameComponentProps } from 'flashpoint-launcher-renderer';
import { ExtData } from './types';

const numFormat = new Intl.NumberFormat();

export default function NgViews(props: GameComponentProps) {
  const extData: ExtData | undefined = props.game.extData?.nga;
  const { GameComponentInputField } = window.ext.components;
  const views = Number(extData?.views) || 0;
  const { editable, updateGameExtData } = props;

  return (
    <GameComponentInputField
      header='NG Views'
      text={editable ? views.toString() : numFormat.format(views)}
      placeholder='No Views'
      onChange={(value) => {
        // Strip leading zeroes
        const cleanValue = value.replace(/^0+/, '');
        // Make sure we're an integer
        if (/^\d+$/.test(cleanValue)) {
          updateGameExtData('nga', 'views', cleanValue);
        }
      }}
      {...props} />
  );
}
