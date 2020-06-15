import React, { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../helpers/contexts';
import { auth } from '../helpers/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../common/icons';

export const Authentication = () => {
    const location = useLocation();
    const isLogingIn = true;
    console.log({location});
    

    const loginValidations = Yup.object().shape({
        email: Yup.string().email().required().min(4),
        password: Yup.string().required().min(8),
        conf_password: isLogingIn ? Yup.string() : Yup.string().required().min(8)
    });

    const submit = ({ email, password, conf_password }) => {
        if (isLogingIn) {

        } else {
            auth.createUserWithEmailAndPassword(email, password)
                .then(data => {
                    console.log(data);

                })
                .catch(e => {
                    console.log({ e });

                });
        }
    };

    return (
        <div className="section-wrap">
            <Formik
                onSubmit={(values, actions) => submit(values, actions)}
                initialValues={{
                    email: '',
                    password: '',
                    conf_password: '',
                }}
                validationSchema={loginValidations}
            >
                {({ touched, errors, values, submitForm, isValid, isSubmitting, resetForm }) => (
                    <div className="section-wrap center">
                        <div className="section-lane">
                            <label>Username</label>
                        </div>
                        <div className="section-lane">
                            <Field name="email" className={'rounded-field' + (errors.email & touched.email ? ' error' : '')} />
                        </div>
                        <div className="section-lane">
                            <label>Password</label>
                        </div>
                        <div className="section-lane">
                            <Field name="password" className={'rounded-field' + (errors.password & touched.password ? ' error' : '')} />
                        </div>
                        {!isLogingIn && (
                            <React.Fragment>
                                <div className="section-lane">
                                    <label>Confirm password</label>
                                </div>
                                <div className="section-lane">
                                    <Field name="conf_password" className={'rounded-field' + (errors.conf_password & touched.conf_password ? ' error' : '')} />
                                </div>
                            </React.Fragment>
                        )}
                         <div className="section-lane">
                            <FontAwesomeIcon className={'icon' + (!isValid ? ' inactive' : ' pointer')} icon={icons.faPlay} onClick={(isValid && !isSubmitting) ? submitForm(values) : null}/>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};