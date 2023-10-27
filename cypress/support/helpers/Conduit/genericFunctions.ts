
const { faker } = require('@faker-js/faker');

export default class GenericHelper{
    static genericRandomUsername(){
        return faker.internet.userName();
    }
    static genericRandomFirstName(){
        return faker.person.firstName();
    }
    static genericRandomMiddleName(){
        return faker.person.middleName();
    }
    static genericRandomLastName(){
        return faker.person.lastName();
    }
    static genericRandomEmail(){
        return  faker.internet.email();
    }
    static genericRandomNumber100(){
        const random4DigitNumber = faker.number.int({ min: 100, max: 999 });
        return random4DigitNumber;
    }
    static genericRandomNumber10000(){
        const random4DigitNumber = faker.number.int({ min: 1000, max: 9999 });
        return random4DigitNumber;
    }
}