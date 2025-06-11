import { post } from '@src/Axois';

export const AddClientConfigure = async payload => {
  try {
    const data = await post('/ClientUserDBControl/AddClientConfigure', payload);
    if (data.status !== 'success' || !data.data) {
      throw new Error(
        data.responseMessage || 'Failed to add client configuration'
      );
    }
    return data.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.responseMessage ||
        error.message ||
        'Add client configuration failed'
    );
  }
};
