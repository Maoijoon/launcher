import { DropdownItem, GameComponentProps } from 'flashpoint-launcher-renderer';
import { IconType } from 'react-icons';
import { FaBug, FaChalkboardTeacher, FaCog, FaCrown, FaDesktop, FaDollarSign, FaFilm, FaMicrophone, FaMusic, FaPaintBrush, FaPenAlt, FaPencilAlt, FaSun, FaTruck, FaVolumeUp } from 'react-icons/fa';

const ROLE_ICONS: Record<string, IconType> = {
  'Artist': FaPaintBrush,
  'Author': FaPenAlt,
  'Sound Effects': FaVolumeUp,
  'Other': FaCog,
  'Additional Code': FaDesktop,
  'Miscellaneous': FaCog,
  'Producer': FaChalkboardTeacher,
  'Production': FaFilm,
  'Voice Actor': FaMicrophone,
  'Writer': FaPenAlt,
  'Collab Organizer': FaChalkboardTeacher,
  'Design': FaPencilAlt,
  'Programming': FaDesktop,
  'Animation': FaFilm,
  'Additional Art': FaPaintBrush,
  'Sponsor': FaDollarSign,
  'Director': FaChalkboardTeacher,
  'Music': FaMusic,
  'Beta Tester': FaBug,
  'Sound': FaVolumeUp,
  'Storyboards': FaPenAlt,
  'Additional Animation': FaFilm,
  'Interface Design': FaPaintBrush,
  'Original Creator': FaCrown,
  'Distributor': FaTruck,
  'Engine Design': FaDesktop,
  'Character Design': FaPencilAlt,
  'Gameplay Design': FaPencilAlt,
  'Backgrounds': FaPaintBrush,
  'Inspiration': FaSun,
};

type Credit = {
  name: string;
  roles?: string[];
}

type ExtData = {
  score?: number;
  rating?: string;
  views?: number;
  faves?: number;
  credits?: Credit[];
}

const numFormat = new Intl.NumberFormat();

export function mapNgRatingString(rs: string) {
  switch (rs) {
    case '':
      return 'None';
    case 'e':
      return 'Standalone';
    default:
      return 'Broken Value';
  }
}

export function NgCredits(props: GameComponentProps) {
  const extData: ExtData | undefined = props.game.extData?.nga;
  const credits = extData?.credits || [];

  return (
    <div className='browse-right-sidebar__row'>
      <p>Credits: </p>
      {credits.map((credit, idx) => {
        return (
          <div className='nga-credit' key={idx}>
            {credit.roles?.map((role, idx) => {
              if (role in ROLE_ICONS) {
                const Component = ROLE_ICONS[role];
                return (
                  <div
                    key={idx}
                    className='nga-credit-icon'
                    title={role}>
                    <Component />
                  </div>
                );
              } else {
                return (
                  <div
                    key={idx}>
                    {role}
                  </div>
                );
              }
            })}
            <div
              className='nga-credt-name browse-right-sidebar__searchable'
              onClick={() => {
                props.doSearch(`developer:"${credit.name}"`);
              }}>
              {credit.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NgRating(props: GameComponentProps) {
  const extData: ExtData | undefined = props.game.extData?.nga;
  const { GameComponentDropdownSelectField } = window.ext.components;
  const rating = extData?.rating || '';
  const { editable } = props;

  const items: DropdownItem[] = [{
    key: '',
    value: 'None',
  }, {
    key: 'e',
    value: 'Everyone'
  }, {
    key: 't',
    value: 'Teen'
  }, {
    key: 'm',
    value: 'Mature'
  }, {
    key: 'a',
    value: 'Adult'
  }];

  return editable ? (
    <GameComponentDropdownSelectField
      header='NG Rating'
      text={rating}
      placeholder='No Rating'
      items={items}
      onChange={(value) => props.updateGameExtData('nga', 'rating', value)}
      {...props} />
  ) : (
    <div className='browse-right-sidebar__row browse-right-sidebar__row--one-line'>
      <p>NG Rating: </p>
      {rating === '' ? (
        <p>None</p>
      ) : (
        <div className={`ng-rating-sidebar ng-image-rating_${rating.toLowerCase()}`}></div>
      )}
    </div>
  );
}

export function NgScore(props: GameComponentProps) {
  const extData: ExtData | undefined = props.game.extData?.nga;
  const { GameComponentInputField } = window.ext.components;
  const score = Number(extData?.score) || 0;
  const { updateGameExtData } = props;

  return (
    <GameComponentInputField
      header='NG Score'
      text={score.toString()}
      placeholder='No Score'
      onChange={(value) => {
        // Strip leading zeroes
        const cleanValue = value.replace(/^0+/, '');
        // Make sure we're a numeric (allow decimals)
        if (/^-?\d+(\.\d+)?$/.test(cleanValue)) {
          updateGameExtData('nga', 'score', Number(cleanValue));
        }
      }}
      {...props} />
  );
}

export function NgViews(props: GameComponentProps) {
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

export function NgFaves(props: GameComponentProps) {
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
