// React + plugins
import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import ReactGA from "react-ga";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faClone} from "@fortawesome/free-solid-svg-icons/faClone";
import {faFileImport} from "@fortawesome/free-solid-svg-icons/faFileImport";
import {faFileExport} from "@fortawesome/free-solid-svg-icons/faFileExport";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

// Custom helpers
import {colors} from "../../App";
import {V1, handleError, copySpec, CONFLICT_409} from "../../common/services";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import ImportExportSpecDialog from "../../common/dialogs/ImportExportSpecDialog";

import '../../index.css';
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
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);

    const [redirect, setRedirect] = useState<string>('');

    const [showImportExportSpec, setShowImportExportSpec] = useState<boolean>(false);

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

    const cloneSpec = (spec: V1.Service) => {
        if (!spec || !spec.key) { return; }

        V1.AppSpecService.getServiceById(spec.key).then(existing => {
            const specCopy = copySpec(existing);

            V1.AppSpecService.createService(specCopy).then(appSpec => {
                ReactGA.event({
                    category: 'application',
                    action: 'clone',
                    label: appSpec.key
                });
                props.specs.push(appSpec);
                setRedirect('/my-catalog/'+specCopy.key);
            }).catch(reason => {
                if (CONFLICT_409(reason)) {
                    // Copy of this spec already exists, redirect to catalog to see it
                    setRedirect(`/my-catalog`);
                } else {
                    handleError(`Failed to clone ${specCopy.key} app spec`, reason)
                }
            });
        }).catch(reason => {
            handleError(`Failed to clone ${spec.key} app spec: key=${spec.key} not found: `, reason)
        });
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

    const confirmDelete = (spec: V1.Service) => {
        setSelectedSpec(spec);
        setShowConfirmDelete(true);
    }

    const importSpec = () => {
        setSelectedSpec(undefined);
        setShowImportExportSpec(true);
    }

    return (
        <Container fluid={false}>
            {
                redirect && <Navigate to={redirect} replace />
            }
            <div style={{ height: "10vh" }}></div>
            <h2 className={'marginTop pull-left'}>My Catalog</h2>
            <Button className={'btn-secondary btn-lg pull-right m-10'} onClick={createSpec}>
                <FontAwesomeIcon icon={faPlus} /> Create New Application
            </Button>
            <Button className={'btn-secondary btn-lg pull-right m-10'} onClick={importSpec}>
                <FontAwesomeIcon icon={faFileImport} /> Import Spec
            </Button>
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
                                }} onClick={() => {setSelectedSpec(spec); setShowImportExportSpec(true)}}>
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

            <ImportExportSpecDialog spec={selectedSpec}
                                    show={showImportExportSpec}
                                    onClose={() => setShowImportExportSpec(false)}
                                    setRedirect={setRedirect}></ImportExportSpecDialog>

            <ConfirmDialog show={showConfirmDelete}
                           title={`Confirm Delete: ${selectedSpec?.id}`}
                           onClose={() => setShowConfirmDelete(false)}
                           onConfirm={() => deleteSelectedSpec()}>
                <p>You are about to delete the following catalog application: {selectedSpec?.label}.</p>
                <p>Are you sure?</p>
            </ConfirmDialog>
        </Container>
    );
}

export default MyCatalogPage;
