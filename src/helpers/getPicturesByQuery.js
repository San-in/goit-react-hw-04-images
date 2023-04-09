import axios from 'axios';
import { toast } from 'react-toastify';

const END_POINT = 'https://pixabay.com/api/';
const KEY = '18207313-9460c279493d4296cd58108b0';

export const getPicturesByQuery = (query, page) =>
  axios
    .get(END_POINT, {
      params: {
        q: query,
        key: KEY,
        page: page,
        per_page: 12,
      },
    })
    .then(({ data }) => {
      if (data.hits.length === 0) {
        throw new Error('По вашому запиту нічого не найдено');
      }
      return {
        totalHits: data.totalHits,
        galleryItems: data.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        ),
      };
    })
    .catch(err => {
      if (err.isAxiosError) {
        toast.error('Проблеми з сервером, спробуй пізніше');
      } else {
        toast.error(err.message);
      }
    });
