import { publish, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends NavigationMixin(LightningElement) {
	searchTerm = '';

	// @wire(searchBears, {searchTerm: '$searchTerm'})
	// bears;

	bears;
	@wire(MessageContext) messageContext;
	@wire(searchBears, {searchTerm: '$searchTerm'})
	loadBears(result) {
	this.bears = result;
	if (result.data) {
		const message = {
		bears: result.data
		};
		publish(this.messageContext, BEAR_LIST_UPDATE_MESSAGE, message);
	}
	}

	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}

	get hasResults() {
		return (this.bears.data.length > 0);
	}
	
	handleBearView(event) {
		// Get bear record id from bearview event
		const bearId = event.detail;
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: bearId,
				objectApiName: 'Bear__c',
				actionName: 'view',
			},
		});
	}
}

/* 

import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.searchBears(searchTerm) Apex method 
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearList extends LightningElement {
	searchTerm = '';
	@wire(searchBears, {searchTerm: '$searchTerm'})
	bears;
	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}
}

*/

/* 
Destaques do código:

    Adicionamos uma propriedade reativa searchTerm e a transmitimos como um parâmetro de nossa chamada de Apex conectado a searchBears.
    A função handleSearchTermChange é usada para reagir a mudanças no valor do campo de entrada de pesquisa. 
	Colocamos de propósito um atraso de 300 milissegundos na atualização da propriedade reativa searchTerm. 
	Se houver uma atualização pendente, nós a cancelamos e reagendamos outra em 300 ms. 
	Esse atraso reduz o número de chamadas do Apex quando o usuário está digitando letras para formar uma palavra. 
	Cada nova letra aciona uma chamada para handleSearchTermChange, mas o ideal é que searchBears seja chamado somente uma vez quando o usuário termina de digitar. 
	Essa técnica se chama debouncing.
    Expomos a expressão hasResults para verificar se nossa pesquisa retornou ursos.
*/


/*
import { LightningElement, wire } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method 
import getAllBears from '@salesforce/apex/BearController.getAllBears';

export default class BearList extends LightningElement {
	@wire(getAllBears) bears;
	appResources = {
		bearSilhouette: `${ursusResources}/standing-bear-silhouette.png`,
	};
}

/* 
Simplificamos bastante o código JS decorando nossa propriedade bears com Wired Apex. 
Todos os dados de que precisamos agora vêm por essa única linha: @wire(getAllBears) bears;
*/

/*
import { LightningElement } from 'lwc';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
/** BearController.getAllBears() Apex method 
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
} */

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

	Destaques do código:

    Importamos um mixin de navegação que reúne funções de utilitários que lidam com navegação. Um mixin permite adicionar funcionalidades a uma classe sem estendê-la. Isso é útil quando uma classe já estende uma classe pai (uma classe só pode estender um único pai).
    Nossa classe estende o mixin de navegação aplicado à classe base LightningElement.
    Processamos o evento bearview na função handleBearView. Extraímos a ID de registro de urso dos detalhes do evento e usamos o mixin de navegação para navegar até uma página de registro de urso.
    Implante o código atualizado na organização e teste se você consegue navegar até um registro de urso com o ícone de botão em um bloco.

	Refatoramos nosso componente em dois componentes menores: a lista de ursos e um bloco de urso. 
	Exploramos como comunicar do componente de lista pai para o componente de bloco filho com um decorador @api. 
	Também vimos como comunicar de um filho com um pai usando um evento personalizado.

	Destaques do código:

    Recuperamos o contexto da mensagem do Lightning e o armazenamos em uma propriedade messageContext.
    Usamos uma função conectada para capturar dados da lista de ursos recebidos e acionar uma mensagem do Lightning BearListUpdate__c personalizada com a lista de registros de urso.
    Transmitimos searchTerm como um parâmetro dinâmico a nosso adaptador searchBears conectado para que cada vez que searchTerm muda, loadBears seja executado novamente e uma nova mensagem seja acionada com os novos resultados da pesquisa.
    Usamos a função publish que importamos do LMS para acionar uma mensagem do Lightning BearListUpdate__c com a lista de ursos.
	Adicionamos um evento bearview que é acionado quando um bloco de urso é clicado.
*/