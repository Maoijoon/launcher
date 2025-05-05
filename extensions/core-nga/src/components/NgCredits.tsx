import { GameComponentProps } from 'flashpoint-launcher-renderer';
import { IconType } from 'react-icons';
import { FaBug, FaChalkboardTeacher, FaCog, FaCrown, FaDesktop, FaDollarSign, FaFilm, FaMicrophone, FaMusic, FaPaintBrush, FaPenAlt, FaPencilAlt, FaSun, FaTruck, FaVolumeUp } from 'react-icons/fa';
import { ExtData } from './types';

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

export default function NgCredits(props: GameComponentProps) {
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
