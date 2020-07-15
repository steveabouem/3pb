import React, { useContext } from 'react';
import { MapsContext } from '../helpers/contexts';

export const Modal = ({modalType, cancel}) => {
    const {saveMap, deleteUserMap, modal} = useContext(MapsContext);
    
    const submit = () => {
        if (modalType === 'confirm') {
            saveMap();
        } else {
            deleteUserMap(modal.id);
        }
    };
    
    return (
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
                    <div className="button small" onClick={cancel}>{(modalType === 'confirm' || modalType === 'delete') ? 'ANNULER' : 'FERMER'}</div>
                    {(modalType === 'confirm' || modalType === 'delete') && <div className="button small" onClick={submit}>CONFIRMER</div>}
                </div>
            </div>
        </div>
    );
};