import { GameComponentProps } from 'flashpoint-launcher-renderer';
import { ExtData } from './types';

const numFormat = new Intl.NumberFormat();

export default function NgFaves(props: GameComponentProps) {
  const extData: ExtData | undefined = props.game.extData?.nga;
  const { GameComponentInputField } = window.ext.components;
  const faves = Number(extData?.faves) || 0;
  const { editable, updateGameExtData } = props;

  return (
    <GameComponentInputField
      header='NG Favorites'
      text={editable ? faves.toString() : numFormat.format(faves)}
      placeholder='No Favorites'
      onChange={(value) => {
        // Strip leading zeroes
        const cleanValue = value.replace(/^0+/, '');
        // Make sure we're an integer
        if (/^\d+$/.test(cleanValue)) {
          updateGameExtData('nga', 'faves', Number(cleanValue));
        }
      }}
      {...props} />
  );
}
