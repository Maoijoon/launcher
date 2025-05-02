import { NgCredits, NgFaves, NgRating, NgScore, NgViews, NgRatingGridIcon, NgRatingListIcon, NgRatingSearchableSelect } from './components/components';

const components: Record<string, React.ComponentType<any>> = {
  'NgRating': NgRating,
  'NgScore': NgScore,
  'NgViews': NgViews,
  'NgFaves': NgFaves,
  'NgCredits': NgCredits,
  'NgRatingGridIcon': NgRatingGridIcon,
  'NgRatingListIcon': NgRatingListIcon,
  'NgRatingSearchableSelect': NgRatingSearchableSelect,
};

(function() {
  // Update the display settings with our components
  const compDisplay = [
    'NgRating',
    'NgViews',
    'NgScore',
    'NgFaves',
    'NgCredits',
  ];

  // Insert below alt titles
  const sidebarMiddle = [...window.displaySettings.gameSidebar.middle];
  const platformsIdx = sidebarMiddle.findIndex(s => s === 'game_alternateTitles');
  if (platformsIdx > -1 && platformsIdx <= sidebarMiddle.length) {
    // Place our components after tha platforms component
    window.displaySettings.gameSidebar.middle = [
      ...sidebarMiddle.slice(0, platformsIdx),
      ...compDisplay,
      ...window.displaySettings.gameSidebar.middle.slice(platformsIdx)
    ];
  } else {
    // If platforms is not in the middle to put after, just add to end of middle section
    window.displaySettings.gameSidebar.middle = sidebarMiddle.concat(compDisplay);
  }

  // Add role icon
  window.displaySettings.gameGrid.upper.unshift('NgRatingGridIcon');
  window.displaySettings.gameList.icons.unshift('NgRatingListIcon');

  window.displaySettings.searchComponents.push('NgRatingSearchableSelect');
  window.ext.orderables.push({
    title: 'NG Ratings',
    extId: 'nga',
    key: 'rating',
    default: 'e'
  });
  window.ext.orderables.push({
    title: 'NG Views',
    extId: 'nga',
    key: 'views',
    default: 0
  });
  window.ext.orderables.push({
    title: 'NG Score',
    extId: 'nga',
    key: 'score',
    default: 0
  });
  window.ext.orderables.push({
    title: 'NG Faves',
    extId: 'nga',
    key: 'faves',
    default: 0
  });
}());

export default components;
