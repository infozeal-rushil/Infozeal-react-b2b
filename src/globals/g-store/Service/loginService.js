import axiosInstance from '@src/Axois';
export const GetPannelUserLogin = async (UserEmail, UserPassword) => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const response = await axiosInstance.post('/login/GetPannelUserLogin', {
      UserEmail,
      UserPassword
    });

    const responseData = response.data;

    if (
      responseData.status !== 'success' ||
      !responseData.data ||
      responseData.data.length === 0
    ) {
      throw new Error(
        responseData.responseMessage || 'Invalid login credentials'
      );
    }

    return responseData.data[0];
  } catch (error) {
    const message =
      error?.response?.data?.responseMessage || error.message || 'Login failed';
    throw new Error(message);
  }
};
