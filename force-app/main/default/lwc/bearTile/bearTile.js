import { LightningElement, api } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearTile extends LightningElement {
	@api bear;

	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('bearview', {
            detail: this.bear.Id
        });
        this.dispatchEvent(selectEvent);
    }
}

/* 

Destaques do código:

    A função handleOpenRecordClick é chamada quando um usuário clica no botão para abrir o registro de um bloco de urso.
    A função cria e aciona um evento bearview personalizado que contém a ID de registro do urso.

*/