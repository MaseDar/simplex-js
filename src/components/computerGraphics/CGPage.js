import React, { useRef, useEffect, useState} from 'react';
import { Row, Col, Radio, Space, InputNumber } from 'antd';
import BresenhamLine, {setCanvases, BresenhamCircle, DDA, DirectMethod} from './print/Algorithms'
function CGPage(){
    // const [value, setValue] = useState("brez");
    const [canvas, setCanvas] = useState(null);
    const [context, setContext] = useState(null); 
    const value = useRef("brez");
    const bezier = useRef(2);
    const canvasRef = useRef(null)
    let count = 0;
    // let checker = 0;
    let points = [];
    
    const onChange = e => {
        console.log('radio checked', e.target.value);
        value.current = e.target.value;
    }; 

    const ChangeBezier = e => {
        console.log("change bezier:", e);
        bezier.current = e;
    }

    function mouseDown(e) {
        console.log("mouseDouwn", e)
        // check()
        var rect = canvas.getBoundingClientRect();
        points[count] = {}
        points[count].x = e.clientX - rect.left;
        points[count].y = e.clientY - rect.top;
        count++;
    }

    // function check() {
    //     if (checker != value.current){
    //         count = 0;
    //         checker = value.current;
    //         points = []
    //         return false;
    //     } 
    //     else {
    //         return true;
    //     }
    // }

    function mouseUp(e) {
        console.log("mouseUp", e)
        var rect = canvas.getBoundingClientRect();
        points[count] = {}
        points[count].x = e.clientX - rect.left;
        points[count].y = e.clientY - rect.top;
        //TODO: Надо переместить рендер, чтобы рендерилось в прямом эфире
        if ( value.current !== "direct_method"){
            PrintLinearAndCicrcles(points[0].x, points[0].y, points[1].x, points[1].y)
            points = []
            count = 0;
        }
        else if (count === bezier.current){
            DirectMethod(points)
            points = []
            count = 0;
        }
        // TODO: Подумать над тем, как сделать для безье
        
    }
    
    function PrintLinearAndCicrcles(x,y,x1,y1){
        switch (value.current){
            case "dda":
                DDA(x,y,x1,y1);
                break
            case "brez":
                BresenhamLine(x, y, x1, y1);
                break;
            case "brez_circle":
                let r = Math.sqrt(((x1 - x) ** 2) + ((y1 - y) ** 2));
                BresenhamCircle(x,y,r);
                break;
            default:
                alert("wooops")
        }
        
    }


    useEffect(() => {
        canvasRef.current.width = 700;
        canvasRef.current.height = 500;
        canvasRef.current.style = "border:1px solid #000000";
        setCanvas(canvasRef.current);
        setContext(canvasRef.current.getContext('2d'));
        setCanvases(context);
    }, [canvas, context])

    return(
        <Row>
            <Col span={18} push={6}> 
                <canvas onMouseDown={mouseDown} onMouseUp={mouseUp} ref={canvasRef}/>
            </Col>
            <Col span={6} pull={18}>
                <Space direction="vertical">
                    <h3>Линии</h3>
                    <Radio.Group
                        onChange={onChange}
                        optionType="button"
                        buttonStyle="solid"
                        defaultValue="brez"
                    >
                        <Radio.Button value="dda">DDA</Radio.Button>
                        <Radio.Button value="brez">Брезенхем</Radio.Button>
                    </Radio.Group>

                    <h3>Круг</h3>
                    <Radio.Group
                        onChange={onChange}
                        optionType="button"
                        buttonStyle="solid"
                    >
                        <Radio.Button value="brez_circle">Брезенхем</Radio.Button>
                        <Radio.Button value="ehh">reload</Radio.Button>
                    </Radio.Group>
                    
                    <h3>Безье</h3>
                    <Radio.Group
                        onChange={onChange}
                        optionType="button"
                        buttonStyle="solid"
                    >
                        <Radio.Button value="direct_method">Прямой метод</Radio.Button>
                        <Radio.Button value="slpit_method">reload</Radio.Button>
                    </Radio.Group>
                    Количество точек
                    <InputNumber min={2} max={10} defaultValue={2} onChange={ChangeBezier}/>

                    <h3>Отсечение отрезков</h3>
                    <Radio.Group
                        onChange={onChange}
                        optionType="button"
                        buttonStyle="solid"
                    >
                        <Radio.Button disabled value="saz_koen">Сазерленд-Коэн</Radio.Button>
                        <Radio.Button disabled value="middle_dot">Средняя точка</Radio.Button>
                        <Radio.Button disabled value="citrus">Цирус-Бек</Radio.Button>
                    </Radio.Group>
                </Space>
                
                {/* <CGInputs setValue={setValue}/> */}
            </Col>
        </Row>
    );
}

export default CGPage;