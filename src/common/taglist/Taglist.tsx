import {Button, Col} from "react-bootstrap";
import React from "react";
import { V1 } from "..";


function Taglist(props: { tags: Array<any>, spec: V1.Service, onClick: (tag: any) => void }) {
    return (
        <>
            {
                props.spec?.tags?.map((tag: string) =>
                    <Col xs={5} key={'spec-'+props.spec?.key} style={{ marginTop: "8px" }}>
                        <Button className="btn btn-sm btn-warning" style={{ borderRadius: "10px"}} onClick={() => props.onClick(props.tags.find(t => tag === t.id))}>{props.tags.find(t => tag === t.id)?.name}</Button>
                    </Col>

                )
            }
        </>
    );
}

export default Taglist;
