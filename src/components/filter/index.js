import { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

export default function Filter(props) {
    return <Fragment>
        <Row className="filters">
            <Col md={4}>
                <Row>
                    <Col md={6}>
                        <Form.Control as="select">
                            <option>All bedrooms</option>
                            <option value="1">1 bedroom</option>
                            <option value="2">2 bedrooms</option>
                            <option value="3">3 bedrooms</option>
                            <option value="4">4 bedrooms</option>
                        </Form.Control>
                    </Col>
                    <Col md={6}>
                        <Form.Control as="select">
                            <option>Any Neighbourhood</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Col>
            <Col md={4}>
                <Row>
                    <Col md={6}>
                        <Form.Control as="select">
                            <option>Min Price</option>
                        </Form.Control>
                    </Col>
                    <Col md={6}>
                        <Form.Control as="select">
                            <option>Max Price</option>
                        </Form.Control>
                    </Col>
                </Row>
            </Col>
            <Col md={4}>
                <Row>
                    <Col md={6}>
                        <Form.Control as="select">
                            <option>Sortby</option>
                            <option vale="asc">Ascending</option>
                            <option value="dsc">Descending</option>
                        </Form.Control>
                    </Col>
                    <Col md={6}>
                        <span>{props.total} Results</span>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Fragment>
}