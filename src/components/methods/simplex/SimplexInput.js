import React, {  useState } from 'react';
import { Form, InputNumber, Select } from 'antd';

import Title from 'antd/lib/typography/Title';

const { Option } = Select;

function SimplexInput(){
    const [countVariables, setCountVariables] = useState(4);
    const [countRestrictions, setCountRestrictions] = useState(2);
    // Убрать, а то просто для заглушки vercel
    console.log(countRestrictions);
    let tags = [];
    function intFunc(){
        
        for (let i = 1; i <=countVariables; i++){
           
            tags.push(
                <>
                <InputNumber 
                    bordered={true}
                    style={{maxWidth: 40}}
                    defaultValue={0}
                    
                /> x
                    <sub>{i}</sub> 
                    {i !== countVariables ? "+" : "->"}
                </>
            ) 
            
        }
        tags.push(
            <Select style={{ width: 70 }}defaultValue="min">
                <Option value="min">min</Option>
                <Option value="max">max</Option>
            </Select>
        )
        return tags;
    }


    return(
        <Form 
            layout="vertical"
        >
            <Form.Item
                label="Количество переменных"
                name = "countVariables"
            >
                <InputNumber 
                    min="2" 
                    max="16"
                    defaultValue={4}
                    onChange={e => setCountVariables(e)}
                    style={{maxWidth:"50px"}}
                />
            </Form.Item>
            <Form.Item
                label="Количество ограничений"
                name = "countRestrictions"
            >
                <InputNumber 
                    min="2"
                    max="16"
                    defaultValue={2}
                    onChange={e => setCountRestrictions(e)}
                    style={{maxWidth:"50px"}}
                />
            </Form.Item>

            <Form.Item
                label="Введите целевую функцию:"
            >
                <Title level={4}>f(x) = {intFunc()} 
                </Title>
            </Form.Item>

            {/* <Form.Item
                label="Введите ограничения"
            >
                 <div>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                    </Button> 
                    <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    />
                </div>
            </Form.Item> */}

        </Form>
    )
}
export default SimplexInput;