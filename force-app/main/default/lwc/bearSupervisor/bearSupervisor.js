import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Import Bear object fields
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c';

const bearFields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {
	@api recordId; // Bear Id

	@wire(getRecord, { recordId: '$recordId', fields: bearFields })
    
    bear;
	
    get supervisorId() {
		return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
	}
}

/* Destaques sobre o código acima:
- A propriedade @api recordId é usada para receber o Id do registro de urso.
- O método get supervisorId() retorna o campo Supervisor__c do registro de urso.
- O método @wire(getRecord) é usado para buscar o registro de urso e o campo Supervisor__c.
- O campo Supervisor__c é importado do esquema Bear__c.
- O wire() retorna um objeto de registro.
- O getFieldValue() retorna o valor do campo.
- O campo Supervisor__c pode ser acessado usando this.supervisorId.
- O wire() retorna um objeto com um campo chamado data.
- O campo data pode ser acessado usando this.bear.data.
- O método getFieldValue() é usado para obter o valor do campo Supervisor__c. 

    Importamos o campo Bear__c.Supervisor__c por meio de uma importação de esquema em vez de usar uma sequência de caracteres codificada como fizemos antes no componente de localização de ursos. A principal vantagem dessa abordagem é que ela garante a integridade referencial.
    Recuperamos o registro de urso usando o decorador @wire e o adaptador getRecord.
    Expomos uma expressão supervisorId. A expressão usa a função getFieldValue para recuperar o valor do campo de supervisor.
*/