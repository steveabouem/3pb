import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../helpers/contexts';
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
        username: Yup.string().min(4),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
        conf_password: isSigningIn ? Yup.string() : Yup.string().required().min(8)
    });

    const submit = (values, actions) => {
        setLoading(true);
        if (values.conf_password && values.conf_password !== values.password) {
            setLoading(false);
            return;
        } else if (isSigningIn) {

        } else {
            signup(values)
                .then(() => {
                    createUser(values);
                })
                .then(data => {
                    setLoading(false);
                    history.push('/map');
                })
                .catch(e => {
                    console.log({ e });

                });
        }
    };

    return (
        <div className="section-wrap">
            {loading ? (
                <Loader/>
            ) : (
                <Formik
                    onSubmit={(values, actions) => submit(values, actions)}
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        conf_password: '',
                    }}
                    validationSchema={valiations}
                >
                    {({ touched, errors, values, submitForm, isValid, isSubmitting, resetForm }) => (
                        <div className="section-wrap center">
                            <div className="section-lane">
                                <label>Username</label>
                            </div>
                            <div className="section-lane">
                                <Field name="username" className={'rounded-field' + (errors.username & touched.username ? ' invalid' : '')} />
                            </div>
                            <div className="section-lane">
                                <label>Email</label>
                            </div>
                            <div className="section-lane">
                                <Field name="email" className={'rounded-field' + (errors.email & touched.email ? ' invalid' : '')} />
                            </div>
                            <div className="section-lane">
                                <label>Password</label>
                            </div>
                            <div className="section-lane">
                                <Field name="password" type="password" className={'rounded-field' + (errors.password & touched.password ? ' invalid' : '')} />
                            </div>
                            {!isSigningIn && (
                                <React.Fragment>
                                    <div className="section-lane">
                                        <label>Confirm password</label>
                                    </div>
                                    <div className="section-lane">
                                        <Field name="conf_password" type="password" className={'rounded-field' + (errors.conf_password & touched.conf_password ? ' invalid' : '')} />
                                    </div>
                                </React.Fragment>
                            )}
                            <div className="section-lane">
                                <FontAwesomeIcon className={'icon' + (!isValid ? ' inactive' : ' pointer')} icon={icons.faPlay} onClick={(isValid && !isSubmitting) ?() => submitForm(values) : null}/>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </div>
    );
};