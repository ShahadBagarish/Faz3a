import React, { Component } from 'react'
import { Icon, Col } from 'antd';
import { Button} from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Cards extends Component {
    render() {
        return (
            <div>
                <div>
                    <p style={{ 'font-size': '60px', textAlign: "center" }}>The Helpers</p>
                    <p style={{ 'font-family': "'Architects Daughter', 'cursive'", 'font-size': '40px' }}>
                        Be Helpfull and Share things with your neighbours
                    </p>
                    <Col style={{ textAlign: 'center' }}>
                        <Button variant="primary" as={Link} to='/signup'>Join Our Community <Icon type="arrow-right" /></Button>
                        {/* <Link block style={{ 'font-size': '17px', backgroundColor: 'white', padding: 10, borderRadius: 10 }} to='/login'>Join Our Community</Link> */}
                    </Col>
                </div>
            </div>
        )
    }
}
