//Practice
const { faker } = require('@faker-js/faker');

export default class genericFunctions {
    static createPayload() {
        const payload = {
            user: {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: "123456"
            }
        }
        return payload;
    }
}