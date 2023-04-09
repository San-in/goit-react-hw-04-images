import { useState } from 'react';
import { getPicturesByQuery } from 'helpers/getPicturesByQuery';
import { Dna } from 'react-loader-spinner';
import * as Scroll from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledApp } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { useEffect } from 'react';

export const App = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTheFirstMount, setIsTheFirstMount] = useState(true);

  const isShowButton = !isLoading && totalHits !== galleryItems.length;

  useEffect(() => {
    if (isTheFirstMount) {
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
  }, [searchedWord, page, isTheFirstMount]);

  const onSubmitForm = searchedWord => {
    if (!searchedWord.trim()) {
      return toast.warn('Строка пуста, введіть щось');
    }
    setSearchedWord(searchedWord);
    setIsTheFirstMount(false);
    setPage(1);
    setGalleryItems([]);
    setTotalHits(0);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={onSubmitForm} searchValueinApp={searchedWord} />
      {isLoading && (
        <Dna
          height="280"
          width="280"
          wrapperStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {!!galleryItems.length && <ImageGallery galleryItems={galleryItems} />}
      {isShowButton && <Button onLoadMore={onLoadMore} />}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </StyledApp>
  );
};
