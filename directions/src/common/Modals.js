import React from 'react';

export const Modal = ({modalType, cancel, confirm}) => (
    <div className="modal-wrap">
        <div className="modal">
            <div className="title">
                {modalType === 'error' ? 'Une erreur est survenue lors de l\'opération. veuillez Réessayer.' 
                    : modalType === 'confirm' ? 'Enregistrer la carte dans votre liste?'
                    : 'Enregistrement terminé'
                }
            </div>
            <div className="buttons">
                <div className="button small" onClick={cancel}>ANNULER</div>
                {modalType !== 'error' && <div className="button small" onClick={confirm}>CONFIRMER</div>}
            </div>
        </div>
    </div>
);