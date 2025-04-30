import * as remote from '@electron/remote';
import { BackIn } from '@shared/back/types';
import { LogLevel } from '@shared/Log/interface';
import { stringifyLogEntries } from '@shared/Log/LogCommon';
import { updatePreferencesData } from '@shared/preferences/util';
import { clipboard } from 'electron';
import { useContext, useState } from 'react';
import { WithPreferencesProps } from '../../containers/withPreferences';
import { LangContext } from '../../util/lang';
import { Dropdown } from '../Dropdown';
import { LogData } from '../LogData';
import { useAppDispatch, useAppSelector } from '@renderer/hooks/useAppSelector';
import { clearLogs } from '@renderer/store/logs/slice';

export type LogsPageProps = WithPreferencesProps;

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;
const sourceLabels = [
  'Background Services',
  'Curation',
  'Game Launcher',
  'Language',
  'Launcher',
  'Log Watcher',
  'Server',
  'Extensions',
];
const levelLabels = [
  LogLevel.TRACE,
  LogLevel.DEBUG,
  LogLevel.INFO,
  LogLevel.WARN,
  LogLevel.ERROR,
];

export type LogsPageState = {
  /** Whether an upload has completed */
  uploaded: boolean;
  /** Whether an upload is in progress */
  uploading: boolean;
  /** Whether diagnostics has been fetched */
  fetchedDiagnostics: boolean;
}

export function LogsPage(props: LogsPageProps) {
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchedDiagnostics, setFetchedDiagnostics] = useState(false);
  const allStrings = useContext(LangContext);
  const strings = allStrings.logs;
  const { showLogSource, showLogLevel } = props.preferencesData;
  const logs = useAppSelector(state => state.logs);
  const dispatch = useAppDispatch();

  const logData = stringifyLogEntries(logs.entries, showLogSource, showLogLevel);

  const onSourceCheckboxClick = (index: number) => {
    const label = sourceLabels[index];
    updatePreferencesData({
      showLogSource: {
        ...showLogSource,
        [label]: !getBoolean(showLogSource[label]),
      },
    });
  };

  const onLevelCheckboxClick = (index: number) => {
    updatePreferencesData({
      showLogLevel: {
        ...showLogLevel,
        [index]: !getBoolean(showLogLevel[index as LogLevel]),
      },
    });
  };

  const onCopyClick = () => {
    if (!navigator.clipboard) {
      alert('Clipboard not available, failed to copy logs to clipboard');
    }
    const logData = logs.entries.filter(l => showLogLevel[l.logLevel as LogLevel])
    .map(formedLog => {
      return `[${LogLevel[formedLog.logLevel].padEnd(5)}] [${(new Date(formedLog.timestamp)).toLocaleTimeString('en-GB')}]: (${formedLog.source}) - ${formedLog.content}`;
    })
    .join('\n');
    navigator.clipboard.writeText(logData);
  };

  const onClearClick = () => {
    dispatch(clearLogs());
  };

  const onCopy404Click = () => {
    // Store found URLs
    const urls: string[] = [];
    for (const entry of logs.entries) {
      // All 404 entries start with 404
      if (entry && entry.content.startsWith('404')) {
        // Extract URL with regex
        const match = urlRegex.exec(entry.content);
        if (match && match.length > 0) {
          urls.push(match[1]);
        }
      }
    }
    // Copy with each URL on a new line
    clipboard.writeText(urls.join('\n'));
  };

  const onCopyDiagnosticsClick = async () => {
    window.Shared.back.request(BackIn.FETCH_DIAGNOSTICS)
    .then((diagnostics) => {
      setFetchedDiagnostics(true);
      clipboard.writeText(diagnostics);
    });
  };

  const onUploadClick = async (): Promise<void> => {
    setUploading(true);
    // IMPORTANT - Make sure they want to *publicly* post their info
    const res = await remote.dialog.showMessageBox({
      title: allStrings.dialog.areYouSure,
      message: allStrings.dialog.uploadPrivacyWarning,
      cancelId: 1,
      buttons: [allStrings.misc.yes, allStrings.misc.no]
    });
    if (res.response === 0) {
      // Ask backend to upload logs, sends back a log URL
      window.Shared.back.request(BackIn.UPLOAD_LOG)
      .then((data) => {
        setUploading(false);
        setUploaded(true);
        if (data) {
          // Write log URL to clipboard
          clipboard.writeText(data);
        }
      });
    } else {
      setUploading(false);
    }
  };

  return (
    <div className='log-page'>
      {/* Bar */}
      <div className='log-page__bar'>
        {/* Left */}
        <div className='log-page__bar__wrap'>
          <div className='log-page__bar__row'>
            <Dropdown text={strings.filters}>
              { sourceLabels.map((label, index) => (
                <label
                  key={index}
                  className='log-page__dropdown-item'>
                  <div className='simple-center'>
                    <input
                      type='checkbox'
                      checked={getBoolean(showLogSource[label])}
                      onChange={() => onSourceCheckboxClick(index)}
                      className='simple-center__vertical-inner' />
                  </div>
                  <div className='simple-center'>
                    <p className='simple-center__vertical-inner log-page__dropdown-item-text'>
                      {label}
                    </p>
                  </div>
                </label>
              )) }
            </Dropdown>
            <Dropdown text={strings.logLevels}>
              { levelLabels.map((label, index) => (
                <label
                  key={index}
                  className='log-page__dropdown-item'>
                  <div className='simple-center'>
                    <input
                      type='checkbox'
                      checked={getBoolean(showLogLevel[index as LogLevel])}
                      onChange={() => onLevelCheckboxClick(index)}
                      className='simple-center__vertical-inner' />
                  </div>
                  <div className='simple-center'>
                    <p className='simple-center__vertical-inner log-page__dropdown-item-text'>
                      {LogLevel[label]}
                    </p>
                  </div>
                </label>
              )) }
            </Dropdown>
          </div>
        </div>
        {/* Right */}
        <div className='log-page__bar__wrap log-page__bar__right'>
          <div>
            <div className='log-page__bar__right__inner'>
              {/* Copy Diagnostics Button */}
              <div className='log-page__bar__wrap'>
                <div className='simple-center'>
                  <input
                    type='button'
                    disabled={fetchedDiagnostics}
                    value={fetchedDiagnostics ? strings.copiedToClipboard : strings.copyDiagnostics}
                    onClick={onCopyDiagnosticsClick}
                    className='simple-button simple-center__vertical-inner log-page__upload-log' />
                </div>
              </div>
              {/* Upload Logs Button */}
              <div className='log-page__bar__wrap'>
                <div className='simple-center'>
                  <input
                    type='button'
                    disabled={uploading || uploaded}
                    value={uploaded ? strings.copiedToClipboard : strings.uploadLog}
                    onClick={onUploadClick}
                    className='simple-button simple-center__vertical-inner log-page__upload-log' />
                </div>
              </div>
              {/* Clear Button */}
              <div className='log-page__bar__wrap'>
                <div className='simple-center'>
                  <input
                    type='button'
                    value={strings.clearLog}
                    onClick={onClearClick}
                    className='simple-button simple-center__vertical-inner' />
                </div>
              </div>
              {/* Copy 404 URLs Button */}
              <div className='log-page__bar__wrap'>
                <div className='simple-center'>
                  <input
                    type='button'
                    value={strings.copy404Urls}
                    onClick={onCopy404Click}
                    className='simple-button simple-center__vertical-inner' />
                </div>
              </div>
              {/* Copy Button */}
              <div className='log-page__bar__wrap'>
                <div>
                  <input
                    type='button'
                    value={strings.copyText}
                    onClick={onCopyClick}
                    className='simple-button simple-center__vertical-inner' />
                </div>
              </div>
              {/* Add more right stuff here ... */}
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <LogData
        className='log-page__content'
        logData={logData}
        isLogDataHTML={true} />
    </div>
  );
}

/**
 * Coerce undefined values to true
 *
 * @param value Value to coerce
 */
function getBoolean(value?: boolean): boolean {
  return (value === undefined) ? true : value;
}
