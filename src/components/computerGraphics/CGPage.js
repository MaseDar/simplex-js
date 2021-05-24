import React, { useState} from 'react';
import Canvas from './print/Canvas'
import { Row, Col } from 'antd';
import CGInputs from './print/CGInputs';

function CGPage(){
    const [value, setValue] = useState("brez");

    // function setValue(value) {
    //     value = value;
    // }

    return(
        <Row>
            <Col span={18} push={6}> 
            <Canvas alg={value}/>
            </Col>
            <Col span={6} pull={18}>
                <CGInputs setValue={setValue}/>
            </Col>
        </Row>
    );
}

export default CGPage;