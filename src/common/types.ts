export type Bank =
  | 'MARKAZI'
  | 'SANAT_VA_MADAN'
  | 'MELLAT'
  | 'REFAH'
  | 'MASKAN'
  | 'SEPAH'
  | 'KESHAVARZI'
  | 'MELLI'
  | 'TEJARAT'
  | 'SADERAT'
  | 'TOSEAH_SADERAT'
  | 'POST'
  | 'TOSEAH_TAAVON'
  | 'TOSEAH'
  | 'KARAFARIN'
  | 'PARSIAN'
  | 'EGHTESAD_NOVIN'
  | 'SAMAN'
  | 'PASARGAD'
  | 'SARMAYEH'
  | 'SINA'
  | 'MEHR_IRAN'
  | 'SHAHR'
  | 'AYANDEH'
  | 'GARDESHGARI'
  | 'DAY'
  | 'IRANZAMIN'
  | 'RESALAT'
  | 'MELAL'
  | 'KHAVARMIANEH'
  | 'NOOR'
  | 'IRAN_VENEZUELA'
  | 'UNKNOWN';

export type BankAccountStatus =
  | 'ACTIVE'
  | 'BLOCK_WITH_DEPOSIT'
  | 'BLOCK_WITHOUT_DEPOSIT'
  | 'IDLE'
  | 'UNKNOWN';

export type CardType =
  | 'DEBIT'
  | 'CREDIT'
  | 'CREDIT_SPECIAL'
  | 'GIFT_CARD'
  | 'ONLINE_PREPAID'
  | 'VIRTUAL_CARD'
  | 'INSTALLMENT_CARD'
  | 'E_MONEY'
  | 'UNKNOWN';

export type BankAvailability = 'AVAILABLE' | 'NOT_AVAILABLE';
