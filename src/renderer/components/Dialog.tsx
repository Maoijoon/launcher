import { compileSync, runSync } from '@mdx-js/mdx';
import { ProgressData } from '@renderer/context/ProgressContext';
import { cancelDialog, resolveDialog, updateDialogField } from '@renderer/store/main/slice';
import { getFileServerURL } from '@shared/Util';
import { DialogField, DialogState } from 'flashpoint-launcher';
import { ErrorBoundary } from 'react-error-boundary';
import * as runtime from 'react/jsx-runtime';
import { FloatingContainer } from './FloatingContainer';
import { InputField } from './InputField';
import { OpenIcon } from './OpenIcon';
import { ProgressBar } from './ProgressComponents';
import { SimpleButton } from './SimpleButton';

export type DialogProps = {
  dialog: DialogState,
  closeDialog: typeof cancelDialog,
  finishDialog: typeof resolveDialog,
  updateField: typeof updateDialogField
}

function renderMessage(dialog: DialogState) {
  if (dialog.mdx) {
    const baseUrl = getFileServerURL();
    const code = String(compileSync(dialog.message, {
      outputFormat: 'function-body',
    }));
    const { default: Content } = runSync(code, { ...runtime, baseUrl } as any);
    return <ErrorBoundary fallbackRender={({ error }) => <>{`Error rendering dialog: ${error}`}</>}>
      <Content />
    </ErrorBoundary>;
  } else {
    return (
      <div className={`dialog-message ${dialog.largeMessage ? 'dialog-message--large' : ''}`}>{dialog.message}</div>
    );
  }
}

export function Dialog(props: DialogProps) {
  const { dialog, closeDialog, finishDialog, updateField } = props;
  const message = renderMessage(dialog);

  const alignment = dialog.textAlign || 'center';

  return (
    <FloatingContainer>
      <div style={{ textAlign: alignment }}>
        {dialog.userCanCancel && (
          <div className='dialog-cancel-button' onClick={() => {
            closeDialog(dialog.id);
          }}>
            <OpenIcon icon='x' />
          </div>
        )}
        {message}
        {dialog.fields?.map(f => {
          return (
            <div key={f.name} className='dialog-field'>
              {f.message && (<div className='dialog-field-message'>{f.message}</div>)}
              <div className='dialog-field-input'>{renderDialogField(dialog.id, f, updateField)}</div>
            </div>
          );
        })}
        <div className='dialog-buttons-container'>
          {dialog.buttons.map((b, idx) => {
            return (
              <SimpleButton
                key={b}
                onClick={() => {
                  finishDialog({
                    id: dialog.id,
                    button: idx
                  });
                }}
                value={b} />
            );
          })}
        </div>
      </div>
    </FloatingContainer>
  );
}

function renderDialogField(dialogId: string, field: DialogField, updateField: typeof updateDialogField): JSX.Element {
  switch (field.type) {
    case 'string': {
      return (
        <InputField
          onChange={(event) => {
            updateField({
              id: dialogId,
              field: {
                name: field.name,
                value: event.currentTarget.value
              }
            });
          }}
          text={field.value}
          editable={!field.locked}
          placeholder={field.placeholder} />
      );
    }
    case 'progress': {
      // Wrap in progress data
      const data: ProgressData = {
        key: '',
        itemCount: 0,
        totalItems: 0,
        percentDone: field.value,
        usePercentDone: true,
        isDone: false
      };
      return (
        <ProgressBar
          progressData={data} />
      );
    }
    default: {
      return (
        <div>Unsupported Field Type</div>
      );
    }
  }
}
