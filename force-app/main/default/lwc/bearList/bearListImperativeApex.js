import { LightningElement } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method */
import getAllBears from '@salesforce/apex/BearController.getAllBears';

export default class BearList extends LightningElement {
	bears;
	error;
	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};
	
    connectedCallback() {
		this.loadBears();
	}
	
    loadBears() {
		getAllBears()
			.then(result => {
				this.bears = result;
			})
			.catch(error => {
				this.error = error;
			});
	}
}

/* 
Destaques do código:

    Importamos o adaptador ursusResources, que nos dá acesso a um recurso estático associado ao nosso aplicativo. 
    Usamos esse adaptador para criar um objeto appResources que expõe a URL de imagem de silhueta do urso no modelo.
    Importamos o adaptador getAllBears, que nos permite interagir com o método do Apex BearController.getAllBears(). 
    A classe BearController fica junto do código que você implantou no início desse projeto. 
    O método getAllBears retorna o resultado de uma consulta que busca todos os registros de ursos.
    Implementamos a função connectedCallback, que nos permite executar código depois que o componente é carregado. 
    Usamos essa função para chamar a função loadBears.
    A função loadBears chama o adaptador getAllBears. O adaptador chama nosso código do Apex e retorna uma promessa de JS. 
    Usamos a promessa para salvar os dados retornados na propriedade bears ou para relatar erros. 
    A recuperação de dados com essa abordagem é chamada de Apex imperativo.
*/