# Country Standard Numbers

![Build](https://github.com/koblas/stdnum-js/workflows/Node.js%20CI/badge.svg)

JavaScript (TypeScript) package to validate most all national numbers, with a focus on
VAT, Person and Tax identifiers.

## Quick start

    import { stdnum } from 'stdnum';

    console.log(stdnum.BR.cpf.name); // 'Brazilian National Identifier',
    console.log(stdnum.BR.cpf.localName); // 'Cadastro de Pessoas Físicas',
    console.log(stdnum.BR.cpf.abbreviation); // 'CPF',

    const {
        isValid, // is false
        error, // InvalidLength: The number has an invalid length...
    } = stdnum.BR.cpf.validate('xyzzy');

    const {
        isValid, // true
        compact, // '39053344705'
        isIndividual, // true
        isEntity, // false
    } = stdnum.BR.cpf.validate("390.533.447-05");

All country validators are in the "namespace" of the ISO country code.

## Bundle size: tree-shakeable imports

The `stdnum` object eagerly references every country, so importing it bundles
all of them (~200KB minified). If you only need a few validators, use either of
these forms instead:

    // Named country exports — tree-shakeable, bundlers drop unused countries
    import { GB, BR } from 'stdnum';

    GB.nino.validate('AB123456C');
    BR.cpf.validate('390.533.447-05');

    // Or import a single validator via its subpath
    import { validate } from 'stdnum/gb/nino';

    validate('AB123456C');

Subpaths follow the source layout: `stdnum/<country>/<number>` (e.g.
`stdnum/it/codicefiscale`), and `stdnum/<country>` for a whole country's
validators.

Tree-shaking the root `stdnum` entry works because `package.json` declares
`"sideEffects": false`: anything you import from it that you don't use, such as
the `stdnum` object or the validator tables below, can be dropped by the
bundler.

## Validating by country code

When the country is only known at runtime, these functions pick the
validators for an ISO 3166-1 alpha-2 country code (case-insensitive):

    import { validatePerson, validateEntity, validateVat } from 'stdnum';

    validatePerson('BR', '390.533.447-05'); // personal ID numbers
    validateEntity('US', '12-3456789'); // business and tax numbers
    validateVat('DE', 'DE136695976'); // VAT numbers

Each returns `{ checked: true, isValid, matchedValidators }` when it knows the
country, and `{ checked: false }` when it does not.

`validateVat` covers the countries in the `euVat` table: the EU member states
plus some non-EU countries (such as AD and CH). It only pulls in those VAT
validators, so it adds far less to a bundle than `validateEntity`, which
references every country's business validators.

## Supported Countries and Numbers

How you can help! This library currently support about half the countries in the world. It would be great if we can get to 100%. Submit an issue with any reference documentation and I'll do my best to integrate it, bonus points if you can get detailed descriptions of checksums or other validation criteria.

| Country                | Code | Name            | Group              | Meaning                                                                                                                                |
| ---------------------- | ---- | --------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Andorra                | AD   | NRT             | Tax                | Tax Register Identifier (Número de Registre Tributari)                                                                                 |
| Angola                 | AO   | BI              | Person             | Angolan Identity Card (Bilhete de Identidade)                                                                                          |
| Angola                 | AO   | NIF             | Tax                | Angolan Tax Identification Number (Número de Identificação Fiscal)                                                                     |
| Albania                | AL   | NIPT            | Vat                | Albanian Vat Identifier (Numri i Identifikimit për Personin e Tatueshëm)                                                               |
| Anguilla               | AI   | TIN             | Tax                | Tax Identification Number                                                                                                              |
| Argentina              | AR   | CBU             | Bank               | Single Banking Code (Clave Bancaria Uniforme)                                                                                          |
| Argentina              | AR   | CUIT            | Tax                | Unique Tax Identification Code (Código Único de Identificación Tributaria)                                                             |
| Argentina              | AR   | DNI             | Person             | National Identity Document (Documento Nacional de Identidad)                                                                           |
| Austria                | AT   | Businessid      | Company            | Austrian Company Register Number                                                                                                       |
| Austria                | AT   | TIN             | Tax                | Austrian tax identification number (Abgabenkontonummer)                                                                                |
| Austria                | AT   | UID             | VAT                | Austrian VAT number (Umsatzsteuer-Identifikationsnummer)                                                                               |
| Austria                | AT   | VNR             | Person             | Austrian social security number(Versicherungsnummer)                                                                                   |
| Australia              | AU   | ABN             | Company            | Australian Business Number                                                                                                             |
| Australia              | AU   | ACN             | Company            | Australian Company Number                                                                                                              |
| Australia              | AU   | TFN             | Tax/Person/Company | Australian Tax File Number                                                                                                             |
| Bosnia and Herzegovina | BA   | JMBG            | Person             | Unique Master Citizen Number                                                                                                           |
| Belize                 | BZ   | TIN             | Person/Company     | Brazilian Tax ID ()                                                                                                                    |
| Belgium                | BE   | BIS             | Person             | Belgian Number for Foreigners                                                                                                          |
| Belgium                | BE   | INSZ, NISS      | Person             | Belgian Social Security Identification Number (Identificatienummer van de Sociale Zekerheid, Numéro d'Identification Sécurité Sociale) |
| Belgium                | BE   | NN              | Person             | Belgian National Number (Numéro National)                                                                                              |
| Belgium                | BE   | VAT             | Company            | Belgian Enterprise Number                                                                                                              |
| Bulgaria               | BG   | EGN             | Person             | ЕГН, Единен граждански номер, Bulgarian personal identity codes                                                                        |
| Bulgaria               | BG   | PNF             | Person             | PNF (ЛНЧ, Личен номер на чужденец, Bulgarian number of a foreigner).                                                                   |
| Bulgaria               | BG   | VAT             | Company            | Идентификационен номер по ДДС, Bulgarian VAT number                                                                                    |
| Bolivia                | BO   | CI              | Person             | Person Identifier (Cédula de Identidad)                                                                                                |
| Brazil                 | BR   | CPF             | Person             | Brazilian identity number (Cadastro de Pessoas Físicas)                                                                                |
| Brazil                 | BR   | CNPJ            | Company            | Brazilian company number (Cadastro Nacional da Pessoa Jurídica)                                                                        |
| Belarus                | BY   | UNP             | Person/Company     | Учетный номер плательщика, the Belarus VAT number                                                                                      |
| Canada                 | CA   | BC_BHN          | Person             | British Columbia Personal Health Number                                                                                                |
| Canada                 | CA   | BN              | Company            | Company Identifier (Canadian Business Number)                                                                                          |
| Canada                 | CA   | GST             | Company            | Goods and service Tax Number                                                                                                           |
| Canada                 | CA   | PST             | Company            | Provincial Service Tax Number                                                                                                          |
| Canada                 | CA   | QST             | Company            | Quebec Service Tax Number                                                                                                              |
| Canada                 | CA   | SIN             | Person             | Person Identifier (Social Insurance Number)                                                                                            |
| Cuba                   | CU   | NI              | Person             | Número de identidad, Cuban identity card numbers                                                                                       |
| Cyprus                 | CY   | VAT             | Company            | Αριθμός Εγγραφής Φ.Π.Α. (Cypriot VAT number)                                                                                           |
| Czech Republic         | CZ   | DIC             | Vat                | Daňové identifikační číslo, Czech VAT number                                                                                           |
| Czech Republic         | CZ   | ICO             | Company            | Identifikační číslo osoby, Czech Company Identification Number                                                                         |
| Czech Republic         | CZ   | RC              | Person             | Rodné číslo, the Czech birth number                                                                                                    |
| Swisserland            | CH   | SSN             | Person             | Swiss social security number ("Sozialversicherungsnummer")                                                                             |
| Swisserland            | CH   | UID             | Company            | Unternehmens-Identifikationsnummer, Swiss business identifier                                                                          |
| Swisserland            | CH   | VAT             | Company            | Mehrwertsteuernummer, the Swiss VAT number                                                                                             |
| Chile                  | CL   | RUT             | Tax                | Tax Identifier (Rol Unico Tributario) [RUN]                                                                                            |
| China                  | CN   | RIC             | Person             | Person Identifier (Chinese Resident Identity Card Number)                                                                              |
| China                  | CN   | USCC            | Company            | Company Identifier (Unified Social Credit Code, 统一社会信用代码, China tax number)                                                    |
| Columbia               | CO   | NIT             | Tax                | Tax Identifier (Número de Identificación Tributaria)                                                                                   |
| Costa Rica             | CR   | CPF             | Person             | Person Identifier (Cédula de Persona Física)                                                                                           |
| Costa Rica             | CR   | CPJ             | Company            | Company Identifier (Cédula de Persona Jurídica)                                                                                        |
| Costa Rica             | CR   | CR              | Person             | Person Identifier (Cédula de Residencia)                                                                                               |
| Germany                | DE   | IDNR            | Person             | Steuerliche Identifikationsnummer, German personal tax number                                                                          |
| Germany                | DE   | Passport        | Person             | Passport Number                                                                                                                        |
| Germany                | DE   | STNR            | Company            | Steuernummer, German tax number                                                                                                        |
| Germany                | DE   | SVNR            | Person             | Sozialversicherungsnummer, German social security / pension insurance number number                                                    |
| Germany                | DE   | VAT             | Company            | Vat identifier                                                                                                                         |
| Denmark                | DK   | VAT             | Company            | Momsregistreringsnummer, Danish VAT number                                                                                             |
| Dominican Republic     | DO   | CEDULA          | Person             | Person Identifier (Cédula de Residencia)                                                                                               |
| Dominican Republic     | DO   | NCF             | Vat                | Tax Receipt Number (Números de Comprobante Fiscal)                                                                                     |
| Dominican Republic     | DO   | RNC             | Tax                | Person Identifier (Registro Nacional del Contribuyente)                                                                                |
| Algeria                | DZ   | NIF             | Person/Company     | Numéro d'Identification Fiscale, Algeria tax number                                                                                    |
| Ecuador                | EC   | CI              | Person             | Ecuadorian person identifier (Cédula de identidad)                                                                                     |
| Estonia                | EE   | IK              | Person             | Isikukood (Estonian Personcal ID number).                                                                                              |
| Estonia                | EE   | KMKR            | Company            | KMKR (Käibemaksukohuslase, Estonian VAT number)                                                                                        |
| Estonia                | EE   | Registrikood    | Company            | Registrikood (Estonian organisation registration code)                                                                                 |
| Egypt                  | EG   | TN              | Company            | Tax Registration Number (الرقم الضريبي, Egypt tax number)                                                                              |
| Ecuador                | EC   | RUC             | Tax/Vat            | Ecuadorian company tax number (Registro Único de Contribuyentes)                                                                       |
| El Salvador            | SV   | NIT             | Tax                | Tax Identifier (Número de Identificación Tributaria)                                                                                   |
| Finland                | FI   | ALV             | Company            | ALV nro (Arvonlisäveronumero, Finnish VAT number)                                                                                      |
| Finland                | FI   | HETU            | Person             | HETU (Henkilötunnus, Finnish personal identity code)                                                                                   |
| Finland                | FI   | YTUNNUS         | Company            | Y-tunnus (Finnish business identifier)                                                                                                 |
| Faroe Islands          | FO   | VN              | Company/Person     | Vinnutal, Faroe Islands tax number                                                                                                     |
| France                 | FR   | NIF             | Person             | NIF (Numéro d'Immatriculation Fiscale, French tax identification number)                                                               |
| Great Britain          | GB   | NINO            | Person             | NINO (United Kingdom National Insurance Number)                                                                                        |
| Great Britain          | GB   | UTR             | Person             | UTR (United Kingdom Unique Taxpayer Reference)                                                                                         |
| Great Britain          | GB   | VAT             | Company            | VAT (United Kingdom (and Isle of Man) VAT registration number)                                                                         |
| Ghana                  | GH   | TIN             | Person/Company     | Taxpayer Identification Number, Ghana tax number                                                                                       |
| Guinea                 | GN   | NIFP            | Person/Company     | Numéro d'Identification Fiscale Permanent, Guinea tax number                                                                           |
| Greece                 | GR   | AMKA            | Company            | AMKA (Αριθμός Μητρώου Κοινωνικής Ασφάλισης, Greek social security number)                                                              |
| Guatemala              | GT   | CUI             | Person             | Guatemala person (Código Único de Identificación)                                                                                      |
| Guatemala              | GT   | NIT             | Company            | Guatemala company tax number (Número de Identificación Tributaria)                                                                     |
| Greece                 | GR   | VAT             | Company            | FPA, ΦΠΑ, ΑΦΜ (Αριθμός Φορολογικού Μητρώου, the Greek VAT number)                                                                      |
| France                 | FR   | NIR             | Person             | NIR (French personal identification number)                                                                                            |
| France                 | FR   | SIREN           | Company            | SIREN (a French company identification number)                                                                                         |
| France                 | FR   | SIRET           | Company            | SIRET (a French company establishment identification number)                                                                           |
| France                 | FR   | TVA             | Vat                | VAT Identifier                                                                                                                         |
| Croatia                | HR   | OIB             | Person             | Osobni identifikacijski broj, Croatian identification number                                                                           |
| Hong Kong              | HK   | HKID            | Person             | Hong Kong Identity Card                                                                                                                |
| Hungaria               | HU   | ANUM            | Vat                | ANUM (Közösségi adószám, Hungarian VAT number)                                                                                         |
| Iceland                | IS   | KENNITALA       | Person/Company     | Icelandic personal and organisation identity code                                                                                      |
| Iceland                | IS   | VSK             | Vat                | Virðisaukaskattsnúmer, Icelandic VAT number                                                                                            |
| Indonesia              | ID   | NIK             | Person             | NIK (Nomor Induk Kependudukan, Indonesian identity number).                                                                            |
| Indonesia              | ID   | NPWP            | Person/Company     | NPWP (Nomor Pokok Wajib Pajak, Indonesian VAT Number).                                                                                 |
| Ireland                | IE   | PPS             | Person             | Personal Public Service Number, Irish personal number                                                                                  |
| Ireland                | IE   | VAT             | Tax/Vat            | Ireland Value Added Tax ID                                                                                                             |
| India                  | IN   | AADHAAR         | Company            | Indian digital resident personal identity number                                                                                       |
| India                  | IN   | EPIC            | Person             | Electoral Photo Identity Card, Indian Voter ID                                                                                         |
| India                  | IN   | GSTIN           | Vat                | Goods and Services Tax identification number, Indian VAT number                                                                        |
| India                  | IN   | PAN             | Person             | Permanent Account Number, Indian income tax identifier                                                                                 |
| India                  | IN   | VIN             | Person             | Indian personal virtual identity number                                                                                                |
| Israel                 | IL   | IDNR            | Person             | Identity Number (Mispar Zehut, מספר זהות, Israeli identity number)                                                                     |
| Israel                 | IL   | HR              | Company            | Company Number (מספר חברה, or short ח.פ. Israeli company number)                                                                       |
| Italy                  | IT   | AIC             | Drug               | Italian code for identification of drugs                                                                                               |
| Italy                  | IT   | CODICEFISCALE   | Person             | Codice Fiscale (Italian tax code for individuals)                                                                                      |
| Italy                  | IT   | IVA             | Vat                | Partita IVA (Italian VAT number)                                                                                                       |
| Liechtenstein          | LI   | PEID            | Person/Company     | Personenidentifikationsnummer                                                                                                          |
| Lithuanian             | LT   | ASMENS          | Person             | Asmens kodas (Person Number)                                                                                                           |
| Lithuanian             | LT   | PVM             | Vat                | Pridėtinės vertės mokestis mokėtojo kodas                                                                                              |
| Luxembourgian          | LU   | TVA             | Vat                | taxe sur la valeur ajoutée                                                                                                             |
| Latvian                | LV   | PVN             | Person/Vat         | Pievienotās vērtības nodokļa                                                                                                           |
| Morocco                | MA   | ICE             | Company            | Identifiant Commun de l'Entreprise, Moroccan new registration number                                                                   |
| Macedonia              | MK   | EDB             | Vat                | Едниствен Даночен Број, North Macedonia tax number                                                                                     |
| Macedonia              | MK   | JMBG            | Person             | Unique Master Citizen Number (Единствен матичен број на граѓанинот)                                                                    |
| Monaco                 | MC   | TVA             | Vat                | taxe sur la valeur ajoutée, Monacan VAT number                                                                                         |
| Moldavia               | MD   | IDNO            | Vat                | Moldavian VAT number                                                                                                                   |
| Malta                  | MT   | VAT             | Vat                | Maltese VAT number                                                                                                                     |
| Mauritius              | MU   | NID             | Person             | ID number (Mauritian national identifier)                                                                                              |
| Japan                  | JP   | CN              | Company            | 法人番号, hōjin bangō, Japanese Corporate Number                                                                                       |
| Kenya                  | KE   | PIN             | Person/Company     | Personal Identification Number, Kenya tax number                                                                                       |
| South Korea            | KR   | BRN             | Company            | 사업자 등록 번호, South Korea Business Registration Number)                                                                            |
| South Korea            | KR   | RRN             | Person             | South Korean resident registration number                                                                                              |
| Mexico                 | MX   | RFC             | Tax/Vat            | Tax Identifier (Registro Federal de Contribuyentes)                                                                                    |
| Mexico                 | MX   | CURP            | Person             | Individual Identifier (Clave Única de Registro de Población)                                                                           |
| Mexico                 | MX   | CLABE           | Bank               | Bank Account (Clave Bancaria Estandarizada)                                                                                            |
| Montenegro             | ME   | JMBG            | Person             | Unique Master Citizen Number                                                                                                           |
| Montenegro             | ME   | PIB             | Tax/Vat            | Poreski Identifikacioni Broj, Montenegro tax number                                                                                    |
| Mozambique             | MZ   | BI              | Person             | Bilhete de Identidade, Mozambican national identification number                                                                       |
| Mozambique             | MZ   | NUIT            | Tax/Vat            | Número Único de Identificação Tributária, Mozambican tax identifier number                                                             |
| Malaysia               | MY   | NRIC            | Person             | Malaysian National Registration Identity Card Number                                                                                   |
| Netherlands            | NL   | BSN             | Person             | Burgerservicenummer, the Dutch citizen identification number                                                                           |
| Netherlands            | NL   | BTW             | Vat                | Btw-identificatienummer (Omzetbelastingnummer, the Dutch VAT number)                                                                   |
| Netherlands            | NL   | Onderwijsnummer | Person             | Onderwijsnummer (the Dutch student identification number)                                                                              |
| New Zealand            | NZ   | IRD             | Person/Company     | New Zealand Inland Revenue Department (Te Tari Tāke) number                                                                            |
| New Zealand            | NZ   | BANK            | Bank               | New Zealand Bank Account numbers - checkdigit                                                                                          |
| Norway                 | NO   | Fodsels         | Person             | Fødselsnummer (Norwegian birth number, the national identity number)                                                                   |
| Norway                 | NO   | Konto           | Bank               | Konto nr. (Norwegian bank account number)                                                                                              |
| Norway                 | NO   | MVA             | Vat                | Merverdiavgift, Norwegian VAT number                                                                                                   |
| Norway                 | NO   | Orgnr           | Company            | Organisasjonsnummer, Norwegian organisation number                                                                                     |
| Paraguay               | PY   | RUC             | Tax/Vat            | Tax Identifier (Registro Único de Contribuyentes)                                                                                      |
| Peru                   | PE   | CUI             | Person             | Person Identifier (Cédula Única de Identidad)                                                                                          |
| Peru                   | PE   | RUC             | Tax/Vat            | Tax Identifier (Registro Único de Contribuyentes)                                                                                      |
| Peru                   | PE   | CE              | Person             | Person Identifier (Carné de Extranjería)                                                                                               |
| Pakistan               | PK   | CNIC            | Person             | National Identity Card                                                                                                                 |
| Pakistan               | PK   | NTN             | Company            | Tax Identification Number                                                                                                              |
| Poland                 | PL   | NIP             | Vat                | Numer Identyfikacji Podatkowej, Polish VAT number                                                                                      |
| Poland                 | PL   | PESEL           | Person             | Polish national identification number                                                                                                  |
| Poland                 | PL   | REGON           | Company            | Rejestr Gospodarki Narodowej, Polish register of economic units                                                                        |
| Portugual              | PT   | CC              | Person/Company     | Número de Cartão de Cidadão, Portuguese Identity number                                                                                |
| Portugual              | PT   | NIF             | Vat                | Número de identificação fiscal, Portuguese VAT number                                                                                  |
| Russia                 | RU   | INN             | Tax/Vat            | Tax Identifier (Идентификационный номер налогоплательщика)                                                                             |
| Romania                | RO   | CF              | Vat                | Cod de înregistrare în scopuri de TVA, Romanian VAT number                                                                             |
| Romania                | RO   | CNP             | Person             | Cod Numeric Personal, Romanian Numerical Personal Code)                                                                                |
| Romania                | RO   | CUI             | Tax                | Codul Unic de Înregistrare, Romanian company identifier                                                                                |
| Romania                | RO   | ONRC            | Company            | Ordine din Registrul Comerţului, Romanian Trade Register identifier                                                                    |
| San Marino             | SM   | COE             | Company            | Codice operatore economico, San Marino national tax number                                                                             |
| Serbia                 | RS   | PIB             | Vat                | Poreski identifikacioni broj Tax identification number                                                                                 |
| Serbia                 | RS   | JMBG            | Person             | Unique Master Citizen Number (Jedinstveni matični broj građana)                                                                        |
| Sweden                 | SE   | ORGNR           | Company            | Organisationsnummer, Swedish company number                                                                                            |
| Sweden                 | SE   | PERSONNUMMER    | Person             | Personnummer (Swedish personal identity number)                                                                                        |
| Sweden                 | SE   | VAT             | Vat                | VAT (Moms, Mervärdesskatt, Swedish VAT number)                                                                                         |
| Singapore              | SG   | UEN             | Company            | Singapore's Unique Entity Number                                                                                                       |
| Thailand               | TH   | IDNR            | Person             | Thai National ID (บัตรประจำตัวประชาชนไทย)                                                                                              |
| Thailand               | TH   | MOA             | Company            | Thailand Memorandum of Association Number                                                                                              |
| Thailand               | TH   | TIN             | Company/Person     | Thai Tax ID (Moa or Idnr)                                                                                                              |
| Tunisia                | TN   | MF              | Vat                | Matricule Fiscal, Tunisia tax number                                                                                                   |
| Taiwan                 | TW   | BAN             | Company            | Taiwanese Unified Business Number (統一編號)                                                                                           |
| Taiwan                 | TW   | NATID           | Person             | National ID Card Number                                                                                                                |
| Taiwan                 | TW   | TAX_CODE        | Person             | Tax Code                                                                                                                               |
| Taiwan                 | TW   | UBN             | Company            | Unified Business Number, 統一編號, Taiwanese tax number                                                                                |
| Taiwan                 | TW   | UI              | Person             | UI Number                                                                                                                              |
| Turkey                 | TR   | TCKIMLIK        | Person             | Türkiye Cumhuriyeti Kimlik Numarası (Personal ID)                                                                                      |
| Turkey                 | TR   | VKN             | Tax                | Vergi Kimlik Numarası, Turkish tax identification number                                                                               |
| Slovenia               | SI   | DDV             | Vat                | ID za DDV (Davčna številka, Slovenian VAT number)                                                                                      |
| Slovenia               | SI   | JMBG            | Person             | Unique Master Citizen Number (Enotna matična številka občana)                                                                          |
| Slovakia               | SK   | DPH             | Vat                | IČ DPH (IČ pre daň z pridanej hodnoty, Slovak VAT number)                                                                              |
| Slovakia               | SK   | RC              | Person             | RČ (Rodné číslo, the Slovak birth number)                                                                                              |
| Spain                  | ES   | CIF             | Tax/Vat            | Tax Identifier (Código de Identificación Fiscal)                                                                                       |
| Spain                  | ES   | DNI             | Person             | Identity code (Documento Nacional de Identidad)                                                                                        |
| Spain                  | ES   | NIE             | Person             | Identity code foreigner (Número de Identificación de Extranjero)                                                                       |
| Spain                  | ES   | NIF             | Tax                | Tax Identifier (Número de Identificación Fiscal)                                                                                       |
| Spain                  | ES   | NSS             | Person             | El número de Seguridad Social, Social Security Number                                                                                  |
| Sri Lanka              | LK   | NIC             | Person             | NIC Number                                                                                                                             |
| Uruguay                | UY   | RUT             | Tax/Vat            | Tax Identifier (Registro Único Tributario)                                                                                             |
| Uruguay                | UY   | CEDULA          | Person             | Person Identifier (Cédula de Residencia)                                                                                               |
| Uruguay                | UY   | NIE             | Person             | ForeignersI identification Number                                                                                                      |
| Ukraine                | UA   | RNTRC           | Person             | КПП, RNTRC (Individual taxpayer registration number in Ukraine)                                                                        |
| Ukraine                | UA   | EDRPOU          | Company            | ЄДРПОУ, EDRPOU (Identifier for enterprises and organizations in Ukraine)                                                               |
| United States          | US   | EIN             | Tax/Company        | Tax Identifier (Employer Identification Number)                                                                                        |
| United States          | US   | SSN             | Tax/Individual     | Tax Identifier (Social Security Number)                                                                                                |
| Venezuelan             | VE   | RIF             | Vat                | Vat Identifier (Registro de Identificación Fiscal)                                                                                     |
| Vietnam                | VN   | MST             | Company            | Mã số thuế, Vietnam tax number                                                                                                         |
| South Africa           | ZA   | IDNR            | Person             | ID number (South African Identity Document number).                                                                                    |
| South Africa           | ZA   | TIN             | Person/Company     | TIN (South African Tax Identification Number).                                                                                         |
| South Africa           | ZA   | VAT             | Company            | VAT (South African Value Added Tax Number).                                                                                            |

## Passport Number Validation

This library now supports passport number validation for **136 countries**. Each passport validator follows the same interface as other validators and validates passport number formats based on country-specific patterns.

### Quick Example

```javascript
import { stdnum } from 'stdnum';

// Validate Brazilian passport
const brazilResult = stdnum.BR.passport.validate('AB123456');
console.log(brazilResult.isValid); // true if format is correct

// Validate US passport
const usResult = stdnum.US.passport.validate('123456789');
console.log(usResult.isValid); // true if format is correct

// Validate German passport (with checksum support)
const germanResult = stdnum.DE.passport.validate('C01X00T47');
console.log(germanResult.isValid); // true if format and checksum are correct
```

### Convenience API

You can also use the convenience API to validate passport numbers by country code:

```javascript
import { validatePassport, formatPassport, compactPassport } from 'stdnum';

// Validate by country code
const result = validatePassport('BR', 'AB123456');
console.log(result.checked, result.isValid); // true true

// Country without passport validator: not checked, like validatePerson
console.log(validatePassport('XK', 'AB123456')); // { checked: false }

// Format by country code
const formatted = formatPassport('US', '123456789');
console.log(formatted); // '123456789'

// Compact by country code
const compacted = compactPassport('DE', 'C01X00T47');
console.log(compacted); // 'C01X00T47'
```

### Supported Passport Validators

The following countries have passport number validators implemented:

| Country | Code | Passport Format |
|---------|------|----------------|
| Andorra | AD | 1 letter + 7 digits |
| Afghanistan | AF | 1 letter + 8 digits |
| Antigua and Barbuda | AG | 1 letter + 6 digits |
| Anguilla | AI | pattern `^\d{9}$\|^[A-Z]{2}\d{6}$` |
| Albania | AL | 2 letters + 7 digits |
| Armenia | AM | 2 letters + 7 digits |
| Angola | AO | 1-2 letters + 7 digits |
| Argentina | AR | 3 letters + 6 digits |
| Austria | AT | 1-2 letters + 7 digits |
| Australia | AU | pattern `^[A-Z]\d{7}$\|^[A-Z]{2}\d{7}$` |
| Azerbaijan | AZ | pattern `^[A-Z]\d{8}$\|^[A-Z]{2}\d{7}$` |
| Bosnia and Herzegovina | BA | pattern `^[A-Z]\d{8}$\|^\d{9}$` |
| Barbados | BB | 1 letter + 6 digits |
| Bangladesh | BD | 2 letters + 7 digits, or 1 letter + 8 digits |
| Belgium | BE | 2 letters + 6 digits |
| Bulgaria | BG | 9 digits |
| Bolivia | BO | 6-9 alphanumerics |
| Brazil | BR | 2 letters + 6 digits |
| Bahamas | BS | 1-2 letters + 6-7 digits |
| Belarus | BY | 2 letters + 7 digits |
| Belize | BZ | 2 letters + 6 digits |
| Canada | CA | pattern `^[A-Z]{2}\d{6}$\|^[A-Z]\d{6}[A-Z]{2}$` |
| Switzerland | CH | pattern `^[A-Z][0-9A-Z]{7}$` |
| Côte d'Ivoire | CI | 2 letters + 6 digits |
| Chile | CL | pattern `^[A-Z]?\d{6,9}[0-9K]?$` |
| Cameroon | CM | 9 alphanumerics |
| China | CN | pattern `^(?:[GDSP]\d{8}\|[DSP]E\d{7}\|E[A-HJ-NP-Z0-9]\d{7})$` |
| Colombia | CO | 8-9 alphanumerics |
| Costa Rica | CR | 2 letters + 6 digits |
| Cuba | CU | 1 letter + 6 digits |
| Cyprus | CY | 1 letter + 6-8 digits |
| Czech Republic | CZ | 8 digits |
| Germany | DE | 9 alphanumeric characters (with MRZ checksum), or provisional A/B + 7 digits |
| Denmark | DK | 9 digits |
| Dominica | DM | 1-2 letters + 6-7 digits |
| Dominican Republic | DO | 2 letters + 7 digits |
| Algeria | DZ | 9 digits |
| Ecuador | EC | 9 alphanumerics |
| Estonia | EE | 1-2 letters + 7 digits |
| Egypt | EG | 1 letter + 8 digits |
| Spain | ES | pattern `^[A-Z0-9]{2}[A-Z0-9]?\d{6}$` |
| Ethiopia | ET | pattern `^E[A-Z]?\d{6,7}$` |
| Finland | FI | 2 letters + 7 digits |
| Fiji | FJ | 6-7 digits |
| Faroe Islands | FO | 9 digits |
| France | FR | 2 digits + 2 letters + 5 digits |
| United Kingdom | GB | 9 digits |
| Grenada | GD | 1 letter + 6 digits |
| Georgia | GE | 8 digits + optional letter or digit, or 2 digits + 2 letters + 5 digits |
| Ghana | GH | 1 letter + 7 digits, or 2 letters + 6 digits |
| Guinea | GN | 1 letter or digit + 8 digits |
| Greece | GR | 2 letters + 7 digits |
| Guatemala | GT | 9 digits |
| Guyana | GY | 1 letter + 7 digits |
| Hong Kong | HK | 1-2 letters + 6 digits + 1-2 alphanumerics |
| Croatia | HR | 9 digits |
| Haiti | HT | 2 letters + 6-7 digits, or 1 letter + 8 digits |
| Hungary | HU | pattern `^[A-Z]{2}\d{6}$\|^[A-Z]{2}\d{7}$` |
| Indonesia | ID | 1-2 letters + 6-7 digits |
| Ireland | IE | 2 alphanumerics + 7 digits |
| Israel | IL | 8 digits |
| India | IN | 1 letter + 7 digits |
| Iceland | IS | letter A + 7 digits |
| Italy | IT | 2 alphanumerics + 7 digits |
| Jamaica | JM | 1 letter + 7 digits |
| Japan | JP | 2 letters + 7 digits |
| Kenya | KE | 1-2 letters + 6-8 digits |
| Cambodia | KH | 1 letter + 7-8 digits |
| Saint Kitts and Nevis | KN | 1-2 letters + 6-7 digits |
| South Korea | KR | pattern `^[MSROD]\d{8}$\|^[MSROD]\d{3}[A-Z]\d{4}$` |
| Kazakhstan | KZ | 1 letter + 7-8 digits |
| Laos | LA | 1 letter + 7 digits |
| Lebanon | LB | pattern `^[A-Z]{2}\d{7}$\|^\d{6,7}$` |
| Saint Lucia | LC | 1-2 letters + 6 digits |
| Liechtenstein | LI | 1 letter + 5 digits |
| Sri Lanka | LK | pattern `^(?:[A-Z]\d{7}\|[A-Z]{2}\d{6})$` |
| Lithuania | LT | 8 alphanumerics |
| Luxembourg | LU | 7-8 alphanumerics |
| Latvia | LV | 2 alphanumerics + 7 digits |
| Morocco | MA | 1-2 letters + 6-7 digits |
| Monaco | MC | 2 letters + 6 digits |
| Moldova | MD | 1-2 letters + 6-7 digits |
| Montenegro | ME | 9 digits |
| North Macedonia | MK | 1 letter + 7 digits |
| Mongolia | MN | 2 letters + 7 digits |
| Malta | MT | 7 digits |
| Mauritius | MU | 1 letter + 7 digits |
| Mexico | MX | 1 letter + 8 digits |
| Malaysia | MY | 1 letter [AHK] + 8 digits |
| Mozambique | MZ | 2 letters + 6-7 digits |
| Nigeria | NG | 1 letter + 8 digits |
| Netherlands | NL | 2 letters + 6 alphanumerics + 1 digit |
| Norway | NO | 8 digits, or 1 letter + 7-8 alphanumerics |
| Nepal | NP | 8 digits |
| New Zealand | NZ | 2 letters + 6 digits |
| Oman | OM | 1 letter + 7 digits |
| Peru | PE | 9 digits |
| Papua New Guinea | PG | 8 digits |
| Philippines | PH | 1 letter + 6 digits, or 2 letters + 6 digits, or 2 letters + 7 digits, or 1 letter + 7 digits + 1 letter |
| Pakistan | PK | 2 letters + 7 digits |
| Poland | PL | 2 letters + 7 digits |
| Portugal | PT | 1-2 letters + 6 digits |
| Paraguay | PY | 6-9 alphanumerics |
| Qatar | QA | 8 digits |
| Romania | RO | pattern `^\d{8}$\|^\d{9}$` |
| Serbia | RS | 9 digits |
| Russian Federation | RU | 9 digits |
| Solomon Islands | SB | 7 digits |
| Sweden | SE | 8 digits, or 2 letters + 7 digits |
| Singapore | SG | 1 letter [EK] + 7 digits + 1 letter |
| Slovenia | SI | letter P + 1 letter + 7 digits |
| Slovakia | SK | 1 letter + 7 digits, or 2 letters + 6-7 digits |
| San Marino | SM | 6 digits |
| Senegal | SN | 9 digits, or 1 letter + 8 digits |
| Suriname | SR | 1 letter + 6-7 digits |
| El Salvador | SV | 1 letter + 6-8 digits |
| Thailand | TH | 2 letters + 7 digits |
| Tajikistan | TJ | 9 digits |
| Turkmenistan | TM | 2 letters + 7 digits |
| Tunisia | TN | 1 letter + 6-7 digits |
| Tonga | TO | 6 digits |
| Turkey (Türkiye) | TR | 1 letter + 8 digits |
| Trinidad and Tobago | TT | 2 letters + 6 digits |
| Taiwan (Republic of China) | TW | 9 digits |
| Tanzania | TZ | pattern `^[A-Z]\d{7}$\|^[A-Z]{2}\d{6}$` |
| Ukraine | UA | pattern `^[A-Z]{2}\d{6}$\|^\d{8}$` |
| Uganda | UG | pattern `^[A-Z]\d{7}$\|^[A-Z]{2}\d{6}$\|^[A-Z]\d{8}$` |
| United States | US | pattern `^\d{9}$\|^[A-Z]\d{8}$` |
| Uruguay | UY | 1-3 letters + 6 digits |
| Saint Vincent and the Grenadines | VC | 2 letters + 8 digits |
| Venezuela | VE | 8-9 digits |
| Vietnam | VN | 1 letter + 7 digits, or 9 digits |
| Samoa | WS | letter T + 6 digits |
| Yemen | YE | 8 digits |
| South Africa | ZA | 1 letter + 8 digits |
| Zambia | ZM | 2 letters + 6 digits |

*Note: Germany includes checksum validation for machine-readable passport formats. Additional checksum validation can be added for other countries as documentation becomes available.*

**Multiple Format Support:**
Some countries have transitioned to new passport formats while old formats remain valid during transition periods. The validators support both formats:

- **United States**: Old format (9 digits) and Next Generation format (1 letter + 8 digits)
- **Canada**: Old format (2 letters + 6 digits) and new format (1 letter + 6 digits + 2 letters)  
- **India**: Old format (1 letter + 7 digits) and new ePassport format (2 letters + 6 digits)

### Examples

TODO -- Usage examples

### Credits

Thanks to [python-stdnum](https://arthurdejong.org/python-stdnum/) for providing the inspiration and
many of the checksum algorithm sources

### References

https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/
https://wiki.scn.sap.com/wiki/display/CRM/Country+Tax+Category+check

### Release Notes

Releases are managed by [release-please](https://github.com/googleapis/release-please).
PRs are squash-merged and the PR title becomes the commit on `main`, so it must be a
[Conventional Commit](https://www.conventionalcommits.org/) (`fix(de/vat): ...`,
`feat(br): ...`); a CI check enforces it. `fix` bumps the patch version, `feat`
the minor version, and `!` or a `BREAKING CHANGE:` footer the major version.

Every push to `main` updates one release PR that bumps the version and prepends
the `CHANGELOG.md` entry. Merging it tags the release, creates the GitHub release
and publishes to npm with provenance (`.github/workflows/release.yaml`).
