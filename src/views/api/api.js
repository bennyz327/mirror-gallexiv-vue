import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/posts/person',
    headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NDQzMDc0NCwiZXhwIjoxNjk0NDMyNTQ0fQ.NwvHy-q-J9ppGCeirZHvuX9A2CRd74EsXdc_MZSXGKo' }
})

export default instance