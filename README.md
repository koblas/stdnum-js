# Country Standard Numbers

![Build](https://github.com/koblas/stdnum-js/workflows/Node.js%20CI/badge.svg)

JavaScript (TypeScript) package to validate most all national numbers, with a focus on
VAT, Person and Tax identifiers.

## Quick start

    import { stdnum } from 'stdnum';

    const { isValid } = stdnum.BR.cpf.validate('xyzzy');

    // isValid is false

All country validators are in the "namespace" of the ISO country code.

## Supported Countries and Numbers

| Country                | Code | Name         | Group              | Meaning                                                                             |
| ---------------------- | ---- | ------------ | ------------------ | ----------------------------------------------------------------------------------- |
| Albania                | AL   | NIPT         | Vat                | Vat Identifier (Numri i Identifikimit për Personin e Tatueshëm)                     |
| Andorra                | AD   | NRT          | Tax                | Tax Identifier (Número de Registre Tributari)                                       |
| Argentina              | AR   | CBU          | Bank               | Bank Account (Clave Bancaria Uniforme)                                              |
| Argentina              | AR   | CUIT         | Tax                | Tax Identity (Código Único de Identificación Tributaria)                            |
| Argentina              | AR   | DNI          | Person             | National Identity (Documento Nacional de Identidad)                                 |
| Austria                | AT   | Businessid   | Company            | Austrian Company Register Numbers                                                   |
| Austria                | AT   | TIN          | Tax                | Austrian tax identification number (Abgabenkontonummer)                             |
| Austria                | AT   | UID          | VAT                | Austrian VAT number (Umsatzsteuer-Identifikationsnummer)                            |
| Austria                | AT   | VNR          | Person             | Austrian social security number(Versicherungsnummer)                                |
| Australia              | AU   | ABN          | Company            | Australian Business Number                                                          |
| Australia              | AU   | ACN          | Company            | Australian Company Number                                                           |
| Australia              | AU   | TFN          | Tax/Person/Company | Australian Tax File Number                                                          |
| Bosnia and Herzegovina | BA   | JMBG         | Person             | Unique Master Citizen Number                                                        |
| Belize                 | BZ   | TIN          | Person/Company     | Brazilian Tax ID ()                                                                 |
| Belgium                | BE   | VAT          | Company            | Belgian Enterprise Number                                                           |
| Bulgaria               | BG   | EGN          | Person             | ЕГН, Единен граждански номер, Bulgarian personal identity codes                     |
| Bulgaria               | BG   | PNF          | Person             | PNF (ЛНЧ, Личен номер на чужденец, Bulgarian number of a foreigner).                |
| Bulgaria               | BG   | VAT          | Company            | Идентификационен номер по ДДС, Bulgarian VAT number                                 |
| Brazil                 | BR   | CPF          | Person             | Brazilian identity number (Cadastro de Pessoas Físicas)                             |
| Brazil                 | BR   | CNPJ         | Company            | Brazilian company number (Cadastro Nacional da Pessoa Jurídica)                     |
| Belarus                | BY   | UNP          | Person/Company     | Учетный номер плательщика, the Belarus VAT number                                   |
| Canada                 | CA   | BN           | Company            | Company Identifier (Canadian Business Number)                                       |
| Canada                 | CA   | SIN          | Person             | Person Identifier (Social Insurance Number)                                         |
| Cuba                   | CU   | NI           | Person             | Número de identidad, Cuban identity card numbers                                    |
| Cyprus                 | CY   | VAT          | Company            | Αριθμός Εγγραφής Φ.Π.Α. (Cypriot VAT number)                                        |
| Czech Republic         | CZ   | DIC          | Company            | Daňové identifikační číslo, Czech VAT number                                        |
| Czech Republic         | CZ   | RC           | Person             | Rodné číslo, the Czech birth number                                                 |
| Swisserland            | CH   | SSN          | Person             | Swiss social security number ("Sozialversicherungsnummer")                          |
| Swisserland            | CH   | UID          | Company            | Unternehmens-Identifikationsnummer, Swiss business identifier                       |
| Swisserland            | CH   | VAT          | Company            | Mehrwertsteuernummer, the Swiss VAT number                                          |
| Chile                  | CL   | RUT          | Tax                | Tax Identifier (Rol Unico Tributario) [RUN]                                         |
| China                  | CN   | RIC          | Person             | Person Identifier (Chinese Resident Identity Card Number)                           |
| China                  | CN   | USCC         | Company            | Company Identifier (Unified Social Credit Code, 统一社会信用代码, China tax number) |
| Columbia               | CO   | NIT          | Tax                | Tax Identifier (Número de Identificación Tributaria)                                |
| Costa Rica             | CR   | CPF          | Person             | Person Identifier (Cédula de Persona Física)                                        |
| Costa Rica             | CR   | CPJ          | Company            | Company Identifier (Cédula de Persona Jurídica)                                     |
| Costa Rica             | CR   | CR           | Person             | Person Identifier (Cédula de Residencia)                                            |
| Germany                | DE   | IDNR         | Person             | Steuerliche Identifikationsnummer, German personal tax number                       |
| Germany                | DE   | STNR         | Company            | Steuernummer, German tax number                                                     |
| Germany                | DE   | VAT          | Company            | Vat identifier                                                                      |
| Denmark                | DK   | VAT          | Company            | Momsregistreringsnummer, Danish VAT number                                          |
| Dominican Republic     | DO   | CEDULA       | Person             | Person Identifier (Cédula de Residencia)                                            |
| Dominican Republic     | DO   | NCF          | Vat                | Tax Receipt Number (Números de Comprobante Fiscal)                                  |
| Dominican Republic     | DO   | RNC          | Tax                | Person Identifier (Registro Nacional del Contribuyente)                             |
| Ecuador                | EC   | CI           | Person             | Ecuadorian person identifier (Cédula de identidad)                                  |
| Estonia                | EE   | IK           | Person             | Isikukood (Estonian Personcal ID number).                                           |
| Estonia                | EE   | KMKR         | Company            | KMKR (Käibemaksukohuslase, Estonian VAT number)                                     |
| Estonia                | EE   | Registrikood | Company            | Registrikood (Estonian organisation registration code)                              |
| Ecuador                | EC   | RUC          | Tax/Vat            | Ecuadorian company tax number (Registro Único de Contribuyentes)                    |
| El Salvador            | SV   | NIT          | Tax                | Tax Identifier (Número de Identificación Tributaria)                                |
| Guatemala              | GT   | CUI          | Person             | Guatemala person (Código Único de Identificación)                                   |
| Guatemala              | GT   | NIT          | Company            | Guatemala company tax number (Número de Identificación Tributaria)                  |
| Finland                | FI   | ALV          | Company            | ALV nro (Arvonlisäveronumero, Finnish VAT number)                                   |
| Finland                | FI   | HETU         | Person             | HETU (Henkilötunnus, Finnish personal identity code)                                |
| Finland                | FI   | YTUNNUS      | Company            | Y-tunnus (Finnish business identifier)                                              |
| France                 | FR   | NIF          | Person             | NIF (Numéro d'Immatriculation Fiscale, French tax identification number)            |
| Great Brittan          | GB   | UTR          | Person             | UTR (United Kingdom Unique Taxpayer Reference)                                      |
| Great Brittan          | GB   | VAT          | Company            | VAT (United Kingdom (and Isle of Man) VAT registration number)                      |
| Greece                 | GR   | AMKA         | Company            | AMKA (Αριθμός Μητρώου Κοινωνικής Ασφάλισης, Greek social security number)           |
| Greece                 | GR   | VAT          | Company            | FPA, ΦΠΑ, ΑΦΜ (Αριθμός Φορολογικού Μητρώου, the Greek VAT number)                   |
| France                 | FR   | NIR          | Person             | NIR (French personal identification number)                                         |
| France                 | FR   | SIREN        | Company            | SIREN (a French company identification number)                                      |
| France                 | FR   | SIRET        | Company            | SIRET (a French company establishment identification number)                        |
| France                 | FR   | TVA          | Vat                | VAT Identifier                                                                      |
| Croatia                | HR   | OIB          | Person             | Osobni identifikacijski broj, Croatian identification number                        |
| Hong Kong              | HK   | HKID         | Person             | Hong Kong Identity Card                                                             |
| Hungaria               | HU   | ANUM         | Vat                | ANUM (Közösségi adószám, Hungarian VAT number)                                      |
| Iceland                | IS   | KENNITALA    | Person/Company     | Icelandic personal and organisation identity code                                   |
| Iceland                | IS   | VSK          | Vat                | Virðisaukaskattsnúmer, Icelandic VAT number                                         |
| Indonesia              | ID   | NPWP         | Person/Company     | NPWP (Nomor Pokok Wajib Pajak, Indonesian VAT Number).                              |
| Ireland                | IE   | PPS          | Person             | Personal Public Service Number, Irish personal number                               |
| Ireland                | IE   | VAT          | Tax/Vat            | Ireland Value Added Tax ID                                                          |
| India                  | IN   | AADHAAR      | Company            | Indian digital resident personal identity number                                    |
| India                  | IN   | PAN          | Person             | Permanent Account Number, Indian income tax identifier                              |
| Israel                 | IL   | IDNR         | Person             | Identity Number (Mispar Zehut, מספר זהות, Israeli identity number)                  |
| Israel                 | IL   | HR           | Company            | Company Number (מספר חברה, or short ח.פ. Israeli company number)                    |
| Japan                  | JP   | CN           | Company            | 法人番号, hōjin bangō, Japanese Corporate Number                                    |
| South Korea            | KR   | BRN          | Company            | 사업자 등록 번호, South Korea Business Registration Number)                         |
| South Korea            | KR   | RRN          | Person             | South Korean resident registration number                                           |
| Mexico                 | MX   | RFC          | Tax/Vat            | Tax Identifier (Registro Federal de Contribuyentes)                                 |
| Mexico                 | MX   | CURP         | Person             | Individual Identifier (Clave Única de Registro de Población)                        |
| Mexico                 | MX   | CLABE        | Bank               | Bank Account (Clave Bancaria Estandarizada)                                         |
| Malaysia               | MY   | NRIC         | Person             | Malaysian National Registration Identity Card Number                                |
| New Zealand            | NZ   | IRD          | Person/Company     | New Zealand Inland Revenue Department (Te Tari Tāke) number                         |
| Paraguay               | PY   | RUC          | Tax/Vat            | Tax Identifier (Registro Único de Contribuyentes)                                   |
| Peru                   | PE   | CUI          | Person             | Person Identifier (Cédula Única de Identidad)                                       |
| Peru                   | PE   | RUC          | Tax/Vat            | Tax Identifier (Registro Único de Contribuyentes)                                   |
| Peru                   | PE   | CE           | Person             | Person Identifier (Carné de Extranjería)                                            |
| Russia                 | RU   | INN          | Tax/Vat            | Tax Identifier (Идентификационный номер налогоплательщика)                          |
| Singapore              | SG   | UEN          | Company            | Singapore's Unique Entity Number                                                    |
| Thailand               | TH   | IDNR         | Person             | Thai National ID (บัตรประจำตัวประชาชนไทย)                                           |
| Taiwan                 | TW   | UBN          | Company            | Unified Business Number, 統一編號, Taiwanese tax number                             |
| Spain                  | ES   | CIF          | Tax/Vat            | Tax Identifier (Código de Identificación Fiscal)                                    |
| Spain                  | ES   | DNI          | Person             | Identity code (Documento Nacional de Identidad)                                     |
| Spain                  | ES   | NIE          | Person             | Identity code foreigner (Número de Identificación de Extranjero)                    |
| Spain                  | ES   | NIF          | Tax                | Tax Identifier (Número de Identificación Fiscal)                                    |
| Uruguay                | UY   | RUT          | Tax/Vat            | Tax Identifier (Registro Único Tributario)                                          |
| Uruguay                | UY   | CEDULA       | Person             | Person Identifier (Cédula de Residencia)                                            |
| Uruguay                | UY   | NIE          | Person             | ForeignersI identification Number                                                   |
| United States          | US   | EIN          | Tax/Company        | Tax Identifier (Employer Identification Number)                                     |
| United States          | US   | SSN          | Tax/Individual     | Tax Identifier (Social Security Number)                                             |
| Venezuelan             | VE   | RIF          | Vat                | Vat Identifier (Registro de Identificación Fiscal)                                  |
| Vietnam                | VN   | MST          | Company            | Mã số thuế, Vietnam tax number                                                      |
| South Africa           | ZA   | IDNR         | Person             | ID number (South African Identity Document number).                                 |
| South Africa           | ZA   | TIN          | Person/Company     | TIN (South African Tax Identification Number).                                      |

### Examples

TODO -- Usage examples

### Credits

Thanks to [python-stdnum](https://arthurdejong.org/python-stdnum/) for providing the inspiration and
many of the checksum algorithm sources

### References

https://wiki.scn.sap.com/wiki/display/CRM/Country+Tax+Category+check
