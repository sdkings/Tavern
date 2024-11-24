import api from "./axios";

// URL: ://service/api/authors/
export const getAuthors = async () => {
    try {
      const response = await api.get(
        `authors/`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

//URL: ://service/api/authors/{AUTHOR_SERIAL}/
export const getAuthor = async (authorSerial) => {
  try {
    const response = await api.get(
      `authors/${authorSerial}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// URL: ://service/api/get_remote_authors
export const getRemoteAuthors = async () => {
  try {
    const response = await api.get(
      `get_remote_authors/`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};