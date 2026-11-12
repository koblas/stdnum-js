# [1.4.0](https://github.com/koblas/stdnum-js/compare/v1.3.8...v1.4.0) (2022-07-06)


### Bug Fixes

* update ad.nrt alpha validation logic ([90879da](https://github.com/koblas/stdnum-js/commit/90879dac7ba52e220ab74a9292bd5c82f6592906))


### Features

* add de.svnr support ([ee03c72](https://github.com/koblas/stdnum-js/commit/ee03c72e62254c488e5ae3f889b1ee8c823b2cc4))

## [1.17.1](https://github.com/koblas/stdnum-js/compare/v1.17.0...v1.17.1) (2026-11-12)


### Bug Fixes

* **in/pan:** set isIndividual from the PAN holder type ([#260](https://github.com/koblas/stdnum-js/issues/260)) ([c952ab2](https://github.com/koblas/stdnum-js/commit/c952ab288d30554090a827bddae3237b362192ae))

## [1.17.0](https://github.com/koblas/stdnum-js/compare/v1.16.0...v1.17.0) (2026-11-11)


### Features

* add examples and format patterns to validators ([#108](https://github.com/koblas/stdnum-js/issues/108)) ([#258](https://github.com/koblas/stdnum-js/issues/258)) ([3598e84](https://github.com/koblas/stdnum-js/commit/3598e84f3cbda37ca678b7676bc3cf213c2ed1cd))
* add validateVat ([#50](https://github.com/koblas/stdnum-js/issues/50)) ([#257](https://github.com/koblas/stdnum-js/issues/257)) ([22318d9](https://github.com/koblas/stdnum-js/commit/22318d98b076d3a183e2750dcbc0f19367eae68b))


### Bug Fixes

* **kr/rrn:** skip the check digit for alien registration numbers ([#256](https://github.com/koblas/stdnum-js/issues/256)) ([791779a](https://github.com/koblas/stdnum-js/commit/791779a0f8e8cf3093fe6591d11e4dec8b59646f))

## [1.16.0](https://github.com/koblas/stdnum-js/compare/v1.15.0...v1.16.0) (2026-11-10)


### Features

* **az/tin:** verify the VÖEN check digit ([#213](https://github.com/koblas/stdnum-js/issues/213)) ([8b42a39](https://github.com/koblas/stdnum-js/commit/8b42a39e8131992283b37cb2ba223d2b194f6661))
* **id/nik:** add Indonesian NIK validator ([5118e0e](https://github.com/koblas/stdnum-js/commit/5118e0e1298edc6ea93d16209523a016ca4804f7))
* **passport:** add passport number validators ([#175](https://github.com/koblas/stdnum-js/issues/175)) ([d246e0b](https://github.com/koblas/stdnum-js/commit/d246e0b93547748c0abcbcffbcd3d6046fde5a11))


### Bug Fixes

* **ad/nrt:** require A and L numbers to be in 700000-799999 ([#216](https://github.com/koblas/stdnum-js/issues/216)) ([69028e0](https://github.com/koblas/stdnum-js/commit/69028e0ee7d193ca2e8f6e187169db680d97ed7f))
* **at/vnr:** accept overflow dates and reject a leading 0 ([#248](https://github.com/koblas/stdnum-js/issues/248)) ([1731fcb](https://github.com/koblas/stdnum-js/commit/1731fcbd093f7939a78accfc088739242d0865e4))
* **az/tin:** restore a dropped leading zero on 9-digit numbers ([#226](https://github.com/koblas/stdnum-js/issues/226)) ([27372a1](https://github.com/koblas/stdnum-js/commit/27372a1c8835db907d79d7782dba02bb98c86570))
* **be/nn:** accept day 00 for an unknown day of birth ([#229](https://github.com/koblas/stdnum-js/issues/229)) ([0245556](https://github.com/koblas/stdnum-js/commit/02455563001c6bc161c1c7873727b54d883b62ba))
* **be/nn:** reject the BIS month offsets ([#228](https://github.com/koblas/stdnum-js/issues/228)) ([6ee3a65](https://github.com/koblas/stdnum-js/commit/6ee3a658ba16aeb2274b319a2d2a0250dd2d17bb))
* **be/vat:** require enterprise numbers to start with 0 or 1 ([#212](https://github.com/koblas/stdnum-js/issues/212)) ([8d1156e](https://github.com/koblas/stdnum-js/commit/8d1156ea91a3e59235e67db618a780ea4a8a58b5))
* **by/unp:** accept Cyrillic letters ([#237](https://github.com/koblas/stdnum-js/issues/237)) ([8e1db0f](https://github.com/koblas/stdnum-js/commit/8e1db0f7f566de5b85ed8b1f0517913759fe5896))
* **by/unp:** check the first two characters as python-stdnum does ([#235](https://github.com/koblas/stdnum-js/issues/235)) ([052b618](https://github.com/koblas/stdnum-js/commit/052b61897f5af55a14783e1df4939a698e4464ac))
* **ca/sin:** reject numbers starting with 0 or 8 ([#211](https://github.com/koblas/stdnum-js/issues/211)) ([69d35f7](https://github.com/koblas/stdnum-js/commit/69d35f72d039cd249a3316b734db538cf0981311))
* **ch/uid:** accept numbers without the CHE prefix ([#238](https://github.com/koblas/stdnum-js/issues/238)) ([1a7d3b4](https://github.com/koblas/stdnum-js/commit/1a7d3b4d6ca7b38b8debf60b224d8c0ae2cb5df4))
* **cn/ric:** check the province code ([#233](https://github.com/koblas/stdnum-js/issues/233)) ([e2eee80](https://github.com/koblas/stdnum-js/commit/e2eee80344af93af05e22f0522820a56b9b9456f))
* **cr/cr:** accept 11-digit numbers ([#224](https://github.com/koblas/stdnum-js/issues/224)) ([8750b22](https://github.com/koblas/stdnum-js/commit/8750b2218ba7dcce50dfc72e5916d8fa678fabf9))
* **cy/vat:** reject numbers starting with 12 ([#251](https://github.com/koblas/stdnum-js/issues/251)) ([410deb2](https://github.com/koblas/stdnum-js/commit/410deb2b8a82812ff59d00aff978565658009df3))
* **cz/rc:** accept 9-digit numbers from 1880 ([#242](https://github.com/koblas/stdnum-js/issues/242)) ([b1aa9d7](https://github.com/koblas/stdnum-js/commit/b1aa9d7fd70b54392bf729dc535a465d3d96b5a6))
* **de/stnr:** drop the IdNr digit-repetition rule ([#223](https://github.com/koblas/stdnum-js/issues/223)) ([79f38ac](https://github.com/koblas/stdnum-js/commit/79f38aca67c6c9cc3a24c10a86793cf9d5267ad5))
* **de/vat:** reject numbers starting with 0 ([#246](https://github.com/koblas/stdnum-js/issues/246)) ([87c5c00](https://github.com/koblas/stdnum-js/commit/87c5c00519e1780c6b161a21326564a0a9cfd719))
* **do/cedula:** accept numbers issued with a non-matching check digit ([#221](https://github.com/koblas/stdnum-js/issues/221)) ([d4cdd3e](https://github.com/koblas/stdnum-js/commit/d4cdd3ec243241a70a9c563e8ced885d2e977518))
* **do/ncf:** accept 19-digit NCFs starting with A or P ([#217](https://github.com/koblas/stdnum-js/issues/217)) ([dd82725](https://github.com/koblas/stdnum-js/commit/dd82725c90f7c027303032b1968cb7605771d184))
* **do/rnc:** accept numbers issued with a non-matching check digit ([#222](https://github.com/koblas/stdnum-js/issues/222)) ([806ec3a](https://github.com/koblas/stdnum-js/commit/806ec3afe9aa1725002f6ea36732715bccb94d84))
* **ee/ik:** check the birth date ([#230](https://github.com/koblas/stdnum-js/issues/230)) ([26462ae](https://github.com/koblas/stdnum-js/commit/26462ae95020d26616902f4a9d5c6191de5bb669))
* **es/nif:** require digits in K, L and M numbers ([#244](https://github.com/koblas/stdnum-js/issues/244)) ([57f98e8](https://github.com/koblas/stdnum-js/commit/57f98e8e59f6f3348ebeab240854b6c1620d03fa))
* **fi/hetu:** reject individual numbers 000 and 001 ([#227](https://github.com/koblas/stdnum-js/issues/227)) ([b32f4e6](https://github.com/koblas/stdnum-js/commit/b32f4e6e7023a41352f325498959509d3bc99e2d))
* **fr/siret:** accept dots as separators ([#239](https://github.com/koblas/stdnum-js/issues/239)) ([5aa97d4](https://github.com/koblas/stdnum-js/commit/5aa97d4f3aca59aebcec3acd088fa567e9662901))
* **gb/vat:** reject unknown prefixes on 5-character numbers ([#232](https://github.com/koblas/stdnum-js/issues/232)) ([2a6fea6](https://github.com/koblas/stdnum-js/commit/2a6fea635046e865b13c0a3f44a653da1839372c))
* **gh/tin:** reject letters in the digits ([#253](https://github.com/koblas/stdnum-js/issues/253)) ([08cfd61](https://github.com/koblas/stdnum-js/commit/08cfd61911fdb49c3c267505b20789f8d538d258))
* **id/npwp:** accept 16-digit NPWP numbers ([5118e0e](https://github.com/koblas/stdnum-js/commit/5118e0e1298edc6ea93d16209523a016ca4804f7))
* **id/npwp:** stop rejecting numbers with unlisted entity prefixes ([#218](https://github.com/koblas/stdnum-js/issues/218)) ([763b40b](https://github.com/koblas/stdnum-js/commit/763b40b498bad01b7fb484282c7d6cefb3bc6ff8))
* **is/kennitala:** require century digit 9 or 0 ([#252](https://github.com/koblas/stdnum-js/issues/252)) ([bc1c05d](https://github.com/koblas/stdnum-js/commit/bc1c05de22945fc4629505d1b9d97e9ab688c531))
* **it/aic:** require the BASE10 form to start with 0 ([#236](https://github.com/koblas/stdnum-js/issues/236)) ([3f5a7bf](https://github.com/koblas/stdnum-js/commit/3f5a7bf3f3e77a84effacca42e94ceb76f6fd2f8))
* **it/codicefiscale:** accept the 11-digit form for non-individuals ([#225](https://github.com/koblas/stdnum-js/issues/225)) ([d3bf840](https://github.com/koblas/stdnum-js/commit/d3bf8405c71b60c2d8ca0c914a308299e6a44aec))
* **it/codicefiscale:** check the birth date ([#231](https://github.com/koblas/stdnum-js/issues/231)) ([2baae42](https://github.com/koblas/stdnum-js/commit/2baae4272e48f68e358382f3473df1e052fe5dae))
* **mt/vat:** reject numbers starting with 0 ([#245](https://github.com/koblas/stdnum-js/issues/245)) ([b9e3a61](https://github.com/koblas/stdnum-js/commit/b9e3a61b92672c192415e8f48577e2d7fa76f18d))
* **mu/nid:** check the birth date ([#234](https://github.com/koblas/stdnum-js/issues/234)) ([a3fa014](https://github.com/koblas/stdnum-js/commit/a3fa014ccab3cf060c37a7309e4e92b85dcce165))
* **my/nric:** reject birth place code 70 ([#250](https://github.com/koblas/stdnum-js/issues/250)) ([cc0f8e8](https://github.com/koblas/stdnum-js/commit/cc0f8e868a09d1812e9d0f0e7550d0e20cd3b41a))
* **nl/btw:** reject an all-zero number or suffix ([#249](https://github.com/koblas/stdnum-js/issues/249)) ([156903e](https://github.com/koblas/stdnum-js/commit/156903e09ea550a7cd4cd5d513b4c654e10345f0))
* **nz/bank:** accept more separator layouts ([#240](https://github.com/koblas/stdnum-js/issues/240)) ([6885963](https://github.com/koblas/stdnum-js/commit/68859636b4aeaa2366942e62a6f1fb237b0dbd84))
* **nz/bank:** add branches from the current Payments NZ register ([#241](https://github.com/koblas/stdnum-js/issues/241)) ([4b592d9](https://github.com/koblas/stdnum-js/commit/4b592d97d8a6714799e015c904164856450fa0b3))
* **nz/ird:** reject numbers outside the issued range ([#254](https://github.com/koblas/stdnum-js/issues/254)) ([5fa5001](https://github.com/koblas/stdnum-js/commit/5fa5001427a8325855dfbfad9bf1157e17c2c11b))
* **si/ddv:** reject a leading 0 and check value 11 ([#247](https://github.com/koblas/stdnum-js/issues/247)) ([5dd20ea](https://github.com/koblas/stdnum-js/commit/5dd20ea0096b18a3a0e4ff5cb0beeebe08cf62f2))
* **sk/dph:** check the third digit, not the first ([#255](https://github.com/koblas/stdnum-js/issues/255)) ([ffd3692](https://github.com/koblas/stdnum-js/commit/ffd3692328e34c5fe90ca3814f8abd9050fc60cb))
* **uy/rut:** accept registration prefix 22 ([#210](https://github.com/koblas/stdnum-js/issues/210)) ([16818a3](https://github.com/koblas/stdnum-js/commit/16818a3f3438902a88e9c78155d88984f11a47cd))

## [1.15.0](https://github.com/koblas/stdnum-js/compare/v1.14.0...v1.15.0) (2026-11-08)


### Features

* add Bosnia and Herzegovina JIB/VAT and Bahrain VAT validators ([#208](https://github.com/koblas/stdnum-js/issues/208)) ([b9b3554](https://github.com/koblas/stdnum-js/commit/b9b35546662becc5e4531b2b5c34f83ba052b474)), closes [#15](https://github.com/koblas/stdnum-js/issues/15)
* add tax number validators for 10 countries ([#206](https://github.com/koblas/stdnum-js/issues/206)) ([230465d](https://github.com/koblas/stdnum-js/commit/230465d97a98daf0505ec5d4206b279f2ab5b702)), closes [#15](https://github.com/koblas/stdnum-js/issues/15)
* **am/tin:** verify the check digit ([#207](https://github.com/koblas/stdnum-js/issues/207)) ([56a1a12](https://github.com/koblas/stdnum-js/commit/56a1a1209cf5221ebd143066f51180933b642bcb)), closes [#15](https://github.com/koblas/stdnum-js/issues/15)
* **sc/tin:** verify the checksum ([#209](https://github.com/koblas/stdnum-js/issues/209)) ([4dc94d9](https://github.com/koblas/stdnum-js/commit/4dc94d93d2d892554c15bfb9127d948e0fb61aac)), closes [#15](https://github.com/koblas/stdnum-js/issues/15)
* **se/personnummer:** return the 12 digit form from compact() ([#205](https://github.com/koblas/stdnum-js/issues/205)) ([d7501a9](https://github.com/koblas/stdnum-js/commit/d7501a9046e201e52b62519271283cdec5bafa5c)), closes [#113](https://github.com/koblas/stdnum-js/issues/113) [#117](https://github.com/koblas/stdnum-js/issues/117)


### Bug Fixes

* **es/dni:** verify the check letter of K, L and M numbers ([#200](https://github.com/koblas/stdnum-js/issues/200)) ([becf45b](https://github.com/koblas/stdnum-js/commit/becf45bbb6813cee27a12393cc03f946aec20ef4)), closes [#51](https://github.com/koblas/stdnum-js/issues/51)
* **kr/rrn:** accept random-suffix numbers issued since October 2020 ([#202](https://github.com/koblas/stdnum-js/issues/202)) ([7170a29](https://github.com/koblas/stdnum-js/commit/7170a29cfe62bb861fca6f4e94c09c72e47f38c1)), closes [#134](https://github.com/koblas/stdnum-js/issues/134)

## [1.14.0](https://github.com/koblas/stdnum-js/compare/v1.13.1...v1.14.0) (2026-11-08)


### Features

* **ro/onrc:** support the new 14-character format ([#174](https://github.com/koblas/stdnum-js/issues/174)) ([17b932c](https://github.com/koblas/stdnum-js/commit/17b932cfe3529d44839762eb2308b2a1709c96f9))


### Bug Fixes

* **bg/vat:** accept 9-digit numbers whatever their first digit ([#172](https://github.com/koblas/stdnum-js/issues/172)) ([e8bfce7](https://github.com/koblas/stdnum-js/commit/e8bfce760e895c69a7b898356f67f0b50af8312a))
* **bg/vat:** check only the length of 10-digit numbers ([#173](https://github.com/koblas/stdnum-js/issues/173)) ([6b44eea](https://github.com/koblas/stdnum-js/commit/6b44eeaad041c78cbac5aaf4be2597f673087eb5))
* **cz/dic:** correct special 9-digit DIC check to match python-stdnum ([fd76d7e](https://github.com/koblas/stdnum-js/commit/fd76d7e93f2da5fbe8a3f46f9cb90b39e8669939)), closes [#164](https://github.com/koblas/stdnum-js/issues/164)
* **cz/dic:** correct special 9-digit DIC check to match python-stdnum (fixes [#164](https://github.com/koblas/stdnum-js/issues/164)) ([#169](https://github.com/koblas/stdnum-js/issues/169)) ([fd76d7e](https://github.com/koblas/stdnum-js/commit/fd76d7e93f2da5fbe8a3f46f9cb90b39e8669939))
* **dk/cvr:** reject numbers that start with 0 ([#171](https://github.com/koblas/stdnum-js/issues/171)) ([bc6e027](https://github.com/koblas/stdnum-js/commit/bc6e027fe84edb5abf343378066ad9178194e7cc))
* **ec/ruc:** do not enforce mod-11 check digit on company RUCs ([#168](https://github.com/koblas/stdnum-js/issues/168)) ([8ac9250](https://github.com/koblas/stdnum-js/commit/8ac9250825aafafe33b631ea59fa17d5adc68bb3))
* **lv/pvn:** accept personal codes without a birth date ([#198](https://github.com/koblas/stdnum-js/issues/198)) ([c2c87f2](https://github.com/koblas/stdnum-js/commit/c2c87f23f5724e9800514cb1be696da164d26604)), closes [#178](https://github.com/koblas/stdnum-js/issues/178)
* **mx/rfc:** do not enforce check digit, matching python-stdnum default ([fbb2ce4](https://github.com/koblas/stdnum-js/commit/fbb2ce4bad0885b8c756cc0e2d212a3efc75b22e))
* **mx/rfc:** do not enforce check digit, matching python-stdnum default behavior ([#163](https://github.com/koblas/stdnum-js/issues/163)) ([fbb2ce4](https://github.com/koblas/stdnum-js/commit/fbb2ce4bad0885b8c756cc0e2d212a3efc75b22e))
* **pe/cui:** allow a letter as the optional check digit ([#162](https://github.com/koblas/stdnum-js/issues/162)) ([725d57d](https://github.com/koblas/stdnum-js/commit/725d57dfe3eb1565c9fad402e340778a228216a7))
* **ro/cnp:** accept county codes 70 and 80-83 to match python-stdnum ([#170](https://github.com/koblas/stdnum-js/issues/170)) ([68bc26c](https://github.com/koblas/stdnum-js/commit/68bc26c2a58ff8843f66fa25e81abb6916f49d5c))

## [1.13.1](https://github.com/koblas/stdnum-js/compare/v1.13.0...v1.13.1) (2026-11-08)


### Bug Fixes

* **de/idnr:** enforce the repeated-digit rule ([#193](https://github.com/koblas/stdnum-js/issues/193)) ([51382ad](https://github.com/koblas/stdnum-js/commit/51382ad9d80b860a68a5a08703ec42780a318713)), closes [#177](https://github.com/koblas/stdnum-js/issues/177)
* **fr/siret, ec/ruc, be/nn, be/bis:** align checks with python-stdnum ([#196](https://github.com/koblas/stdnum-js/issues/196)) ([0614346](https://github.com/koblas/stdnum-js/commit/0614346e361203d0b55342e9a1f833e4582a33d1))
* include Anguilla (AI) in the stdnum object ([#192](https://github.com/koblas/stdnum-js/issues/192)) ([fa732ea](https://github.com/koblas/stdnum-js/commit/fa732eaaf77dffd9e758e9334c20a364eb4360b4))
* **py/ruc, cn/uscc, mu/nid:** accept check digit 0 ([#194](https://github.com/koblas/stdnum-js/issues/194)) ([c46afca](https://github.com/koblas/stdnum-js/commit/c46afca8179e7f29e59f52a2dc2afbfeffb681d7))

## [1.13.0](https://github.com/koblas/stdnum-js/compare/v1.12.6...v1.13.0) (2026-11-08)


### Features

* add exports map, sideEffects flag, and named country exports for tree-shaking ([#190](https://github.com/koblas/stdnum-js/issues/190)) ([a618bd6](https://github.com/koblas/stdnum-js/commit/a618bd65b02eef5cb94c9c95ed1cc62cad1176dc))

## [1.3.8](https://github.com/koblas/stdnum-js/compare/v1.3.7...v1.3.8) (2022-06-01)


### Bug Fixes

* fixed peru RUC checksum logic and added '16' in the first two digits allow list ([d0d5c89](https://github.com/koblas/stdnum-js/commit/d0d5c89c060d33f7918c9a7070b45412c4091edc))

## [1.3.7](https://github.com/koblas/stdnum-js/compare/v1.3.6...v1.3.7) (2022-05-18)


### Bug Fixes

* **ch_uid:** fix checksum for ch/uid ([2c3477c](https://github.com/koblas/stdnum-js/commit/2c3477c42e19e21378f5f887b306fed79b074aaa))

## [1.3.6](https://github.com/koblas/stdnum-js/compare/v1.3.5...v1.3.6) (2022-05-04)


### Bug Fixes

* **de_stnr:** disable STNR checksum checking ([726e7ac](https://github.com/koblas/stdnum-js/commit/726e7ac5df26e32709e6bdccdd63be696306cc80))

## [1.3.5](https://github.com/koblas/stdnum-js/compare/v1.3.4...v1.3.5) (2022-03-16)


### Bug Fixes

* **uy:** fix checksum for RUT in Uruguay ([72463d8](https://github.com/koblas/stdnum-js/commit/72463d867fe655f96381632dace3f88184c3ee74))

## [1.3.4](https://github.com/koblas/stdnum-js/compare/v1.3.3...v1.3.4) (2022-03-10)


### Bug Fixes

* **notes:** release notes update ([28f22bd](https://github.com/koblas/stdnum-js/commit/28f22bd77fb00f0b7dd61d84d0b7bfd457c7dce4))
