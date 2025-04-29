import { createContext, ReactNode, useEffect, useState } from 'react';
import { GameComponentAddApps, GameComponentAlternateTitles, GameComponentDates, GameComponentLanguage, GameComponentLegacyData, GameComponentNotes, GameComponentOriginalDescription, GameComponentPlatforms, GameComponentPlaylistNotes, GameComponentPlayMode, GameComponentPublisher, GameComponentRuffleSupport, GameComponentSeries, GameComponentSource, GameComponentStatus, GameComponentTags, GameComponentVersion } from './GameComponents';

type ComponentMap = Record<string, React.ComponentType<any>>;

type DynamicComponentProviderProps = {
  fileList: string[];
  children: ReactNode;
}

export const DynamicComponentContext = createContext<{
  components: ComponentMap;
  loading: boolean;
}>({
  components: {},
  loading: true,
});

const DEFAULT_COMPONENT_MAP: ComponentMap = {
  'game_alternateTitles': GameComponentAlternateTitles,
  'game_tags': GameComponentTags,
  'game_platforms': GameComponentPlatforms,
  'game_series': GameComponentSeries,
  'game_publisher': GameComponentPublisher,
  'game_source': GameComponentSource,
  'game_playMode': GameComponentPlayMode,
  'game_status': GameComponentStatus,
  'game_version': GameComponentVersion,
  'game_language': GameComponentLanguage,
  'game_originalDescription': GameComponentOriginalDescription,
  'game_legacyData': GameComponentLegacyData,
  'game_addApps': GameComponentAddApps,
  'game_dates': GameComponentDates,
  'game_notes': GameComponentNotes,
  'game_playlistNotes': GameComponentPlaylistNotes,
  'game_ruffleSupport': GameComponentRuffleSupport,
};

export function DynamicComponentProvider({ fileList, children }: DynamicComponentProviderProps) {
  const [components, setComponents] = useState<ComponentMap>(DEFAULT_COMPONENT_MAP);
  const [loading, setLoading] = useState(true);
  const [loadedFiles, setLoadedFiles] = useState<string[]>([]);

  useEffect(() => {
    const newFiles = fileList.filter(f => !loadedFiles.includes(f));

    if (newFiles.length > 0) {
      setLoading(true);

      const loadFiles = async (files: string[]) => {
        for (const file of files) {
          try {
            const module = await import(/* webpackIgnore: true */ file);
            const newComponents = module.default || {};
            console.log('Imported components: ', Object.keys(newComponents));
            setComponents(prevComponents => ({
              ...prevComponents,
              ...newComponents
            }));
            log.debug('Extensions', `Loaded dynamic component file '${file}'`);
          } catch (err) {
            log.error('Extensions', `Failed to load dynamic component file '${file}': ${err}`);
          }
        }
        setLoading(false);
      };

      setLoadedFiles(prev => [...prev, ...newFiles]);
      loadFiles(newFiles);
    }
  }, [fileList]);

  return (
    <DynamicComponentContext.Provider value={{ components, loading }}>
      {children}
    </DynamicComponentContext.Provider>
  );
}
