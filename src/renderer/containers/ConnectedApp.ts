import { withCurate } from '@renderer/containers/withCurateState';
import { withFpfss } from '@renderer/containers/withFpfss';
import { withSearch } from '@renderer/containers/withSearch';
import { withView } from '@renderer/containers/withView';
import { withShortcut } from '@renderer/store/reactKeybindCompat';
import { App } from '../components/app';
import { withMainState } from './withMainState';
import { withNavigation } from './withNavigation';
import { withPreferences } from './withPreferences';
import { withTagCategories } from './withTagCategories';
import { withTasks } from './withTasks';
import { withLogs } from './withLogs';

export default withLogs(withView(withFpfss(withSearch(withShortcut(withNavigation(withCurate(withTasks(withMainState(withTagCategories(withPreferences(App)))))))))));
