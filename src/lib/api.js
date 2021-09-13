import axios from 'axios';

export const getRecord = payload => axios.get(`http://localhost:5000/record`,{payload},{withCredentials: true});

export const getCategories = id => axios.get(`http://localhost:5000/category`,
{withCredentials: true,}
);

export const removeCategory = id => axios.delete(`http://localhost:5000/category/${id}`, {withCredentials: true});

export const getKakaoUser = code => axios.get(`http://localhost:5000/oauth?code=${code}`,  {
    withCredentials: true,
  });

export const addCategory = (text,type) => axios.post('http://localhost:5000/category',{
  text,type
},{withCredentials: true});

export const addRecord = (income,expense, date) => axios.post('http://localhost:5000/record',{
  income, expense, date
},{withCredentials: true})