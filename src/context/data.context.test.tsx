import { getAllAbsences, getAllMembers, getUserNameWithType } from './data.context';

describe('Data context getAllAbsences()', () => {
    const allAbsences = getAllAbsences({});
    const allMembers = getAllMembers();

    it('should get all data from JSON file if there is no filter', () => {
        expect(getAllAbsences({}).length).toBe(42);
    });

    allAbsences.forEach((absences: any) => {
        it(`should get correct title of ${allMembers[absences.userId].name} as per the absence type`, () => {

            expect(absences.title).toBe(getUserNameWithType(allMembers[absences.userId].name, absences.type));

        });
    });

    it('should return data from JSON file which match with user filter', () => {
        expect(getAllAbsences({userId: 5293}).length).toBe(7); 
    });

    it('should return data from JSON file which match with start and end date', () => {
        expect(getAllAbsences({startDate: '2021-01-13', endDate: '2021-02-13'}).length).toBe(3);
    });

    it('should not return data from JSON file which dose not match with any filter', () => {
        expect(getAllAbsences({userId: 223232}).length).toBe(0);
        expect(getAllAbsences({userId: 5293, startDate: '2050-01-01', endDate: '2070-02-01'}).length).toBe(0);
    });

});

describe('Data context getAllMembers()', () => {
    it('should get all data from JSON file', () => {
        expect(Object.keys(getAllMembers()).length).toBe(10);
    });
});