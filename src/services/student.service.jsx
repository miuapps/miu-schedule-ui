import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/student';
class StudentService {
    registerCourse(userId, courseId) {
        console.log(courseId);
        return axios
            .get(API_URL + '/registerCourse?userId=' + userId + '&courseId=' + courseId , { headers: authHeader() })
    }
    getSchedule(studentId) {
        return axios.get(API_URL + '/schedule?studentId=' + studentId, { headers: authHeader() });
    }
}
export default new StudentService();