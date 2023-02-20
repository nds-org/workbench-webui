import React, {useEffect, useState} from 'react';
import '../../index.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {V1, handleError} from "../../common";

import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";

import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {colors} from "../../App";
import ReactGA from "react-ga";
import {faClone, faFileExport, faPlus} from "@fortawesome/free-solid-svg-icons";

import './MyCatalog.css';

const sortBy = (s1: V1.Service, s2: V1.Service) => {
    const sid1 = s1.label+"";
    const sid2 = s2.label+""
    if (sid1 > sid2) {
        return 1;
    } else if (sid1 < sid2) {
        return -1;
    } else {
        return 0;
    }
}

const MyCatalogPage = (props: any) => {
    // Global state
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);
    const user = useSelector((state: any) => state.auth.user);

    // Server data
    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);

    const [redirect, setRedirect] = useState<string>('');

    // Delete confirmation
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [selectedSpec, setSelectedSpec] = useState<V1.Service>();

    useEffect(() => {
        if (env?.customization?.product_name) {
            document.title = `${env?.customization?.product_name}: My Catalog`;
        }
    }, [env]);

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            ReactGA.pageview('/my-catalog');
        }
    }, [env?.analytics_tracking_id]);

    useEffect(() => {
        if (!Object.keys(env).length) return;
        let filter = (s: V1.Service) => s.catalog === 'user';
        if (user?.groups?.includes('/workbench-admins')) {
            filter = () => true;
        }
        V1.AppSpecService.listServicesAll().then(specs => setSpecs(specs.filter(filter))).catch(reason => handleError('Failed to fetch specs: ', reason));
        V1.UserAppService.listUserapps().then(stacks => setStacks(stacks)).catch(reason => handleError('Failed to fetch stacks: ', reason));
    }, [env, user?.groups]);

    const cloneSpec = async (spec: V1.Service) => {
        if (!spec || !spec.key) { return; }
        const existing: V1.Service = await V1.AppSpecService.getServiceById(spec.key);

        existing.id = '';
        existing.catalog = 'user';
        existing.label = 'Copy of ' + (existing.label || existing.key)
        existing.key = existing.key + 'copy'

        const copied = await V1.AppSpecService.createService(existing);
        setRedirect('/my-catalog/'+copied.key);
    }

    const deleteSelectedSpec = () => {
        if (!selectedSpec || !selectedSpec.key) { return; }
        V1.AppSpecService.deleteService(selectedSpec.key).then((deleted) => {
            const s = specs.find(s => s.key === selectedSpec.key);
            if (s) {
                const index = specs.indexOf(s);
                specs.splice(index, 1);
            }
            setShowConfirmDelete(false);
        });
    }

    const createSpec = () => {
        setRedirect('/my-catalog/create');
    }

    const editSpec = (spec?: V1.Service) => {
        if (!spec || !spec.key) { return; }
        setRedirect('/my-catalog/' + spec.key);
    }

    const importSpec = async (jsonStr: string) => {
        if (!jsonStr) { return; }

        try {
            const spec = JSON.parse(jsonStr);
            const imported = await V1.AppSpecService.createService(spec);
            return imported;
        } catch (e) {
            console.log('Failed to parse JSON: ', e);
            return;
        }
        // TODO: navigate to /all-apps/{id}/edit
    }

    const exportSpec = (spec?: V1.Service) => {
        if (!spec || !spec.id) { return; }
        const jsonStr = JSON.stringify(spec);

        // TODO: show modal?
    }

    const confirmDelete = (spec: V1.Service) => {
        setSelectedSpec(spec);
        setShowConfirmDelete(true);
    }

    return (
        <Container fluid={false}>
            {
                redirect && <Navigate to={redirect} replace />
            }
            <div style={{ height: "10vh" }}></div>
            <h2 className={'marginTop pull-left'}>My Catalog</h2>
            <button className={'btn-secondary btn-lg pull-right'} onClick={()=> createSpec()}>
                <FontAwesomeIcon icon={faPlus} /> Create New Application
            </button>
            <Table className='compact' responsive='sm' borderless={true} style={{ backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black' }}>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th style={{ width: '10%' }}>Export</th>
                    <th style={{ width: '10%' }}>Clone</th>
                    <th style={{ width: '10%' }}>Edit</th>
                    <th style={{ width: '10%' }}>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    specs.sort(sortBy).map(spec =>
                        <tr key={spec.key}>
                            <td>{spec.key}</td>
                            <td>{spec.label}</td>
                            <td>
                                <Button title={'Export Application Spec'} size={'sm'} style={{
                                    color: darkThemeEnabled ? colors.textColor.dark: colors.textColor.light,
                                    backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark: colors.backgroundColor.light
                                }} onClick={() => exportSpec(spec)}>
                                    <FontAwesomeIcon icon={faFileExport} />
                                </Button>
                            </td>
                            <td>
                                <Button title={'Clone Application Spec'} size={'sm'} style={{
                                    color: darkThemeEnabled ? colors.textColor.dark: colors.textColor.light,
                                    backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark: colors.backgroundColor.light
                                }} onClick={() => cloneSpec(spec)}>
                                    <FontAwesomeIcon icon={faClone} />
                                </Button>
                            </td>
                            <td>
                                <Button title={'Edit Application Spec'} size={'sm'} style={{
                                    color: darkThemeEnabled ? colors.textColor.dark: colors.textColor.light,
                                    backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark: colors.backgroundColor.light
                                }} onClick={() => editSpec(spec)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </td>
                            <td>
                                <Button title={'Delete Application Spec'} size={'sm'} style={{
                                    color: darkThemeEnabled ? colors.textColor.dark: colors.textColor.light,
                                    backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark: colors.backgroundColor.light
                                }} onClick={() => confirmDelete(spec)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>

                    )
                }
                </tbody>
            </Table>

            <Modal show={showConfirmDelete}
                   fullscreen={'true'}>
                <Modal.Header style={{
                    backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                    color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
                }}>
                    <Modal.Title>Confirm Delete: {selectedSpec?.id}</Modal.Title>
                    <div>
                        <Button variant={darkThemeEnabled ? 'dark' : 'light'} onClick={() => setShowConfirmDelete(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </div>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: darkThemeEnabled ? colors.backgroundColor.dark : colors.backgroundColor.light,
                    color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
                }}>
                    <p>You are about to delete the following catalog application: {selectedSpec?.label}.</p>
                    <p>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer style={{
                    backgroundColor: darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light,
                    color: darkThemeEnabled ? colors.textColor.dark : colors.textColor.light,
                }}>
                    <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>No</Button>
                    <Button variant="primary" onClick={() => deleteSelectedSpec()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
    /*
    <Modal.Footer>
                    <Button variant="secondary" onClick={closeConsole}>
                        Close
                    </Button>
                </Modal.Footer>
     */
}

export default MyCatalogPage;
