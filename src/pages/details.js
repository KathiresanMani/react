import { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Button, Table } from 'react-bootstrap';
import { PropertiesContext } from '../store/propertyContext';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import NoImage from '../assets/images/noimage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign, faShareAlt, faHeart, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GoogleMap from '../components/map';
import { Code } from 'react-content-loader';

const PropertyAttributes = props => {
    if (props) {
        return <div className="property-attributes">
            <h3>Facts & Features</h3>
            <Table borderless>
                <tbody>
                    <tr>
                        <td>Neighbourhood:</td>
                        <td>{props.neighbourhood}</td>
                    </tr>
                    <tr>
                        <td>Price per sqm:</td>
                        <td><FontAwesomeIcon icon={faEuroSign} />{props.Price_Per_Sqm}</td>
                    </tr>
                    <tr>
                        <td>Brochure:</td>
                        <td><a href={props.Brochure && props.Brochure[0] ? props.Brochure[0].url : ''} target="_blank" rel="noreferrer">Download Brochure</a></td>
                    </tr>
                    <tr>
                        <td>Floor Plan:</td>
                        <td><a href={props.Floor_Plans && props.Floor_Plans[0] ? props.Floor_Plans[0].url : ''} target="_blank" rel="noreferrer">View Floor Plan</a></td>
                    </tr>
                </tbody>
            </Table>

            <p dangerouslySetInnerHTML={{ __html: props.Description }}></p>
        </div>
    }

    return false;
}

const NegotiatorDetails = props => {
    if (props && props.Negotiator) {
        return <div className="negotiator-details">
            <img src={props.Negotiator.Image.url} alt="Negotiator" className="img-fluid" />
            <div>
                <h6>{props.Negotiator.Name}</h6>
                <p>{props.Negotiator.Designation}</p>
                <span>{props.Negotiator.Phone} | {props.Negotiator.Email}</span>
            </div>
        </div>
    }
    return false;
}

const RenderGoogleMap = props => {
    if (props && props.Latitude && props.Longitude) {
        return <div className="google-map">
            <GoogleMap lat={props.Latitude} lng={props.Longitude} />
        </div>
    }

    return false;
}

export default function Details(props) {
    const properties = useContext(PropertiesContext);
    const [property, setProperty] = useState([]);
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        document.title = 'Details Page';
    }, []);

    useEffect(() => {
        if (properties.length) {
            let propertyData = properties.filter(p => p.Slug === props.match.params.property_id);
            if (propertyData && propertyData[0]) {
                setProperty(propertyData[0]);
                var imageData = [
                    {
                        original: NoImage,
                        thumbnail: NoImage,
                    }
                ];
                if (propertyData[0].Images) {
                    imageData = [];
                    propertyData[0].Images.forEach(e => {
                        imageData.push({
                            original: e.url,
                            thumbnail: e.url
                        });
                    });
                }
                setImages(imageData);
            }
            setLoader(false);
        }
    }, [properties, props.match])

    return <Fragment>
        <Container fluid className="property-details">
            {loader ? <Code /> : ''}
            <Row style={{ display: loader ? 'none' : 'flex' }}>
                <Col md={7}>
                    <ImageGallery items={images} lazyLoad={true} showPlayButton={false} showNav={false} />
                </Col>
                <Col md={5}>
                    <div className="details-content">
                        <div className="details-icon">
                            <FontAwesomeIcon icon={faShareAlt} />
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                        <div className="property-summary">
                            <span className="property-price"><FontAwesomeIcon icon={faEuroSign} /> {property.Price} &nbsp; <span>{property.Bedrooms} bed | {property.Floor_Area} sqm</span></span>
                            <p>{property.Bedrooms} bedroom {property.Building_Type} for {property.Property_Type}</p>
                            <Link to=""><FontAwesomeIcon icon={faHome} /> Please contact us</Link>
                            <Button type="button" className="btn-contact">contact agent</Button>
                        </div>

                        <PropertyAttributes {...property} />
                        <NegotiatorDetails {...property} />
                        <RenderGoogleMap {...property} />
                    </div>
                </Col>
            </Row>
        </Container>
    </Fragment>
}
