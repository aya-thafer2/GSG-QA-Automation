//Conduit Task-1

import { CreateEmployeePayload } from "../../ConduitAPI-interfaces/payload/userAPIpayload";
import GenericHelper from "../../helpers/Conduit/genericFunctions";

export default class userInit {
    static initUser(): CreateEmployeePayload {
        let EmployeePayload: CreateEmployeePayload = {
            user: {
                username: GenericHelper.genericRandomUsername(),
                email: GenericHelper.genericRandomEmail(),
                password: '123456'
            }
        }
        return EmployeePayload;
    }
}