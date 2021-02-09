import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../../../consts';

const api = axios.create({
	baseURL: API_BASE_URL
});

export const useApi = (): { api: AxiosInstance } => {
	return { api };
};