import { useState } from 'react';
import { getPicturesByQuery } from 'helpers/getPicturesByQuery';
import * as Scroll from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledApp } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { useEffect } from 'react';
import { Toster } from 'components/Toster/Toster';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchedWord) {
      return;
    }
    setIsLoading(true);

    getPicturesByQuery(searchedWord, page)
      .then(({ totalHits, galleryItems }) => {
        setTotalHits(totalHits);
        if (page > 1) {
          Scroll.animateScroll.scrollMore(620);
          setGalleryItems(prevGalleryItems => [
            ...prevGalleryItems,
            ...galleryItems,
          ]);
          return;
        }
        setGalleryItems(galleryItems);
      })
      .catch(({ message }) => {
        console.error(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchedWord, page]);

  const onSubmitForm = searchedWord => {
    if (!searchedWord.trim()) {
      return toast.warn('Строка пуста, введіть щось');
    }
    setSearchedWord(searchedWord);
    setPage(1);
    setGalleryItems([]);
    setTotalHits(0);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const isShowButton = !isLoading && totalHits !== galleryItems.length;

  return (
    <StyledApp>
      <Searchbar onSubmit={onSubmitForm} searchValueinApp={searchedWord} />
      {isLoading && <Loader />}

      {!!galleryItems.length && <ImageGallery galleryItems={galleryItems} />}
      {isShowButton && <Button onLoadMore={onLoadMore} />}
      <Toster />
    </StyledApp>
  );
};
