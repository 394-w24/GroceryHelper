const PAT = "58da21198d904a27b939b5845659ab29"; // Auth token
const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

const recognizeImage = async (imageFile) => {
  if (imageFile) {
    const apiUrl = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;
    const base64Image = imageFile.split(",")[1];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Key ${PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                base64: base64Image,
              },
            },
          },
        ],
      }),
    });

    const data = await response.json();
    const { outputs } = data || null;

    if (!outputs) {
      return null;
    }

    const [output] = outputs;
    const { data: outputData } = output;
    const { concepts } = outputData;
    const [food] = concepts;
    const { name } = food;

    return name;
  }
  return null;
};

export default recognizeImage;
