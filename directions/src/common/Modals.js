import React from 'react';

export const Modal = ({modalType, cancel, submit}) => (
    <div className="modal-wrap">
        <div className="modal">
            <div className="title">
                {modalType === 'error' ? 'Une erreur est survenue lors de l\'opération. veuillez Réessayer.' 
                    : modalType === 'confirm' ? 'Enregistrer la carte dans votre liste?'
                    : modalType === "delete" ? "Effacer la carte?"
                    : 'Enregistrement terminé'
                }
            </div>
            <div className="buttons">
                <div className="button small" onClick={cancel}>{submit ? 'ANNULER' : 'FERMER'}</div>
                {submit && <div className="button small" onClick={submit}>CONFIRMER</div>}
            </div>
        </div>
    </div>
);