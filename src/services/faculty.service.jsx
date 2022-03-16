import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/faculty';
class FacultyService {
    getCourses(facultyId) {
        return axios
            .get(API_URL + "/courses?facultyId=" + facultyId, { headers: authHeader() });
    }
    getFaculties() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}
export default new FacultyService();