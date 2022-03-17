import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/course';
class CourseService {
    save(name, code, capacity, blockId, facultyId) {
        let courseObj = {
                name: name,
                code: code,
                capacity: capacity,
                blockId: blockId,
                facultyId: facultyId
            }
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
    getAllByBlock() {
        return axios.get( API_URL + '/blockCourse', { headers: authHeader() });
    }
}
export default new CourseService();