import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/course';
class CourseService {
    save(name, code, capacity, blockId) {
        let courseObj = {
            name: name,
            code: code,
            capacity: capacity,
            block: {
                id: blockId
            }
        };  
        return axios
            .post(API_URL , JSON.stringify(courseObj), { headers: authHeader() })
            .then(function(res) {
               //TODO
            })
            .catch(function(error) {
                //TODO
            })
    }
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}
export default new CourseService();