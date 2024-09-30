import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import BEAR_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/BearListUpdate__c';
export default class BearMap extends LightningElement {
  mapMarkers = [];
  subscription = null;
  @wire(MessageContext)
  messageContext;
  connectedCallback() {
    // Subscribe to BearListUpdate__c message
    this.subscription = subscribe(
        this.messageContext,
        BEAR_LIST_UPDATE_MESSAGE,
        (message) => {
            this.handleBearListUpdate(message);
        });
  }
  disconnectedCallback() {
    // Unsubscribe from BearListUpdate__c message
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  handleBearListUpdate(message) {
    this.mapMarkers = message.bears.map(bear => {
      const Latitude = bear.Location__Latitude__s;
      const Longitude = bear.Location__Longitude__s;
      return {
        location: { Latitude, Longitude },
        title: bear.Name,
        description: `Coords: ${Latitude}, ${Longitude}`,
        icon: 'utility:animal_and_nature'
      };
    });
  }
}

/*
    Destaques do código:
    
    Implementamos duas funções de gancho de ciclo de vida de componente: connectedCallback e disconnectedCallback. Elas são chamadas automaticamente quando o componente carrega e descarrega. Usamos essas duas funções para assinar e cancelar a assinatura de nossa mensagem do Lightning BearListUpdate__c personalizada.
    Assim que recebemos uma mensagem BearListUpdate__c, a função handleBearListUpdate é chamada com a lista de registros de ursos que fazem parte do filtro atualmente. handleBearListUpdate cria uma lista de marcadores de mapa que é transmitida à propriedade mapMarkers e exibida no nosso componente de mapa.
    O mapa de ursos agora exibe marcadores de mapa para cada urso que faz parte do filtro atualmente. Se você mudar o filtro de ursos, o mapa de ursos será atualizado automaticamente.
    Agora, você pode ver os ursos em um mapa e em uma lista. Se você mudar o filtro de ursos, ambos os componentes serão atualizados automaticamente.
*/