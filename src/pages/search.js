import { useContext, useState, useRef } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Filter from '../components/filter';
import { PropertiesContext } from '../store/propertyContext';
import NoImage from '../assets/images/noimage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { Code } from 'react-content-loader';

const PropertyType = props => {
    var type = '';
    if (props.Bedrooms)
        type += props.Bedrooms + ' bedroom ';
    if (props.Building_Type)
        type += props.Building_Type.toLowerCase();
    if (type && props.Property_Type)
        type += ' for ' + props.Property_Type.toLowerCase();
    if (type)
        return <p>{type}</p>
    return false;
}

export default function Search() {
    const properties = useContext(PropertiesContext);
    const [loader, setLoader] = useState(true);
    const imgCount = useRef(0);

    const checkLoadedImage = () => {
        imgCount.current += 1;
        if (imgCount.current === properties.length) {
            setLoader(false);
        }
    }

    return <Container fluid>
        <h3 className="title">Property for Sales</h3>
        <Filter total={properties.length} />

        {loader ? <Code /> : ''}
        <Row style={{ display: loader ? 'none' : 'flex' }}>
            {
                properties && properties.map((property, index) => {
                    return <Col md={4} key={index} className={'properties-list ' + index}>
                        <Link to={'details/' + property.Slug}>
                            <div className="property-img">
                                <img className="img-fluid" src={(property.Images && property.Images[0] && property.Images[0].url) ? property.Images[0].url : NoImage} alt={property.Title} onLoad={checkLoadedImage} />
                            </div>
                            <div className="property-attributes">
                                <p>{property.Title}</p>
                                <PropertyType {...property} />
                                <p className="property-price">{property.Price} <FontAwesomeIcon icon={faEuroSign} /></p>
                            </div>
                        </Link>
                    </Col>
                })
            }
        </Row>
    </Container>
}