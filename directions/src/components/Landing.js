import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { clientRoutes } from '../helpers/routes';
import { Loader } from '../common/Loader';
import { MapStep } from './MapStep';
import { faHandPointer, faDraftingCompass, faKeyboard } from '@fortawesome/free-solid-svg-icons';


export const Landing = () => {
    // TODO: default to true
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return loading ? (
        <Loader/>
    ) : (
        <div className="section-wrap">
            <div  className="section-lane">
                <div className="site-title">
                    OU-T
                </div>
            </div>
            <div className="section-lane between">
                <MapStep title="Step 1" icon={faHandPointer} size="3x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu tortor, posuere non odio dapibus, laoreet interdum ipsum. Proin cursus hendrerit enim, dictum suscipit orci egestas sit amet. Integer at pharetra ante, vel luctus dolor. Quisque bibendum, sem in auctor mattis, sem justo tristique augue, vel gravida ipsum ante non ante
                </MapStep>
                <MapStep title="Step 1" icon={faDraftingCompass} size="3x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu tortor, posuere non odio dapibus, laoreet interdum ipsum. Proin cursus hendrerit enim, dictum suscipit orci egestas sit amet. Integer at pharetra ante, vel luctus dolor. Quisque bibendum, sem in auctor mattis, sem justo tristique augue, vel gravida ipsum ante non ante
                </MapStep>
                <MapStep title="Step 1" icon={faKeyboard} size="3x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam arcu tortor, posuere non odio dapibus, laoreet interdum ipsum. Proin cursus hendrerit enim, dictum suscipit orci egestas sit amet. Integer at pharetra ante, vel luctus dolor. Quisque bibendum, sem in auctor mattis, sem justo tristique augue, vel gravida ipsum ante non ante
                </MapStep>
            </div>
            <div className="section-lane center">
                <NavLink to={clientRoutes.mapMain}><div className="button large">CREATE YOUR MAP ADDRESS</div></NavLink>
            </div>
        </div>
    );
};