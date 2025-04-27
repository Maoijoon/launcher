import * as flashpoint from 'flashpoint-launcher';

export async function activate(context: flashpoint.ExtensionContext): Promise<void> {
  flashpoint.dataExtensions.registerDataExtension({
    id: 'nga',
    searchables: [
      {
        key: 'rating',
        searchKey: 'rating',
        valueType: flashpoint.ExtSearchableType.String
      },
      {
        key: 'width',
        searchKey: 'width',
        valueType: flashpoint.ExtSearchableType.Number
      },
      {
        key: 'height',
        searchKey: 'height',
        valueType: flashpoint.ExtSearchableType.Number
      },
      {
        key: 'faves',
        searchKey: 'faves',
        valueType: flashpoint.ExtSearchableType.Number
      },
      {
        key: 'views',
        searchKey: 'views',
        valueType: flashpoint.ExtSearchableType.Number
      },
      {
        key: 'votes',
        searchKey: 'votes',
        valueType: flashpoint.ExtSearchableType.Number
      },
      {
        key: 'score',
        searchKey: 'score',
        valueType: flashpoint.ExtSearchableType.Number
      }
    ],
    indexes: [
      {
        name: 'rating',
        key: 'rating',
      },
      {
        name: 'faves',
        key: 'faves'
      },
      {
        name: 'views',
        key: 'views'
      },
      {
        name: 'votes',
        key: 'votes'
      },
      {
        name: 'score',
        key: 'score'
      }
    ]
  });
}
