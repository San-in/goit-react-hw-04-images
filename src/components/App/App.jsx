import { Component } from 'react';
import { getPicturesByQuery } from 'helpers/getPicturesByQuery';
import { Dna } from 'react-loader-spinner';
import * as Scroll from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledApp } from 'components/App/App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    searchedWord: '',
    galleryItems: [],
    page: 1,
    perPage: 12,
    totalHits: 0,
    isLoading: false,
  };

  onSubmitForm = searchedWord => {
    if (!searchedWord.trim()) {
      return toast.warn('Строка пуста, введіть щось');
    }
    this.setState({ searchedWord, page: 1, galleryItems: [], totalHits: 0 });
  };
  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchedWord, page } = this.state;

    if (prevState.searchedWord !== searchedWord || prevState.page !== page) {
      this.setState({ isLoading: true });

      getPicturesByQuery(searchedWord, page)
        .then(({ totalHits, galleryItems }) => {
          this.setState(prevState => ({
            totalHits,
            galleryItems: [...prevState.galleryItems, ...galleryItems],
          }));
          if (page !== 1) {
            Scroll.animateScroll.scrollMore(620);
          }
        })
        .catch(({ message }) => {
          console.error(message);
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    const { searchedWord, galleryItems, isLoading, totalHits } = this.state;
    const isShowButton = !isLoading && totalHits !== galleryItems.length;
    return (
      <StyledApp>
        <Searchbar
          onSubmit={this.onSubmitForm}
          searchValueinApp={searchedWord}
        />
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
        {isShowButton && <Button onLoadMore={this.onLoadMore} />}
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
  }
}
