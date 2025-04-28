import { RightBrowseSidebar } from '../components/RightBrowseSidebar';
import { withConfirmDialog } from './withConfirmDialog';
import { withPreferences } from './withPreferences';

export const ConnectedRightBrowseSidebar = withConfirmDialog(withPreferences(RightBrowseSidebar));
