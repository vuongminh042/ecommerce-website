import axios from 'axios';

const UploadCloundinary = async (file: any) => {
  try {
    const cloundName = 'dbjkk9wg0';
    const presetName = 'project-tot-nghiep';
    const folderName = 'du-an-tot-nghiep';
    const url = `https://api.cloudinary.com/v1_1/${cloundName}/upload`;

    const formData = new FormData();

    formData.append('upload_preset', presetName);
    formData.append('folder', folderName);
    formData.append('file', file ?? null);

    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default UploadCloundinary;
