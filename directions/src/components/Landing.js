import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { Loader } from '../common/Loader';
import { MapStep } from './MapStep';
import { icons } from '../common/icons';
import logo from '../assets/logo.png';
import { UserContext } from '../helpers/contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
            <div className={'section-wrap gradient overflow' + (scroll ? ' scrollbar' : '')} onScroll={handleScroll}>
                <div className="section-lane">
                    <div className="site-title">
                        <img src={logo} alt={logo} align="textTop" />
                        <div className="lg"><b><FontAwesomeIcon icon={icons.faQuoteLeft}/>&nbsp;
                            Se perdre est une autre façon d'apprendre le chemin
                        &nbsp;<FontAwesomeIcon icon={icons.faQuoteRight}/></b><br/>(proverbe Africain)</div>
                    </div>
                </div>
                <div className="section-lane lg">
                    <MapStep >
                        Envie de commander un bon garba, visiter la nouvelles maison du beau-frère, ou simplement vous rendre à un rendez-vous important. 
                        Fini les longs appels interminables et frustrant afin d’expliquer la route ou retrouver la place où vous devez vous rendre. 
                        OU-T vous permet de faire cela en quelques clics. 
                    </MapStep>
                </div>
                <div className="section-lane med">
                    <MapStep title="Étape  1" icon={icons.faHandPointer} size="3x" right>
                        Sélectionnez le point d'intérêt principal le plus proche de la destination finale(votre addresse).
                        Ex: L’eglise St Jacques, La pharmacie de Koumassi, Le rond point Riviera 3 (9 Kilo), etc.

                        Vous pouvez rechercher dans la barre de recherche ou directement sur la carte
                        Épingler l'emplacement sur la carte.
                        (Option pour sélectionner ou épingler un deuxième emplacement sur la carte).
                    </MapStep>
                </div>
                <div className="section-lane med">
                    <MapStep title="Étape 2" icon={icons.faDraftingCompass} size="3x">
                        Sélectionnez l'outil de traçage (Add Image) pour commencer à dessiner la trajectoire. Commencer à dessiner à partir du premier point d'intérêt principal, jusqu’à la destination finale. 
                        Épingler l'emplacement de la destination finale sur la carte.
                    </MapStep>
                </div>
                <div className="section-lane med">
                    <MapStep title="Étape 3" icon={icons.faKeyboard} size="3x" right>
                        Une fois que vous êtes satisfait de votre carte, n'oubliez pas d'ajouter un titre (Ex: Maison Celestin Koffi_Rivieria 2)
                        N’oubliez pas d'enregistrer votre carte (vous devrez vous connecter pour enregistrer votre carte)
                        Copiez et partagez le lien.
                    </MapStep>
                </div>
                <div className="section-lane center">
                    <Link to={clientRoutes.mapMain}><div className="button large white-bgb">CRÉER VOTRE CARTE</div></Link>
                    {/* <Link to={user ? clientRoutes.mapMain : clientRoutes.signin}><div className="button large">CREATE YOUR MAP ADDRESS</div></Link> */}
                </div>
            </div>
        );
};