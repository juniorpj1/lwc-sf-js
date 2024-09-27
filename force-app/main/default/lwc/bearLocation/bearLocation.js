import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Set Bear object fields
const NAME_FIELD = 'Bear__c.Name';
const LOCATION_LATITUDE_FIELD = 'Bear__c.Location__Latitude__s';
const LOCATION_LONGITUDE_FIELD = 'Bear__c.Location__Longitude__s';
const bearFields = [
	NAME_FIELD,
	LOCATION_LATITUDE_FIELD,
	LOCATION_LONGITUDE_FIELD
];

export default class BearLocation extends LightningElement {
  @api recordId;
  name;
  mapMarkers = [];
  
  @wire(getRecord, { recordId: '$recordId', fields: bearFields })
  
  loadBear({ error, data }) {
    if (error) {
      // TODO: handle error
    } else if (data) {
      // Get Bear data
      this.name =  getFieldValue(data, NAME_FIELD);
      const Latitude = getFieldValue(data, LOCATION_LATITUDE_FIELD);
      const Longitude = getFieldValue(data, LOCATION_LONGITUDE_FIELD);
      // Transform bear data into map markers
      this.mapMarkers = [{
        location: { Latitude, Longitude },
        title: this.name,
        description: `Coords: ${Latitude}, ${Longitude}`
      }];
    }
  }
  get cardTitle() {
    return (this.name) ? `${this.name}'s location` : 'Bear location';
  }
}

/* Destaques do código:

    Importamos um adaptador getRecord que nos permite usar o Lightning Data Service para recuperar registros sem ter que programar em Apex.
    Importamos uma função auxiliar getFieldValue para recuperar valores de campo.
    Montamos uma lista de nomes de campo codificados com base no objeto Bear__c na constante bearFields. Observe que essa abordagem não dá suporte à integridade referencial. A existência do objeto e dos campos não pode ser verificada no tempo de compilação. Isso significa que Bear__c ou seus campos poderiam ser excluídos mesmo que sejam usados no seu código. Usamos outra abordagem que dá suporte à integridade referencial em nosso próximo componente.
    A propriedade recordId decorada com @api recebe automaticamente a ID de registro atual.
    Usamos um decorador @wire na função loadBear para buscar dados e erros e transmiti-los à função. @wire é configurado para chamar a função de adaptador getRecord com alguns parâmetros. Esses parâmetros são a ID do registro e a lista de campos de registro que desejamos recuperar. Graças ao decorador @wire, loadBear é chamado automaticamente quando o componente é carregado ou a ID de registro é alterada.
    Nessa primeira versão do nosso componente não estamos tratando erros. Vamos ignorá-los por enquanto.
    Se não houver erros, salvaremos o nome do urso e criaremos um marcador de mapa com as coordenadas do urso.
    A função cardTitle retorna o título do cartão com base no nome do urso. Se o nome do urso não estiver disponível, ele retorna um título padrão. 
*/