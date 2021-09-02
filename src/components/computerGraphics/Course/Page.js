import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Radio, Space, InputNumber, Typography } from "antd";
import printFirst, { interpol, printSecond, setCanvases } from "./Alg";

function Page(params) {
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const value = useRef("first");
  const first = useRef(4);
  const second = useRef(4);
  const divide = useRef(50);
  const canvasRef = useRef(null);
  let count = 0;

  let points = [];

  const onChange = (e) => {
    console.log("radio checked", e.target.value);

    value.current = e.target.value;
  };

  const changeFirst = (e) => {
    first.current = e;
  };

  const changeSecond = (e) => {
    second.current = e;
  };

  const changeDivide = (e) => {
    console.log("Change value divide", e);
    interpol(e);
  };

  function mouseDown(e) {
    console.log("mouseDouwn", e);
    // check()
    var rect = canvas.getBoundingClientRect();
    points[points.length] = {};
    points[points.length].x = Math.floor(e.clientX - rect.left);
    points[points.length].y = Math.floor(e.clientY - rect.top);
    console.log("points length", points.length);
    console.log({ points, first, second });
  }

  function mouseUp(e) {
    if (points.length === first.current && value.current == "first") {
      printFirst(points);
      points = [];
      first.current = 0;
      console.log({ points, first, second });
    } else if (points.length === second.current && value.current == "second") {
      printSecond(points);
      points = [];
      second.current = 0;
      console.log({ points, first, second });
    }
  }

  useEffect(() => {
    canvasRef.current.width = 700;
    canvasRef.current.height = 500;
    canvasRef.current.style = "border:1px solid #000000";
    setCanvas(canvasRef.current);
    setContext(canvasRef.current.getContext("2d"));
    setCanvases(context);
  }, [canvas, context]);

  return (
    <Row>
      <Col span={18} push={6}>
        <canvas onMouseDown={mouseDown} onMouseUp={mouseUp} ref={canvasRef} />
      </Col>
      <Col span={6} pull={18}>
        <Space direction="vertical">
          <Typography.Title>Курсовая</Typography.Title>
          <Radio.Group
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="first">Многоугольник 1</Radio.Button>
            <Radio.Button value="second">Многоугольник 2</Radio.Button>
          </Radio.Group>
          1
          <InputNumber
            min={2}
            max={5}
            defaultValue={4}
            onChange={changeFirst}
          />
          2
          <InputNumber
            min={2}
            max={5}
            defaultValue={4}
            onChange={changeSecond}
          />
          <InputNumber
            min={1}
            max={100}
            defaultValue={50}
            onChange={changeDivide}
          />
        </Space>
      </Col>
    </Row>
  );
}

export default Page;
