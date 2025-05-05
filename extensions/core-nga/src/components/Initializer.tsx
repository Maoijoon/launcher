import React from 'react';

export default function Initializer() {
  // Run this once when first loaded
  React.useEffect(() => {
    // Update the display settings with our components
    const compDisplay = [
      'nga/NgRating',
      'nga/NgViews',
      'nga/NgScore',
      'nga/NgFaves',
      'nga/NgCredits',
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
    window.displaySettings.gameGrid.upper.unshift('nga/NgRatingGridIcon');
    window.displaySettings.gameList.icons.unshift('nga/NgRatingListIcon');

    window.displaySettings.searchComponents.push('nga/NgRatingSearchableSelect');
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
  });

  return <></>;
}
