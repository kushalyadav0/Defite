import { api } from '../api/axios';

export const uploadImage = async (
  file
) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await api.post(
    '/upload',
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data',
      },
    }
  );
  console.log(response.data);
  return response.data.data;
};