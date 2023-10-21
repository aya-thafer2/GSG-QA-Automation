//Conduit Task-1

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
}