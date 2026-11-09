# [1.4.0](https://github.com/koblas/stdnum-js/compare/v1.3.8...v1.4.0) (2022-07-06)


### Bug Fixes

* update ad.nrt alpha validation logic ([90879da](https://github.com/koblas/stdnum-js/commit/90879dac7ba52e220ab74a9292bd5c82f6592906))


### Features

* add de.svnr support ([ee03c72](https://github.com/koblas/stdnum-js/commit/ee03c72e62254c488e5ae3f889b1ee8c823b2cc4))

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
