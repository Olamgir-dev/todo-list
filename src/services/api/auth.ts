import request from ".."
type FieldType = {
    login: string;
    password: string;
    fullName?: string;
};


class Auth {
    static SignUp(params?: FieldType | any) {
        return request.post('/api/auths/sign-up', { ...params })
    }
    static SignIn(params: FieldType | any) {
        return request.post('/api/auths/sign-in', { ...params })
    }
    static UserInfo() {
        return request.get('/api/auths/get-info')
    }
}
export default Auth