export default {
  Meta: {
    title: 'Highlight Tibia Auction',
    description:
      'Highlight your Tibia Char Bazaar auction and get higher bids.',
  },
  StepItems: {
    Select: 'Select',
    Configure: 'Configure',
    Checkout: 'Checkout',
  },
  NextButton: 'Next',
  AuctionSearch: {
    inputLabel: 'Search by nickname',
    placeholder: 'Nickname',
    inputAriaLabel: 'Search an auction by its character nickname',
    paginatorNoItems: 'No auctions',
    emptyStateText: 'No auction was found',
  },
  Discount: {
    title: 'Discounts',
    description: 'Check out our progressive discounts!',
    proDiscount: '{{discount}} discount applied! ({{exevopro}} only)',
    freeDiscount: '{{discount}} discount not applied ({{exevopro}} only)',
  },
  Checkout: {
    title: 'Your information',
    emailPlaceholder: 'your@email.com',
    emailInvalidMessage: 'Invalid email',
    paymentCharacterLabel: 'Sending coins character',
    paymentCharacterInvalidMessage: 'Character does not exist',
    checkoutButtonLabel: 'Validate and submit checkout',
    checkoutButton: 'Checkout',
    success: 'Your order was placed!',
  },
  PaymentDetails: {
    titleIconLabel: 'Successful checkout',
    title: 'Your order was placed!',
    emailText1: 'An email was sent to',
    emailText2: 'containing the order details. Please check your spam folder',
    emojiLabel: 'Smiley face',
    smallDisclaimer:
      "If the purchase can't be completed, you will receive a refund.",
    CoinsPayment: {
      instruction: 'Please complete your order sending',
    },
    PixPayment: {
      codeText: 'Please complete your order paying the following Pix code:',
      qrText: 'or using the following QR Code:',
    },
    TransactionIdLabel: 'Transaction ID:',
    Summary: {
      title: 'Summary',
      auctionedCharacter: 'Auctioned character',
      datesTooltipText:
        'Your auction will be highlighted during the following days:',
      durationText: 'Advertising duration',
      costText: 'Total cost',
      highlightedDays: 'Highlighted days:',
    },
  },
  EmailTitle: 'Thank you for your order!',
  calendarDescription: 'Choose the days you want to highlight your auction.',
}
