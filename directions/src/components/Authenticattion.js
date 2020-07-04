import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../common/icons';
import { signup } from '../helpers/api';
import { createUser } from '../helpers/api';
import { Loader } from '../common/Loader';

export const Authentication = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const isSigningIn = location.pathname.includes('signin');

    const valiations = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8)
    });

    const submit = (values, actions) => {
        alert('Activation à la phase 2');
        actions.resetForm();
        actions.setSubmitting(false);
        // setLoading(true);
        // actions.setSubmitting(true);
        
        // if (values.conf_password && values.conf_password !== values.password) {
        //     actions.setErrors({conf_password: 'not matching'});
        //     actions.setSubmitting(false);
        //     setLoading(false);
        //     return;
        // } else if (isSigningIn) {

        // } else {
        //     signup(values)
        //         .then(() => {
        //             createUser(values);
        //         })
        //         .then(data => {
        //             setLoading(false);
        //             history.push('/map');
        //         })
        //         .catch(e => {
        //             actions.setSubmitting(false);
        //             setLoading(false);
        //             console.log({e});
        //         });
        // }
    };

    return (
        <div className="section-wrap flex reveal">
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
                        <div className="section-wrap center flex gradient reveal">
                            <div className="bg-overlay"/>
                            <div className="form-bg column white-bg">
                                <div className="curved-bg-element top"/>
                                <div className="curved-bg-element middle"/>
                                <div className="curved-bg-element bottom"/>
                                <div className="section-lane over">
                                    <label className="strong">Email</label>
                                </div>
                                <div className="section-lane over">
                                    <Field name="email" className={'rounded-field' + (errors.email && touched.email ? ' invalid' : '')} />
                                </div>
                                <div className="section-lane over">
                                    <label className="strong">Mot de passe</label>
                                </div>
                                <div className="section-lane over">
                                    <Field name="password" type="password" className={'rounded-field' + (errors.password && touched.password ? ' invalid' : '')} />
                                </div>
                                {!isSigningIn && (
                                    <React.Fragment>
                                        <div className="section-lane over">
                                            <label className="strong">Confirmer mot de passe</label>
                                        </div>
                                        <div className="section-lane over">
                                            <Field name="conf_password" type="password" className={'rounded-field' + (errors.conf_password && touched.conf_password ? ' invalid' : '')} />
                                        </div>
                                    </React.Fragment>
                                )}
                                <div className="section-lane over">
                                    <FontAwesomeIcon className={'icon' + (!isValid ? ' inactive' : ' pointer')} icon={icons.faPlay} onClick={(isValid && !isSubmitting) ?() => submitForm(values) : null}/>
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};