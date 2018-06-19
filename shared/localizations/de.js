const languageKey = 'de'
const content = {
  productName: 'Lunchspace',
  myLunchspaces: 'Meine Lunchspaces',
  // Localizable Errors
  authenticationError: 'Nicht authentifiziert. Bitte melde dich an.',
  authorizationError: 'Nicht authorisiert. Du hast nicht genug Rechte für diese Aktion.',
  unexpectedDatabaseError: 'Unerwarteter Datenbankfehler. Bitte versuche es später erneut.',
  unknownError: 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es später erneut.',
  unknownErrorWithMessage: 'Ein unerwarteter Fehler ist aufgetreten: {message}',
  needsUserConfirmation: 'Bitte bestätige diese Aktion.',
  invalidFileFormat: 'Das Format deiner Datei wird nicht unterstützt. Bitte lade eine .jpeg- oder .png-Datei hoch.',

  passwordAndEmailDoesNotMatch: 'Passwort und Email {email} stimmen nicht überein.',
  illegalInput: 'Upps, es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
  illegalLengthLocationName: 'Der Name einer Location muss zwischen 1 and 64 Zeichen lang sein.',
  illegalSubdomain: 'Die angegebene Subdomain ({lunchspaceSubdomain}) enthält ungültige Zeichen.',
  subdomainAlreadyExists: 'Die angegebene Subdomain ({lunchspaceSubdomain}) ist bereits vergeben.',
  fieldRequired: 'Eingabe notwendig.',
  invalidEmail: 'Bitte eine gültige E-Mail-Adresse angeben.',
  illegalHyphen: '(-) darf weder am Anfang noch am Ende der Sudomain stehen.',
  invalidLength: 'Eingabe muss zwischen {minimumLength} und {maximumLength} Zeichen lang sein.',
  invalidToken: 'Die verwendete Einladung ist nicht mehr gültig.',
  lunchspaceDoesNotExist: 'Der angeforderte Lunchspace existiert nicht.',
  emailAlreadyRegistered: 'Ein Account mit der E-Mail {email} existiert bereits.',
  userAlreadyMember: 'Du bist bereits Mitglied in diesem Lunchspace.',


  // Imprint
  contact: 'Kontakt',
  section5Tmg: 'Angaben gemäß § 5 TMG',
  imprint: 'Impressum',
  legalDisclosure: 'Gesetzliche Offenlegung',

  joinLunchspaceTitle: 'Lunchspace beitreten',
  joinLunchspace: 'Du wurdest zum Lunchspace {lunchspaceName} eingeladen!',
  inviteToCurrentLunchspace: 'Einladen zum Lunchspace {lunchspaceName}',
  invitationSent: 'Einladung gesendet.',
  notYou: 'Nicht du?',
  invalidInvitationLink: 'Einladungs-Link ist ungültig',
  accept: 'Akzeptieren',
  needToLoginForInvite: 'Melde dich an oder erstelle einen Account, um die Einladung anzunehmen.',
  askForPushNotificatoinSubscription: 'Möchtest du außerhalb der Seite Benachrichtigungen zu diesem Lunchspace erhalten?',
  yes: 'Ja',
  notNow: 'Nicht jetzt',
  InvitationSubject: 'Einladung zu einem Lunchspace',
  InvitationTitle: 'Du wurdest eingeladen!',
  InvitationPart1: ' hat dich eingeladen ',
  InvitationPart2: ' beizutreten. Um die Einladung anzunehmen, klicke auf diesen Link:',


  successfullyChangedName: 'Erfolgreich deinen Namen geändert.',
  successfullyChangedPassword: 'Erfolgreich dein Password geändert.',
  successfullyChangedPicture: 'Erfolgreich dein Bild geändert.',

  newPicture: 'Neues Bild',
  noPictureSelected: 'Kein Bild ausgewählt',

  createLunchspace: 'Lunchspace erstellen',
  lunchspaceSuccessfulCreated: 'Lunchspace {lunchspaceName} erfolgreich erstellt.',
  createLocation: 'Location erstellen',
  leaveLunchspace: 'Lunchspace verlassen',
  confirmDeleteLocation: 'Für diese Location sind noch Events in der Zukunft geplant. Bist du sicher, dass du sie löschen möchtest?',

  invite: 'Einladen',
  delete: 'Löschen',
  profile: 'Profil',
  email: 'E-Mail',
  phone: 'Telefon',
  support: 'Support',
  password: 'Passwort',
  name: 'Name',
  login: 'Anmelden',
  logout: 'Abmelden',
  change: 'Bearbeiten',
  changePassword: 'Passwort verändern',
  today: 'Heute',
  signUp: 'Registrieren',
  cancel: 'Abbrechen',
  participants: 'Teilnehmer',
  close: 'Schließen',

  // Notifications
  // Someone else joined my event
  someoneElseJoinedMyEventTitle: '{joinedUserFirstName} ist {locationName} um {eventTime} beigetreten',
  someoneElseJoinedMyEventBody: 'Du und {joinedUserFirstName} {joinedUserLastName} seid um {eventTime} bei {locationName} vom Lunchspace {lunchspaceName} eingetragen.',
  someoneElseAndOneOtherJoinedMyEventBody: 'Du {joinedUserFirstName} {joinedUserLastName} und ein Weiterer sind um {eventTime} bei {locationName} vom Lunchspace {lunchspaceName} eingetragen.',
  someoneElseAndMultipleOtherJoinedMyEventBody: 'Du {joinedUserFirstName} {joinedUserLastName} und {moreUserCount} Weitere sind um {eventTime} bei {locationName} vom Lunchspace {lunchspaceName} eingetragen.',
  // all left my event
  allLeftMyEventTitle: 'Leider haben sich alle abgemeldet 😢',
  allLeftMyEventBody: 'Bei {locationName} um {eventTime} haben sich alle vom Lunchspace {lunchspaceName} abgemeldet.',
}
module.exports = {
  languageKey,
  content,
}
