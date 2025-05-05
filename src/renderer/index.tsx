import * as remote from '@electron/remote';
import { init } from '@module-federation/enhanced/runtime';
import store from '@renderer/store/store';
import { BackIn } from '@shared/back/types';
import { CustomIPC } from '@shared/interfaces';
import { LogLevel } from '@shared/Log/interface';
import { MessageBoxSyncOptions, ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { ShortcutProvider } from 'react-keybind';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ConnectedApp from './containers/ConnectedApp';
import { ContextReducerProvider } from './context-reducer/ContextReducerProvider';
import { CurationContext } from './context/CurationContext';
import { PreferencesContextProvider } from './context/PreferencesContext';
import { ProgressContext } from './context/ProgressContext';
import { logFactory } from './util/logging';

(async () => {
  init({
    name: 'host',
    remotes: [],
    shared: {
      react: {
        version: '19.1.0',
        scope: 'default',
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: '19.1.0'
        }
      },
      'react-dom': {
        version: '19.1.0',
        scope: 'default',
        lib: () => ReactDOM,
        shareConfig: {
          singleton: true,
          requiredVersion: '19.1.0'
        }
      }
    }
  });

  // Replace alert function with a dialog
  globalThis.alert = function (str) {
    const options: MessageBoxSyncOptions = {
      type: 'warning',
      buttons: ['Ok'],
      defaultId: 0,
      cancelId: 0,
      detail: str,
      message: ''
    };
    remote.dialog.showMessageBoxSync(options);
  };
  window.log = {
    trace: logFactory(LogLevel.TRACE, window.Shared.back),
    debug: logFactory(LogLevel.DEBUG, window.Shared.back),
    info: logFactory(LogLevel.INFO, window.Shared.back),
    warn: logFactory(LogLevel.WARN, window.Shared.back),
    error: logFactory(LogLevel.ERROR, window.Shared.back)
  };
  // Toggle DevTools when CTRL+SHIFT+I is pressed
  window.addEventListener('keypress', (event) => {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
      window.Shared.toggleDevtools();
      event.preventDefault();
    }
  });
  // Reload window with CTRL+SHIFT+R
  window.addEventListener('keypress', (event) => {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyR') {
      ipcRenderer.invoke(CustomIPC.RELOAD_WINDOW);
      event.preventDefault();
    }
  });

  // Wait for the preferences and config to initialize
  await window.Shared.waitUntilInitialized();

  // Start keepalive routine
  setInterval(async () => {
    try {
      await window.Shared.back.request(BackIn.KEEP_ALIVE);
    } catch {
      /** Ignore any bad response */
    }
  }, 30000);

  const container = document.getElementById('root')!;
  const root = createRoot(container);

  // Render the application
  root.render(
    <Provider store={store}>
      <HashRouter>
        <ShortcutProvider>
          <PreferencesContextProvider>
            <ContextReducerProvider context={CurationContext}>
              <ContextReducerProvider context={ProgressContext}>
                <ConnectedApp />
              </ContextReducerProvider>
            </ContextReducerProvider>
          </PreferencesContextProvider>
        </ShortcutProvider>
      </HashRouter>
    </Provider>
  );
})();
