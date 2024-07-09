"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value: unknown): Promise<unknown> {
        return value instanceof Promise ? value : new Promise(resolve => resolve(value));
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value: unknown) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value: unknown) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result: IteratorResult<unknown>) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

import React, { useState, useRef, useCallback, useEffect } from "react";
import { _ } from "@joplin/lib/locale";
import DialogButtonRow from "../DialogButtonRow";
import Dialog from "../Dialog";
import DialogTitle from "../DialogTitle";
import StyledInput from "../style/StyledInput";
import { IconSelector } from "./IconSelector";
import useAsyncEffect from "@joplin/lib/hooks/useAsyncEffect";
import Folder from "@joplin/lib/models/Folder";
import { FolderIconType } from "@joplin/lib/services/database/types";
import Button from "../Button/Button";
import bridge from "../../services/bridge";
import shim from "@joplin/lib/shim";
import FolderIconBox from "../FolderIconBox";
import { focus } from "@joplin/lib/utils/focusHandler";

interface DialogProps {
    folderId?: string;
    parentId?: string;
    dispatch: Function; // This could be further typed if you have a specific type for dispatch
    themeId: number;
}

function DialogComponent(props: DialogProps) {
    const [folderTitle, setFolderTitle] = useState('');
    const [foldersubtitle, setFoldersubtitle] = useState('');
    const [folderIcon, setFolderIcon] = useState<any>();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const subtitleInputRef = useRef<HTMLInputElement>(null);
    const isNew = !props.folderId;

    useAsyncEffect((event) => __awaiter(this, void 0, void 0, function* () {
        if (isNew) return;
        const folder = yield Folder.load(props.folderId);
        if (event.cancelled) return;
        setFolderTitle(folder.title);
        setFoldersubtitle(folder.subtitle);
        setFolderIcon(Folder.unserializeIcon(folder.icon));
    }), [props.folderId, isNew]);

    const onClose = useCallback(() => {
        props.dispatch({
            type: 'DIALOG_CLOSE',
            name: 'editFolder',
        });
    }, [props.dispatch]);

    useEffect(() => {
        focus('Dialog::titleInputRef', titleInputRef.current);
        setTimeout(() => {
            titleInputRef.current.select();
        }, 100);
    }, []);

    useEffect(() => {
        focus('Dialog::subtitleInputRef', subtitleInputRef.current);
        setTimeout(() => {
            subtitleInputRef.current.select();
        }, 100);
    }, []);

    const onButtonRowClick = useCallback(async (event: { buttonName: string }) => {
        if (event.buttonName === 'cancel') {
            onClose();
            return;
        }
        if (event.buttonName === 'ok') {
            const folder = {
                title: folderTitle,
                subtitle: foldersubtitle,
                icon: Folder.serializeIcon(folderIcon),
            };
            if (!isNew) folder.id = props.folderId;
            if (props.parentId) folder.parent_id = props.parentId;
            try {
                const savedFolder = await Folder.save(folder, { userSideValidation: true });
                onClose();
                props.dispatch({
                    type: 'FOLDER_SELECT',
                    id: savedFolder.id,
                });
            } catch (error) {
                bridge().showErrorMessageBox(error.message);
            }
            return;
        }
    }, [onClose, folderTitle, foldersubtitle, folderIcon, props.folderId, props.parentId, props.dispatch]);

    const onFolderTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFolderTitle(event.target.value);
    }, []);

    const onFoldersubtitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFoldersubtitle(event.target.value);
    }, []);

    const onFolderIconChange = useCallback((event: { value: any }) => {
        setFolderIcon(event.value);
    }, []);

    const onClearClick = useCallback(() => {
        setFolderIcon(null);
    }, []);

    const onBrowseClick = useCallback(async () => {
        const filePaths = await bridge().showOpenDialog({
            filters: [
                {
                    name: _('Images'),
                    extensions: ['jpg', 'jpeg', 'png'],
                },
            ],
        });
        if (filePaths.length !== 1) return;
        const filePath = filePaths[0];
        try {
            const dataUrl = await shim.imageToDataUrl(filePath, 256);
            setFolderIcon(icon => {
                return { ...icon, emoji: '', name: '', type: FolderIconType.DataUrl, dataUrl };
            });
        } catch (error) {
            await bridge().showErrorMessageBox(error.message);
        }
    }, []);

    const formTitleInputId = useId();
    const formsubtitleInputId = useId();

    function renderForm() {
        return (
            <div>
                <div className="form">
                    <div className="form-input-group">
                        <label htmlFor={formTitleInputId}>{_('Title')}</label>
                        <StyledInput
                            id={formTitleInputId}
                            type="text"
                            ref={titleInputRef}
                            value={folderTitle}
                            onChange={onFolderTitleChange}
                        />
                    </div>
                    <div className="form-input-group">
                        <label htmlFor={formsubtitleInputId}>{_('subtitle')}</label>
                        <StyledInput
                            id={formsubtitleInputId}
                            type="text"
                            ref={subtitleInputRef}
                            value={foldersubtitle}
                            onChange={onFoldersubtitleChange}
                        />
                    </div>
                    <div className="form-input-group">
                        <label>{_('Icon')}</label>
                        <div className="icon-selector-row">
                            {folderIcon && (
                                <div className="foldericon">
                                    <FolderIconBox folderIcon={folderIcon} />
                                </div>
                            )}
                            <IconSelector
                                title={_('Select emoji...')}
                                icon={folderIcon}
                                onChange={onFolderIconChange}
                            />
                            <Button ml={1} title={_('Select file...')} onClick={onBrowseClick} />
                            {folderIcon && <Button ml={1} title={_('Clear')} onClick={onClearClick} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function renderContent() {
        return <div className="dialog-content">{renderForm()}</div>;
    }

    const dialogTitle = isNew ? _('Create notebook') : _('Edit notebook');
    const dialogsubtitle = _('Fill in the details below');

    function renderDialogWrapper() {
        return (
            <div className="dialog-root">
                <DialogTitle title={dialogTitle} />
                <div className="dialog-subtitle">{dialogsubtitle}</div>
                {renderContent()}
                <DialogButtonRow themeId={props.themeId} onClick={onButtonRowClick} />
            </div>
        );
    }

    return (
        <Dialog onClose={onClose} className="master-password-dialog" renderContent={renderDialogWrapper} />
    );
}
export default DialogComponent;
