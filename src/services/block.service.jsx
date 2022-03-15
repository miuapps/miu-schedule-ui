import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/block';
class BlockService {
    save(name, startDate, endDate) {
        let blockObj = {
            name: name,
            startDate: startDate,
            endDate: endDate
        };  
        return axios
            .post(API_URL , JSON.stringify(blockObj), { headers: authHeader() })
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
export default new BlockService();