import request from "..";
type addCompanies = {
    name: string;
    count: number;
    id?: string;
}
class Companies {

    static PostCompanies(params: addCompanies) {
        return request.post('/api/companies/add', { ...params })
    }
    static GetAllCompanies(params: { PageSize: number, PageIndex: number }) {
        return request.get('/api/companies/get-all', { params });
    }
    static DeleteCompanies(id?: string) {
        return request.delete(`/api/companies/delete/by-id`, {
            data: JSON.stringify(id)
        });
    }
    static UpdateCompanies(params: addCompanies) {
        return request.put(`/api/companies/update`, { ...params });
    }

}

export default Companies