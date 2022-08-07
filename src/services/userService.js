import axios from 'axios';

const fetchList = async () => {
	return await axios.get('https://jsonplaceholder.typicode.com/users');
};

const fetchListPosts = async () => {
	return await axios.get('https://jsonplaceholder.typicode.com/posts');
};

export { fetchList, fetchListPosts };
