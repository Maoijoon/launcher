import { withView } from '@renderer/containers/withView';
import { Footer } from '../components/Footer';
import { withMainState } from './withMainState';
import { withNavigation } from './withNavigation';
import { withPreferences } from './withPreferences';

export const ConnectedFooter = withNavigation(withView(withMainState(withPreferences(Footer))));
