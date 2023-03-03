import {V1} from "../../common";
import Button from "react-bootstrap/Button";
import Carousel  from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";
import {useEffect, useState} from "react";

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
export const chunkArray = (arr: Array<any>, chunkSize: number): Array<Array<any>> => {
    if (!arr) return [];

    const results = [];
    while (arr.length) {
        results.push(arr.splice(0, chunkSize));
    }

    return results;
}

function Taglist(props: { tags: Array<any>, spec: V1.Service, onClick: (tag: any) => void, chunkSize: number }) {
    const [chunkedTags, setChunkedTags] = useState<Array<Array<any>>>([]);

    useEffect(() => {
        const chunks = chunkArray(props.spec?.tags, props.chunkSize || 3);
        setChunkedTags(chunks);
    }, [props.spec, props.chunkSize]);

    return (
        <>
            <Carousel controls={false} indicators={false}>
                {
                    chunkedTags.map((values: Array<any>, index: number) =>
                        <Carousel.Item key={'spec-' + props.spec?.key + '-tags-carousel-item-' + index}>
                            <Row>
                                {
                                    values.map((tag: string) =>
                                        <Col key={'spec-' + props.spec?.key + '-tags-carousel-item-' + index + '-' + tag}>
                                            {
                                                props.tags.find(t => tag === t.id) && <>
                                                    <Button className="btn btn-sm btn-warning"
                                                            style={{borderRadius: "10px"}}
                                                            onClick={() => props.onClick(props.tags.find(t => tag === t.id))}>{
                                                        props.tags.find(t => tag === t.id)?.name}
                                                    </Button>
                                                </>
                                            }
                                        </Col>
                                    )
                                }
                            </Row>
                        </Carousel.Item>
                    )
                }
            </Carousel>
            {
                /*props.spec?.tags?.map((tag: string, index: number) =>
                    <Col xs={5} key={'spec-tags-'+props.spec?.key + '-' + index} style={{ marginTop: "8px" }}>
                        <Button className="btn btn-sm btn-warning" style={{ borderRadius: "10px"}} onClick={() => props.onClick(props.tags.find(t => tag === t.id))}>{props.tags.find(t => tag === t.id)?.name}</Button>
                    </Col>

                )*/
            }
        </>
    );
}

export default Taglist;
