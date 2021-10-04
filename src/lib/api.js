import axios from 'axios';
axios.defaults.withCredentials = true
export const getRecord = payload => axios.get(`http://localhost:5000/record`, {params: payload});

export const getCategories = id => axios.get(`http://localhost:5000/category`,
{withCredentials: true,}
);

export const removeCategory = id => axios.delete(`http://localhost:5000/category/${id}`);

export const getKakaoUser = code => axios.get(`http://localhost:5000/oauth?code=${code}`);

export const addCategory = (text,type) => axios.post('http://localhost:5000/category',{
  text,type
});

export const addRecord = (income,expense, date) => axios.post('http://localhost:5000/record',{
  income, expense, date
})

export const getRecordById = id => axios.get(`http://localhost:5000/record/${id}`);

export const deleteRecordById = id => axios.delete(`http://localhost:5000/record/${id}`)