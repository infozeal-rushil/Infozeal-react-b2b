import { post } from '@src/Axois';

class LoginService {
  async GetPannelUserLogin(UserEmail, UserPassword) {
    try {
      const data = await post('/login/GetPannelUserLogin', {
        UserEmail,
        UserPassword
      });
      if (data.status !== 'success' || !data.data || data.data.length === 0) {
        throw new Error(data.responseMessage || 'Invalid login credentials');
      }
      return data.data[0];
    } catch (error) {
      throw new Error(
        error?.response?.data?.responseMessage ||
          error.message ||
          'Login failed'
      );
    }
  }
}

export default new LoginService();

// import { post } from '@src/Axois';

// export const GetPannelUserLogin = async (UserEmail, UserPassword) => {
//   try {
//     const data = await post('/login/GetPannelUserLogin', {
//       UserEmail,
//       UserPassword
//     });
//     if (data.status !== 'success' || !data.data || data.data.length === 0) {
//       throw new Error(data.responseMessage || 'Invalid login credentials');
//     }
//     return data.data[0];
//   } catch (error) {
//     throw new Error(
//       error?.response?.data?.responseMessage || error.message || 'Login failed'
//     );
//   }
// };
