import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { Loader } from '../common/Loader';
import { MapStep } from './MapStep';
import { icons } from '../common/icons';
import logo from '../assets/logo.png';
import { UserContext } from '../helpers/contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from './Nav';
import convo from '../assets/phone_shot.png';
import { content } from '../helpers/variables';


export const Landing = () => {
    // const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [scroll, setScroll] = useState(false);

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
            <div className={'section-wrap relative  overflow' + (scroll ? ' scrollbar' : '')} onScroll={handleScroll}>
                <Nav />
                <div className="red-bubble" />
                <div className="section-lane between">
                    <div className="site-title med">
                        <div>
                            <div>
                                <b><FontAwesomeIcon icon={icons.faQuoteLeft} />&nbsp;
                                Se perdre est une autre façon d'apprendre le chemin
                                &nbsp;<FontAwesomeIcon icon={icons.faQuoteRight} />
                                </b>
                                <br />
                                (proverbe Africain)
                            </div>
                            <p>{content.landing.tagline}</p>
                            <Link to={clientRoutes.mapMain}><div className="button standard white-bgb med">CRÉER VOTRE CARTE</div></Link>
                        </div>
                    </div>
                    <div className="flex">
                        <img src={convo} alt="sms-lost" />
                    </div>
                </div>
                <div className="section-lane">
                    <MapStep title="Étape  1" step={1} size="3x">
                        {content.landing.step1}
                    </MapStep>
                    <MapStep title="Étape 2" step={2} size="3x">
                        {content.landing.step2}
                    </MapStep>
                    <MapStep title="Étape 3" step={3} size="3x">
                        {content.landing.step3}
                    </MapStep>
                </div>
                <div className="inline center" style={{ height: '20%' }}>
                    <img src={logo} alt="second-logo" className="bottom-logo" /><span>OU-T.app</span>
                </div>
                <div className="section-lane between">
                    <div className="med bold">
                        AFFAIRES: pour tous les business qui veulent faire plus de profits
                    </div>
                    <div className="med bold">
                        INDIVIDUEL: pour tous ceux qui habitent quelque part
                    </div>
                </div>
                <div className="section-lane between">
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
                    <div className="green-line"/>
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
                <div className="section-lane center ">
                    <div className="button standard red-bg white">CRÉER UN PROFIL</div>
                </div>
            </div>
        );
};