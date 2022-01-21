import axios from "axios";

const authKey = "1a26ff76-50ad-4e6d-bed1-32a998babf07";
const apiUrl = "https://api-translate.systran.net";

const createUrl = (path) => `${apiUrl}${path}/?key=${authKey}`;

export const getVersion = async () => {
  try {
    const response = await axios(createUrl("/translation/apiVersion"));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSupportedLang = async () => {
  try {
    const response = await axios(createUrl("/translation/supportedLanguages"));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const translateText = async (inputText, sourceLang, targetLang) => {
  try {
    const response = await axios.post(
      createUrl("/translation/text/translate"),
      {
        input: inputText,
        source: sourceLang,
        target: targetLang,
      }
    );
    console.log(response);
    return response.data.outputs;
  } catch (error) {
    console.log(error);
  }
};
