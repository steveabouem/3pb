import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { Loader } from '../common/Loader';
import { MapStep } from './MapStep';
import { icons } from '../common/icons';
import logo from '../assets/logo.png';
// import { UserContext } from '../helpers/contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from './Nav';
import convo from '../assets/phone_shot.png';
import { content } from '../helpers/variables';


export const Landing = () => {
    // const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    // const [scroll, setScroll] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);


    const handleScroll = e => {
        // TODO:  toggle sidebar here
        // const tData =
        // e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight;
        // console.log("scrolling.....", divHeight, tData);

        // if (tData) {
        //   fetchMoreListItems();
        // }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className={'section-wrap relative  overflow'} onScroll={handleScroll}>
            <Nav />
            <div className="section-lane between media-column">
                <div className="site-title med">
                    <div className="tagline">
                        <div>
                            <b><FontAwesomeIcon icon={icons.faQuoteLeft} />&nbsp;
                            Se perdre est une autre façon d'apprendre le chemin
                            &nbsp;<FontAwesomeIcon icon={icons.faQuoteRight} />
                            </b>
                            <div>(proverbe Africain)</div>
                        </div>
                        <p>{content.landing.tagline}</p>
                        <Link to={clientRoutes.mapMain}><div className="button standard white-bgb med">CRÉER VOTRE CARTE</div></Link>
                    </div>
                </div>
                <div className="top-logo-wrap">
                    <img src={convo} alt="sms-lost" className="top-logo" />
                </div>
            </div>
            <div className="section-lane media-column media-hide">
                <MapStep title="Étape  1: Sélectionnez" step={1} size="3x">
                    {content.landing.step1}
                </MapStep>
                <MapStep title="Étape 2: Dessinez" step={2} size="3x">
                    {content.landing.step2}
                </MapStep>
                <MapStep title="Étape 3: Enregistrez" step={3} size="3x">
                    {content.landing.step3}
                </MapStep>
            </div>
            <div className="inline center media-hide" style={{ height: '20%' }}>
                <img src={logo} alt="second-logo" className="bottom-logo" /><div>OU-T.app</div>
            </div>
            <div className="section-lane between media-hide">
                <div className="med bold">
                    AFFAIRES: pour tous les business qui veulent faire plus de profits
                </div>
                <div className="med bold">
                    INDIVIDUEL: pour tous ceux qui habitent quelque part
                </div>
            </div>
            <div className="section-lane between gradient media-hide">
                <ul>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                </ul>
                <div className="green-line" />
                <ul>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                    <li className="list-style">
                        <FontAwesomeIcon icon={icons.faCheckCircle} className="red" />&nbsp;
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </li>
                </ul>
            </div>
            <div className="section-lane center media-hide">
                <Link to="/signup">
                    <div className="button standard red-bg white pointer">CRÉER UN PROFIL</div>
                </Link>
            </div>
        </div>
    );
};