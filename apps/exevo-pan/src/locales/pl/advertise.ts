// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/advertise'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Reklama',
    description: 'Podświetl swoją aukcję, aby uzyskać lepszą cenę!',
  },
  StepItems: {
    Select: 'Wybierz',
    Configure: 'Konfiguruj',
    Checkout: 'Podsumowanie',
  },
  NextButton: 'Następny',
  AuctionSearch: {
    inputLabel: 'Szukaj po nazwie',
    placeholder: 'Nazwa',
    inputAriaLabel: 'Szukaj aukcji po nazwie postaci',
    paginatorNoItems: 'Brak aukcji',
    emptyStateText: 'Nie znaleziono aukcji',
  },
  Discount: {
    title: 'Zniżki',
    description: 'Sprawdź nasze pakiety zniżkowe',
  },
  Checkout: {
    title: 'Twoje informacje',
    emailPlaceholder: 'twój@email.com',
    emailInvalidMessage: 'Nieprawidłowy email',
    paymentCharacterLabel: 'Postać wysyłająca Tibia Coiny',
    paymentCharacterInvalidMessage: 'Postać nie istnieję',
    checkoutButtonLabel: 'Sprawdź i przejdź do podsumowania',
    checkoutButton: 'Podsumowanie',
    success: 'Twoje zamówienie zostało złożone!',
  },
  PaymentDetails: {
    titleIconLabel: 'Wszystko się zgadza!',
    title: 'Twoje zamówienie zostało złożone!',
    emailText1: 'Email został wysłany do',
    emailText2:
      'Zawierający szczegóły zamówienia, proszę sprawdź swój folder spam',
    emojiLabel: 'Smiley face',
    smallDisclaimer:
      'Jeśli twój zakup nie będzie mógł zostać zrealizowany, zwrócimy ci środki.',
    CoinsPayment: {
      instruction: 'Dokończ swoje zamówienie wysyłając',
    },
    PixPayment: {
      codeText: 'Dokoncz swoje zamówienie płacąc na przedstawiony kod Pix:',
      qrText: 'lub użyj tego kodu QR:',
    },
    TransactionIdLabel: 'Numer Transakcji:',
    Summary: {
      title: 'Podsumowanie',
      auctionedCharacter: 'Wystawiona postać',
      datesTooltipText: 'Twoja postać zostanie podświetlona w te dni:',
      durationText: 'czas reklamy',
      costText: 'Całkowity koszt',
      highlightedDays: 'Podświetlone dni:',
    },
  },
  EmailTitle: 'Dziękujemy za złożenie zamówienia!',
  calendarDescription: 'Wybierz dni, w których chcesz promować swoją aukcję.',
})
