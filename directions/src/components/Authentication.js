import React, { useState, useContext } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { createUser } from '../helpers/api';
import { Loader } from '../common/Loader';
import { Nav } from './Nav';
import { UserContext } from '../helpers/contexts';

export const Authentication = () => {
    const {auth, setUser} = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const isSigningIn = location.pathname.includes('signin');

    const valiations = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8)
    });

    const submit = (values, actions) => {
        setLoading(true);
        actions.setSubmitting(true);
        
        if (values.conf_password && values.conf_password !== values.password) {
            actions.setErrors({conf_password: 'not matching'});
            actions.setSubmitting(false);
            setLoading(false);
            history.push('/map');
            return;
        } else if (isSigningIn) {
            auth.signInWithEmailAndPassword(values.email, values.password)
                .then( r => {
                    actions.setSubmitting(false);
                    setLoading(false);
                    history.push('/map');
                })
                .catch(e => {
                    actions.setSubmitting(false);
                    setLoading(false);
                }); 
        } else {
            auth.createUserWithEmailAndPassword(values.email, values.password)
                .then(r => {
                    createUser(r);
                    history.push('/map');
                })
                .catch(e => {
                    actions.setSubmitting(false);
                    setLoading(false);
                    console.log({e});
                });
        }
    };

    return (
        <div className="section-wrap flex reveal">
            <Nav />
            {loading ? (
                <Loader/>
            ) : (
                <Formik
                    onSubmit={(values, actions) => submit(values, actions)}
                    initialValues={{
                        email: '',
                        password: '',
                        conf_password: '',
                    }}
                    validationSchema={valiations}
                >
                    {({ touched, errors, values, submitForm, isValid, isSubmitting, resetForm }) => (
                        <div className="section-wrap flex align-center reveal">
                            <h3>{ isSigningIn ? 'Connectez-vous' : 'Enregistrez-vous' }</h3>
                            <div className="form-bg column white-bg">
                                {/* <div className="curved-bg-element top"/>
                                <div className="curved-bg-element middle"/>
                                <div className="curved-bg-element bottom"/> */}
                                <div className="section-lane">
                                    <label className="strong">Email</label>
                                </div>
                                <div className="section-lane">
                                    <Field name="email" className={'rounded-field' + (errors.email && touched.email ? ' invalid' : '')} />
                                </div>
                                <div className="section-lane">
                                    <label className="strong">Mot de passe</label>
                                </div>
                                <div className="section-lane">
                                    <Field name="password" type="password" className={'rounded-field' + (errors.password && touched.password ? ' invalid' : '')} />
                                </div>
                                {!isSigningIn && (
                                    <React.Fragment>
                                        <div className="section-lane">
                                            <label className="strong">Confirmer mot de passe</label>
                                        </div>
                                        <div className="section-lane">
                                            <Field name="conf_password" type="password" className={'rounded-field' + (errors.conf_password && touched.conf_password ? ' invalid' : '')} />
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="section-lane start">
                                    <div className="button" onClick={(isValid && !isSubmitting) ?() => submitForm(values) : null}>{isSigningIn ? 'Connectez-vous' : 'Enregistrez-vous'}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};