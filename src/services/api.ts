import axios from 'axios';

const API_URL = '/api/v1';

export const fetchComments = async () => {
  try {
    const response = await axios.get(`${API_URL}/comment`, {
      params: {
        limit: 10,
      },
    })
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const fetchDesigners = async (params: { page?: number; limit?: number }) => {
  try {
    const response = await axios.get(`${API_URL}/designer`, {
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching designers:', error);
    throw error;
  }
};

export const fetchTasks = async (params?: any) => {
  try {
    const response = await axios.get(`${API_URL}/issue`, {
      params: {
       
        ...params,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
