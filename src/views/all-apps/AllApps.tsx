import {useEffect, useState} from 'react';
import { V1, handleError } from '../../common';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import {createTheme, MuiThemeProvider} from "@material-ui/core/styles";

import {StringParam, useQueryParam} from "use-query-params";
import {useSelector} from "react-redux";
import {colors} from "../../App";
import ReactGA from "react-ga";
import SearchCatalogHeader from "./SearchCatalogHeader";
import SpecCard from "./SpecCard";

const fetchStacks = () => {
    return V1.UserAppService.listUserapps().then(stacks => {
        // Sort by label or key
        return stacks.sort((s1, s2) => {
            const lc1 = s1.name?.toLowerCase() || s1.key;
            const lc2 = s2.name?.toLowerCase() || s2.key;
            return lc1.localeCompare(lc2);
        });
    }).catch(reason => handleError("Failed to fetch user apps tho", reason));
}

const theme = createTheme({
    palette: {
        type: 'dark'
    },
});
function AllAppsPage() {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const env = useSelector((state: any) => state.env);

    const [tags, setTags] = useState<Array<VocabTerm>>([]);

    const [stacks, setStacks] = useState<Array<V1.Stack>>([]);
    const [allSpecs, setAllSpecs] = useState<Array<V1.Service>>([]);
    const [specs, setSpecs] = useState<Array<V1.Service>>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState('');

    const [categoryName, setCategoryName] = useQueryParam('category', StringParam);

    const fetchSpecs = (filter: string, searchQuery: string) => {
        return V1.AppSpecService.listServicesAll().then(specs => {
            // Sort by label or key
            return specs.sort((s1, s2) => {
                const lc1 = s1.label?.toLowerCase() || s1.key;
                const lc2 = s2.label?.toLowerCase() || s2.key;
                return lc1.localeCompare(lc2);
            });
        }).then(allSpecs => {
            setAllSpecs(allSpecs);
            return allSpecs.filter((spec) => {
                if (!filter) return true;
                return spec?.tags?.includes(filter);
            });
        }).then(specs => {
            return specs.filter((spec) => {
                if (!searchQuery) return true;
                if (spec?.label?.includes(searchQuery)) return true;
                if (spec?.key?.includes(searchQuery)) return true;
                if (spec?.description?.includes(searchQuery)) return true;
                if (spec?.maintainer?.includes(searchQuery)) return true;
                return false;
            });
        });
    }

    useEffect(() => {
        if (env?.analytics_tracking_id) {
            if (filter && categoryName) {
                ReactGA.pageview(`/all-apps#${filter}?category=${categoryName}`);
            } else if (filter) {
                ReactGA.pageview(`/all-apps#${filter}`);
            } else if (categoryName) {
                ReactGA.pageview(`/all-apps?category=${categoryName}`);
            } else {
                ReactGA.pageview(`/all-apps`);
            }
        }
    }, [filter, categoryName, env?.analytics_tracking_id]);

    interface VocabTerm {
        id?: string;
        name?: string;
        definition?: string;
    }

    useEffect(() => {
        if (env?.customization?.product_name) {
            document.title = `${env?.customization?.product_name}: App Catalog`;
        }
    }, [env]);

    useEffect(() => {
        const hash = window.location.hash;
        const tagName = decodeURIComponent(hash.slice(1));
        const tag = tags?.find(t => tagName === t.name);
        if (tag) {
            setFilter(tag.id+"");
        }
    }, [tags]);

    useEffect(() => {
        if (!Object.keys(env).length) return;
        V1.VocabularyService.getVocabularyByName('tags').then(vocab => {
            setTags(vocab.terms || []);
        }).catch(reason => handleError("Failed to fetch tags", reason));
    }, [categoryName, env, env?.domain]);

    useEffect(() => {
        if (!Object.keys(env).length) return;
        fetchSpecs(filter, searchQuery).then(specs => setSpecs(specs || [])).catch(reason => handleError("Failed to fetch app specs: ", reason));
    }, [filter, searchQuery, env, env?.domain]);

    useEffect(() => {
        if (!Object.keys(env).length) return;
        fetchStacks().then(stacks => setStacks(stacks || [])).catch(reason => handleError("Failed to fetch user apps: ", reason));
    }, [stacks.length, env, env?.domain]);


    const css = `
        .list-group-item.active {
            font-weight: 700;
        }
        
        .badge {
            border-radius: 20px;
            margin-left: 15px;
            background-color: ${darkThemeEnabled ? colors.foregroundColor.dark : colors.foregroundColor.light};
            color: ${darkThemeEnabled ? colors.textColor.dark : colors.textColor.light};
        }
        
        /* Intentionally invert the colors on the category dropdown */
        .dropdown-toggle.btn, .dropdown-toggle.btn:active {
            width: 100%;
            border-radius: 25px;
            background-color: ${darkThemeEnabled ? colors.foregroundColor.light : colors.foregroundColor.dark};
            color: ${darkThemeEnabled ? colors.textColor.light : colors.textColor.dark};
        }
    `;

    return (
        <MuiThemeProvider theme={theme}>
            <Container fluid={true} style={{ paddingLeft: "0", paddingRight: "0", height: "100%" }}>
                <SearchCatalogHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery}></SearchCatalogHeader>

                <Row style={{ height: "100%" }}>
                    <Col className='col-3' style={{ paddingTop: "40px", paddingLeft: "60px", paddingRight: "20px", textAlign: "left", backgroundColor: darkThemeEnabled ? '#283845' : '#fff' }}>
                        <h3 style={{ paddingLeft: "15px" }}>Tags</h3>
                        {
                            <Dropdown style={{
                                margin: "20px",
                                width: "100%", marginLeft: "-15px" }}>
                                <DropdownButton title={categoryName || 'Select a category...'} style={{ width: "100%", borderRadius: "25px",
                                    backgroundColor: darkThemeEnabled ? colors.foregroundColor.light : colors.foregroundColor.dark,
                                    color: darkThemeEnabled ? colors.textColor.light : colors.textColor.dark
                                }}>
                                    <Dropdown.Item onClick={() => setCategoryName(undefined)}>All Categories</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setCategoryName('Functionality')}>Functionality</Dropdown.Item>
                                    {/*<Dropdown.Item onClick={() => setCategoryName('Technology')}>Technology</Dropdown.Item>*/}
                                    <Dropdown.Item onClick={() => setCategoryName('Language')}>Language</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        }

                        <ListGroup defaultActiveKey="#" style={{ marginTop: "28px", border: "none", minHeight: "49vh" }}>
                            {/* TODO: "Featured" Apps
                            <ListGroup.Item variant={darkThemeEnabled ? 'dark' : 'light'} active={filter==='featured'} key={"tag-featured"} action href={"#Featured"} onClick={() => setFilter('featured')} title="Show all applications">
                                Featured
                            </ListGroup.Item
                            >*/}
                            <style>{css}</style>
                            <ListGroup.Item style={{ border: "none", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black', paddingTop: 0, paddingBottom: 0 }} variant={darkThemeEnabled ? 'dark' : 'light'} active={filter === ''} key={"tag-all"} action onClick={() => { setCategoryName(undefined); setFilter(''); }} title="Show all applications">
                                Show All
                            </ListGroup.Item>
                            {
                                (!categoryName || categoryName === 'Functionality') && tags?.filter((t: VocabTerm) => t.id && +t.id < 100)?.length > 0 && <>
                                    <strong style={{ marginTop: "2vh" }}>Functionality</strong>
                                    {
                                        // First set: Functionality
                                        tags?.filter((t: VocabTerm) => t.id && +t.id < 100).map(tag =>
                                            <ListGroup.Item style={{ border: "none", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black', paddingTop: 0, paddingBottom: 0 }} variant={darkThemeEnabled ? 'dark' : 'light'}  active={filter === tag.id} key={"tag-"+tag.id} action onClick={() => setFilter(tag.id+"")} title={tag.definition}>
                                                {tag.name}
                                            </ListGroup.Item>
                                        )
                                    }
                                </>
                            }
                            {
                                (!categoryName || categoryName === 'Technology') && tags?.filter((t: VocabTerm) => t.id && +t.id < 1000 && +t.id >= 100)?.length > 0 && <>
                                    <strong style={{ marginTop: "2vh" }}>Technology</strong>
                                    {
                                        // Second set: Language
                                        tags.filter((t: VocabTerm) => t.id && +t.id < 1000 && +t.id >= 100).map(tag =>
                                        <ListGroup.Item style={{ border: "none", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black', paddingTop: 0, paddingBottom: 0 }} variant={darkThemeEnabled ? 'dark' : 'light'}  active={filter === tag.id} key={"tag-"+tag.id} action onClick={() => setFilter(tag.id+"")} title={tag.definition}>
                                    {tag.name}
                                        </ListGroup.Item>
                                        )
                                    }
                                </>
                            }
                            {
                                (!categoryName || categoryName === 'Language') &&  tags.filter((t: VocabTerm) => t.id && +t.id < 10000 && +t.id >= 1000).length > 0 && <>
                                    <strong style={{ marginTop: "2vh" }}>Language</strong>
                                    {
                                        // Final set: Language
                                        tags.filter((t: VocabTerm) => t.id && +t.id < 10000 && +t.id >= 1000).map(tag =>
                                            <ListGroup.Item style={{ border: "none", backgroundColor: darkThemeEnabled ? '#283845' : '#fff', color: darkThemeEnabled ? 'white' : 'black', paddingTop: 0, paddingBottom: 0 }} variant={darkThemeEnabled ? 'dark' : 'light'}  active={filter === tag.id} key={"tag-"+tag.id} action onClick={() => setFilter(tag.id+"")} title={tag.definition}>
                                                {tag.name}
                                            </ListGroup.Item>
                                        )
                                    }
                                </>
                            }
                        </ListGroup>
                    </Col>

                    <Col style={{ paddingTop: "40px" }}>
                        <Row>
                            <Col style={{ textAlign: "left", paddingLeft: "25px" }}>
                                <h3>
                                    {!filter ? 'All' : filter === 'featured' ? 'Featured' : tags.find(t => filter === t.id)?.name} Apps
                                    <Badge pill bg={darkThemeEnabled ? 'dark' : 'light'}>{specs.filter(s => s.display === 'stack').length}</Badge>
                                </h3>
                            </Col>
                        </Row>

                        <Row>
                            {
                                specs.map(spec =>
                                    spec.display === 'stack' && <Col className='col-4' key={spec.key} style={{ padding: "20px"}}>
                                        <SpecCard key={'spec-'+spec.key} specs={allSpecs} stacks={stacks} spec={spec} tags={tags} setFilter={setFilter}  />
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </MuiThemeProvider>
    );
}

export default AllAppsPage;
