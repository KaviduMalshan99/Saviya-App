
import axios from 'axios';

const API_URL = 'http://192.168.8.110:3000';


export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data; // Ensure that the error object has a data property
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log('Login API response:', response.data); // Log full response to check data
        return response.data; // Return response data
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Network error';
        console.error('Login error:', errorMessage);
        throw { message: errorMessage }; 
    }
};

export const getCoursesByCategory = async (slug) => {
  try {
      const response = await axios.get(`${API_URL}/api/courses/category/${slug}`);
      return response.data; // Return the list of courses
  } catch (error) {
      console.error('Error fetching courses:', error.response ? error.response.data : error.message);
      const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Network or server error';
      throw { message: errorMessage };
  }
};



export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};


export const getCourseSections = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/api/courses/${courseId}/sections`);
    console.log(`Fetched sections for courseId ${courseId}:`, response.data); // Log to check the data
    return response.data; // This will return the sorted sections based on order
  } catch (error) {
    console.error('Error fetching course sections:', error);
    throw error;
  }
};


export const getSubSectionsBySectionId = async (sectionId) => {
  try {
    const response = await axios.get(`${API_URL}/api/sections/${sectionId}/contents`);
    console.log(`Fetched contents for sectionId ${sectionId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching subsections:', error);
    throw error;
  }
};


export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const updateUserDetails = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

  

  