import {useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {colors} from "../../App";
import {deepCopy, V1} from "../services";
import {FormControl} from "react-bootstrap";
import React, {Dispatch, SetStateAction, useState} from "react";
import {newSpec} from "../services/userapps.service";

interface ImportExportSpecDialogProps {
    // Content properties
    title?: string;
    spec?: V1.Service;

    // Display properties
    show: boolean;
    height?: string;

    // Event handlers
    onClose?: (props: ImportExportSpecDialogProps) => void;
    onConfirm?: (props: ImportExportSpecDialogProps) => void;
    setRedirect?: Dispatch<SetStateAction<string>>
}

const ImportExportSpecDialog = (props: ImportExportSpecDialogProps) => {
    // Global state
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const user = useSelector((state: any) => state.auth.user);

    const [specJsonToImport, setSpecJsonToImport] = useState<string | undefined>(JSON.stringify(newSpec(), null ,2));
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSpecJsonChanged = (event: any) => {
        setSpecJsonToImport(event.target.value);
    };

    const onConfirm = (event: any) => {
        if (props.spec) {
            console.log('Exporting spec: ', props.spec);
            exportSpec(props.spec);
        } else if (specJsonToImport) {
            console.log('Importing spec: ', specJsonToImport);
            importSpec(specJsonToImport);
        }
        if (props.onConfirm) {
            props.onConfirm(props)
        }
    }

    const onClose = (event: any) => {
        if (props.onClose) {
            props.onClose(props)
        }
    }

    const isDisabled = (): boolean => {
        if (props.spec) {
            return false;
        } else if (specJsonToImport) {
            try {
                return !JSON.parse(specJsonToImport);
            } catch {
                return true;
            }
        }

        return true;
    }

    const exportSpec = (spec: V1.Service) => {
        try {
            const json = JSON.stringify(spec, undefined, 2);
            navigator.clipboard.writeText(json).then(() => {
                console.log('Spec JSON copied to clipboard!');
            }).catch((e) => {
                console.error('Failed to copy text to clipboard: ', e);
            });
        } catch (e) {
            console.error('Error copying text to clipboard: ', e);
        }
    }
    const importSpec = (specJson: string) => {
        try {
            const spec: V1.Service = JSON.parse(specJson);
            if (!spec?.key) {
                console.error('Error: you must assign a unique key to this service to save it');
                setErrorMessage('"key" is required');
                return;
            }

            return V1.AppSpecService.getServiceById(spec.key).then((existing) => {
                console.error(`Failed to save spec: key=${spec.key} already exists: `, existing);
                setErrorMessage('Spec already exists: ' + spec.key);
            }).catch((e) => {
                return V1.AppSpecService.createService(spec).then(imported => {
                    // navigate to /all-apps/{key}/edit
                    console.log('Successfully imported spec: ', imported);
                    if (props.setRedirect) {
                        props.setRedirect(`/all-apps/${imported.key}`);
                    }
                }).catch((e) => {
                    console.error(`Failed to import new spec with key=${spec.key}: `, e);
                    setErrorMessage(e);
                });
            });


        } catch (e) {
            console.error('Failed to parse JSON: ', e);
            setErrorMessage('Invalid JSON: ' + e);
        }
    }

    return (
        <Modal show={props.show}
               size={'lg'}
               fullscreen={'true'}>
            <Modal.Header style={{
                backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                <Modal.Title>{props.title ? props.title : props.spec ? `Export Spec: ${props.spec.key}` : 'Import New Spec'}</Modal.Title>
                <div>
                    <Button variant={darkThemeEnabled ? 'dark' : 'light'} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body style={{
                backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark : colors.backgroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                {
                    props.spec ? <>
                        <pre>{JSON.stringify(props.spec, null ,4)}</pre>
                    </> :
                    <>
                        <FormControl style={{height: props.height || '40vh'}} as={'textarea'} required value={specJsonToImport} onChange={(e) => handleSpecJsonChanged(e)}></FormControl>
                    </>
                }

            </Modal.Body>
            <Modal.Footer style={{
                backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                <span style={{ color: 'red' }}>{errorMessage}</span>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onConfirm} disabled={isDisabled()}>
                    {
                        props.spec ? 'Copy to Clipboard' : 'Import'
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImportExportSpecDialog;
