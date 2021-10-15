export default {
  Meta: {
    title: 'Exevo Pan - Anunciar',
    description: 'Destaque seu leilão e alcance lances mais altos!',
  },
  StepItems: {
    Select: 'Selecionar',
    Configure: 'Configurar',
    Checkout: 'Finalizar',
  },
  RangeDatePicker: {
    currentMonthLabel: 'Mês atual',
    nextMonthLabel: 'Próximo mês',
    smallDescription: 'Escolha os dias que você quer destacar seu leilão.',
  },
  AuctionSearch: {
    inputLabel: 'Procurar por nickname',
    placeholder: 'Nickname',
    inputAriaLabel: 'Procurar um leilão pelo nome do personagem',
    paginatorNoItems: 'Nenhum leilão',
    emptyStateText: 'Nenhum leilão encontrado',
  },
  Checkout: {
    title: 'Seus dados',
    emailPlaceholder: 'seu@email.com.br',
    emailInvalidMessage: 'Email inválido',
    paymentCharacterLabel: 'Personagem que enviará as coins',
    paymentCharacterInvalidMessage: 'Personagem não existe',
    checkoutButtonLabel: 'Validar e finalizar compra',
    checkoutButton: 'Finalizar',
    LabelledInput: {
      valid: 'Campo válido',
      invalid: 'Campo inválido',
      loading: 'Validando...',
    },
  },
  PaymentDetails: {
    titleIconLabel: 'Finalizado com sucesso',
    title: 'Seu pedido foi enviado!',
    emailText1: 'Um email foi enviado para',
    emailText2:
      'contendo os detalhes do seu pedido. Por favor verifique a caixa de spam',
    emojiLabel: 'Rosto sorrindo',
    smallDisclaimer:
      'Se a compra não puder ser completada, seu dinheiro será devolvido.',
    CoinsPayment: {
      instruction: 'Por favor complete seu pedido enviando',
      from: 'de',
      to: 'para',
    },
    PixPayment: {
      codeText: 'Por favor complete seu pedido pagando o seguinte código Pix:',
      qrText: 'ou usando o seguinte QR Code:',
    },
    TransactionIdLabel: 'ID da transação:',
    Summary: {
      title: 'Resumo',
      auctionedCharacter: 'Personagem leiloado',
      datesTooltipText: 'Seu leilão será destacado durante os seguintes dias:',
      day: 'dia',
      days: 'dias',
      durationText: 'Duração do destaque',
      costText: 'Custo total',
      highlightedDays: 'Dias de destaque:',
    },
  },
  EmailTitle: 'Obrigado pelo seu pedido!',
}
