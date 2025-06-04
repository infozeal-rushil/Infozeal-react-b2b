import { ApiResponse } from '../apiResponseType';

export interface UserMaster {
  intPannelUserID: number;
  strPannelUserDisplayName: string;
  token: string;
}

// export interface LoginResponse {
//   status: string;
//   responseMessage: string;
//   UserMaster: UserMaster[];
// }

export const SignInManager = async (
  UserEmail: string,
  UserPassword: string
): Promise<UserMaster> => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const response = await fetch(`${VITE_BASE_URL}/login/GetPannelUserLogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ UserEmail, UserPassword })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Login failed');
  }

  const responseData: ApiResponse<UserMaster[]> = await response.json();

  if (responseData.status !== 'success' || responseData.data.length === 0) {
    throw new Error(
      responseData.responseMessage || 'Invalid login credentials'
    );
  }

  return responseData.data[0];
};
