import { LangContainer } from '@shared/lang';
import * as React from 'react';
import { LangContext } from '../util/lang';
import { ConfirmElement, ConfirmElementArgs } from './ConfirmElement';
import { InputElement, InputField } from './InputField';
import { OpenIcon } from './OpenIcon';
import { CheckBox } from './CheckBox';
import { Playlist } from 'flashpoint-launcher';

export type PlaylistItemContentProps = {
  editingDisabled: boolean;
  editingExtremeDisabled: boolean;
  editing: boolean;
  playlist: Playlist;

  onDescriptionChange: (event: React.ChangeEvent<InputElement>) => void;
  onExtremeToggle: (isExtreme: boolean) => void;
  onKeyDown: (event: React.KeyboardEvent<InputElement>) => void;
  onSave: () => void;
  onDiscard: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDownloadPlaylistContents: (playlistId: string) => void;
  onDuplicatePlaylist: (playlistId: string) => void;
  onExportPlaylist: (playlistId: string) => void;
}

export function PlaylistItemContent(props: PlaylistItemContentProps) {
  const allStrings = React.useContext(LangContext);
  const strings = allStrings.playlist;

  let className = 'playlist-list-content';
  if (props.editing) { className += ' playlist-list-content--edit'; }

  return (
    <div className={className}>
      <div className='playlist-list-content__inner'>
        { props.editingDisabled ? undefined : (
          <div className='playlist-list-content__edit'>
            <div className='playlist-list-content__id'>
              <p className='playlist-list-content__id-pre'>{strings.id}: </p>
              <div className='playlist-list-content__id-text'>
                <InputField
                  text={props.playlist.id}
                  multiline={false} />
              </div>
            </div>
            <div className='playlist-list-content__buttons'>
              { props.editing ? (
                <>
                  {/* Save Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--confirm'
                    title={strings.saveDesc}
                    onClick={props.onSave}>
                    <OpenIcon icon='check' />
                  </div>
                  {/* Discard Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--warning'
                    title={strings.discardDesc}
                    onClick={props.onDiscard}>
                    <OpenIcon icon='x' />
                  </div>
                </>
              ) : (
                <>
                  {/* Download Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--confirm'
                    title={allStrings.menu.downloadPlaylistContent}
                    onClick={() => props.onDownloadPlaylistContents(props.playlist.id)}>
                    <OpenIcon icon='data-transfer-download' />
                  </div>
                  {/* Duplicate Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--confirm'
                    title={strings.duplicatePlaylistDesc}
                    onClick={() => props.onDuplicatePlaylist(props.playlist.id)}>
                    <OpenIcon icon='layers' />
                  </div>
                  {/* Export Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--confirm'
                    title={strings.exportPlaylistDesc}
                    onClick={() => props.onExportPlaylist(props.playlist.id)}>
                    <OpenIcon icon='box' />
                  </div>
                  {/* Edit Button */}
                  <div
                    className='playlist-list-content__button playlist-list-content__button--confirm'
                    title={strings.editDesc}
                    onClick={props.onEdit}>
                    <OpenIcon icon='pencil' />
                  </div>
                  {/* Delete Button */}
                  <ConfirmElement
                    message={allStrings.dialog.deletePlaylist}
                    onConfirm={props.onDelete}
                    render={renderDeleteButton}
                    extra={strings} />
                </>
              ) }
            </div>
          </div>
        ) }
        {/* Description */}
        <InputField
          text={props.playlist.description}
          placeholder={strings.noDescription}
          className='playlist-list-content__description'
          editable={props.editing && !props.editingDisabled}
          onChange={props.onDescriptionChange}
          onKeyDown={props.onKeyDown}
          multiline={true} />
        {/* Extreme */}
        <div className="playlist-list-content__extreme">
          {
            (props.editing && !props.editingExtremeDisabled) ? (
              <>
                <CheckBox
                  checked={props.playlist.extreme}
                  onToggle={props.onExtremeToggle}
                />
              </>
            ) : undefined
          }
          {
            ((props.editing && !props.editingExtremeDisabled) || props.playlist.extreme) ? (
              <span>{strings.extreme}</span>
            ) : undefined
          }
        </div>
      </div>
    </div>
  );
}

function renderDeleteButton({ confirm, extra }: ConfirmElementArgs<LangContainer['playlist']>): JSX.Element {
  return (
    <div
      className='playlist-list-content__button playlist-list-content__button--warning'
      title={extra.deleteDesc}
      onClick={confirm} >
      <OpenIcon icon='trash' />
    </div>
  );
}
