import axiosInstance from './axiosConfig';

// Example API calls for cars/products

export const getAll = async () => {
  try {
    const response = await axiosInstance.get('/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car ${id}:`, error);
    throw error;
  }
};

export const create = async (carData) => {
  try {
    const response = await axiosInstance.post('/cars', carData);
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

export const update = async (id, carData) => {
  try {
    const response = await axiosInstance.put(`/cars/${id}`, carData);
    return response.data;
  } catch (error) {
    console.error(`Error updating car ${id}:`, error);
    throw error;
  }
};

export const delete_ = async (id) => {
  try {
    const response = await axiosInstance.delete(`/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting car ${id}:`, error);
    throw error;
  }
};
