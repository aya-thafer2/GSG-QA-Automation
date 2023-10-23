//Conduit Task-1

export interface CreateEmployeeResponse {
    user: {
        username: string,
        email: string,
        bio: string,
        image: string,
        token: string
    }
}