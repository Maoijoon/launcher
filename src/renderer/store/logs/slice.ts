import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILogEntry } from 'flashpoint-launcher';

type LogsState = {
  offset: number;
  entries: ILogEntry[];
}

const initialState: LogsState = {
  offset: 0,
  entries: []
};

type AddLogEntryAction = {
  entry: ILogEntry,
  index: number
}

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setEntries(state: LogsState, { payload }: PayloadAction<ILogEntry[]>) {
      state.entries = payload;
    },
    addLogEntries(state: LogsState, { payload }: PayloadAction<ILogEntry[]>) {
      state.entries = state.entries.concat(payload);
    },
    addLogEntry(state: LogsState, { payload }: PayloadAction<AddLogEntryAction>) {
      state.entries[payload.index - state.offset] = payload.entry;
    },
    clearLogs(state: LogsState) {
      state.entries = [];
    }
  }
});

export const { actions: logsActions } = logsSlice;
export const {
  clearLogs
} = logsSlice.actions;
export default logsSlice.reducer;
