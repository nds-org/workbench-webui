import Modal from "react-bootstrap/Modal";
import {colors} from "../../App";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import React from "react";
import {useSelector} from "react-redux";

interface ConfirmDialogProps {
    // Primitives
    title: string;
    show: boolean;

    // Event handlers
    onClose: (props: ConfirmDialogProps) => void;
    onConfirm: (props: ConfirmDialogProps) => void;

    // Child elements (content)
    children: any;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
    // Global state
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);

    return (
        <Modal show={props.show}
               fullscreen={'true'}>
            <Modal.Header style={{
                backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                <Modal.Title>{props.title}</Modal.Title>
                <div>
                    <Button variant={darkThemeEnabled ? 'dark' : 'light'} onClick={() => props.onClose(props)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                </div>
            </Modal.Header>
            <Modal.Body style={{
                backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark : colors.backgroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                {props.children}
            </Modal.Body>
            <Modal.Footer style={{
                backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
            }}>
                <Button variant="secondary" onClick={() => props.onClose(props)}>No</Button>
                <Button variant="primary" onClick={() => props.onConfirm(props)}>Yes</Button>
            </Modal.Footer>
        </Modal>);
}

export default ConfirmDialog;
