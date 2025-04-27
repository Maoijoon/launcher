import { NgFaves, NgRating, NgScore, NgViews } from './components/components';

const components: Record<string, React.ComponentType<any>> = {
  'NgRating': NgRating,
  'NgScore': NgScore,
  'NgViews': NgViews,
  'NgFaves': NgFaves,
};


(function() {
  // Update the display settings with our components
  const compDisplay = [
    'NgRating',
    'NgViews',
    'NgScore',
    'NgFaves',
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
}());

export default components;
