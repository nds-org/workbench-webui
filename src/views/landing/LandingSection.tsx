import styled from "styled-components";
import {textColor} from "../../App";

const NumericHeader = styled.span`
    bottom: 10px;
    width: 291px;
    height: 116px;
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 80pt;
    line-height: 116px;

    /* mid */

    color: #EB2A52;

    opacity: 0.6;
`;

const LandingSection = (props: { numeral: string; header: string; body: string; diagram: string; textFirst: boolean; }) => {
    if (typeof(props.textFirst) === undefined) {
        props.textFirst = false;
    }

    const SectionHeader = styled.h3`
        color: ${textColor};
        
        width: 349px;
        height: 43px;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 44px;
        text-align: left;
    `;

    const diagram = <>
        <img alt={'landing-diagram-' + props.numeral} className="image-content" src={props.diagram}  />
    </>

    const header = <>
        <div className="row">
            <div className="col numeric-header"><NumericHeader>{props.numeral}</NumericHeader></div>
            <div className="col"><SectionHeader>
                <span className="text-content" dangerouslySetInnerHTML={{__html: props.header+""}}></span>
            </SectionHeader></div>
        </div>
    </>;

    const textContent = <>
        <p className="text-content" dangerouslySetInnerHTML={{__html: props.body+""}}></p>
    </>;

    const sectionText = <>
        <div className="row">
            <div className="col">
                {header}
            </div>
        </div>
        <div className="row">
            <div className="col">
                {textContent}
            </div>
        </div>
    </>;

    return (
      <>
          {
              props.textFirst && <>
                  <div className="row">
                      <div className="col">
                          {sectionText}
                      </div>

                      <div className="col">
                          {diagram}
                      </div>
                  </div>
              </>
          }
          {
              !props.textFirst && <>
                  <div className="row">
                      <div className="col">
                          {diagram}
                      </div>

                      <div className="col">
                          {sectionText}
                      </div>
                  </div>
              </>
          }
      </>
    );
}

export default LandingSection;
