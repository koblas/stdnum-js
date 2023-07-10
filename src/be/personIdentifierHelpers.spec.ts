import {
  validStructure,
  validChecksum,
  toDateArray,
} from './personIdentifierHelpers';

describe('personIdentifierHelpers', () => {
  const toDob = (string: string): string => {
    const [y, m, d] = toDateArray(string).map(s => parseInt(s, 10));
    return [y, m - 1, d].map(n => `${n}`.padStart(2, '0')).join('');
  };

  describe('validStructure', () => {
    describe('default dob conversion', () => {
      it('returns true for a valid 20th century date', () => {
        expect(validStructure('99012599999')).toEqual(true);
      });

      it('returns true for a potential 21st century date', () => {
        expect(validStructure('01012599999')).toEqual(true);
      });

      it('returns true for an unknown date of birth', () => {
        expect(validStructure('01009999999')).toEqual(true);
      });

      it('returns false for a string that is neither an unknown date of birth or a valid date of birth', () => {
        expect(validStructure('99999999999')).toEqual(false);
      });
    });

    describe('specified dob conversion', () => {
      it('returns true for a valid 20th century date', () => {
        expect(validStructure('991331999999', toDob)).toEqual(true);
      });

      it('returns true for a potential 21st century date', () => {
        expect(validStructure('011331999999', toDob)).toEqual(true);
      });

      it('returns true for an unknown date of birth', () => {
        expect(validStructure('990199999999', toDob)).toEqual(true);
      });

      it('returns false for a string that is neither an unknown date of birth or a valid date of birth', () => {
        expect(validStructure('99999999999', toDob)).toEqual(false);
      });
    });
  });

  describe('validChecksum', () => {
    const range = Array.from({ length: 100 }, (_, n) => n);

    describe('default dob conversion', () => {
      describe('a date of birth valid in the 20th century only', () => {
        const baseString = '990430999';
        const checksum = 14;

        it('returns true when the checksum is valid', () => {
          const string = `${baseString}${checksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const toCheck = range.filter(x => x !== checksum);
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string)).toEqual(false);
          });
        });
      });

      describe('a date of birth valid in the 21st century only', () => {
        const baseString = '000229999'; // 1900 was not a leap year
        const checksum = 17;

        it('returns true when the checksum is valid', () => {
          const string = `${baseString}${checksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const toCheck = range.filter(x => x !== checksum);
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string)).toEqual(false);
          });
        });
      });

      describe('a date of birth valid in either the 20th or 21st century', () => {
        const baseString = '100430999';
        const twentiethCenturyChecksum = 85;
        const twentyfirstCenturyChecksum = 17;

        it('returns true when the checksum is valid for the 20th century', () => {
          const string = `${baseString}${twentiethCenturyChecksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns true when the checksum is valid for the 21th century', () => {
          const string = `${baseString}${twentyfirstCenturyChecksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const excludedChecksums = [
            twentiethCenturyChecksum,
            twentyfirstCenturyChecksum,
          ];
          const toCheck = range.filter(x => !excludedChecksums.includes(x));
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string)).toEqual(false);
          });
        });
      });

      describe('an unknown date of birth', () => {
        const baseString = '100001999';
        const twentiethCenturyChecksum = 54;
        const twentyfirstCenturyChecksum = 83;

        it('returns true when the checksum is valid for the 20th century', () => {
          const string = `${baseString}${twentiethCenturyChecksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns true when the checksum is valid for the 21th century', () => {
          const string = `${baseString}${twentyfirstCenturyChecksum}`;
          expect(validChecksum(string)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const excludedChecksums = [
            twentiethCenturyChecksum,
            twentyfirstCenturyChecksum,
          ];
          const toCheck = range.filter(x => !excludedChecksums.includes(x));
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string)).toEqual(false);
          });
        });
      });
    });

    describe('specified dob conversion', () => {
      describe('a date of birth valid in the 20th century only', () => {
        const baseString = '990631999';
        const checksum = 95;

        it('returns true when the checksum is valid', () => {
          const string = `${baseString}${checksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const toCheck = range.filter(x => x !== checksum);
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string, toDob)).toEqual(false);
          });
        });
      });

      describe('a date of birth valid in the 21st century only', () => {
        const baseString = '000329999'; // 1900 was not a leap year
        const checksum = 24;

        it('returns true when the checksum is valid', () => {
          const string = `${baseString}${checksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const toCheck = range.filter(x => x !== checksum);
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string, toDob)).toEqual(false);
          });
        });
      });

      describe('a date of birth valid in either the 20th or 21st century', () => {
        const baseString = '100430999';
        const twentiethCenturyChecksum = 85;
        const twentyfirstCenturyChecksum = 17;

        it('returns true when the checksum is valid for the 20th century', () => {
          const string = `${baseString}${twentiethCenturyChecksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns true when the checksum is valid for the 21th century', () => {
          const string = `${baseString}${twentyfirstCenturyChecksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const excludedChecksums = [
            twentiethCenturyChecksum,
            twentyfirstCenturyChecksum,
          ];
          const toCheck = range.filter(x => !excludedChecksums.includes(x));
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string, toDob)).toEqual(false);
          });
        });
      });

      describe('an unknown date of birth', () => {
        const baseString = '100101999';
        const twentiethCenturyChecksum = 61;
        const twentyfirstCenturyChecksum = 90;

        it('returns true when the checksum is valid for the 20th century', () => {
          const string = `${baseString}${twentiethCenturyChecksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns true when the checksum is valid for the 21th century', () => {
          const string = `${baseString}${twentyfirstCenturyChecksum}`;
          expect(validChecksum(string, toDob)).toEqual(true);
        });

        it('returns false when the checksum is invalid', () => {
          const excludedChecksums = [
            twentiethCenturyChecksum,
            twentyfirstCenturyChecksum,
          ];
          const toCheck = range.filter(x => !excludedChecksums.includes(x));
          toCheck.forEach(cs => {
            const string = `${baseString}${cs}`;
            expect(validChecksum(string, toDob)).toEqual(false);
          });
        });
      });
    });
  });

  describe('toDateArray', () => {
    it('works with a string of length 6', () => {
      const string = '013150';
      expect(toDateArray(string)).toEqual(['01', '31', '50']);
    });

    it('works with a string of length greater than 6', () => {
      const string = '013150999';
      expect(toDateArray(string)).toEqual(['01', '31', '50']);
    });
  });
});
