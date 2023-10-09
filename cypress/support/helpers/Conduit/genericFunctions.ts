const { faker } = require('@faker-js/faker');

export default class GenericHelper{
    static genericRandomUsername(){
        return faker.internet.userName();
    }
    static genericRandomEmail(){
        return  faker.internet.email();
    }
}