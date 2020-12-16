import React from 'react';
import ImageGallery from 'react-image-gallery';
import ImageGalleryWrapper from './ImageGallery.style';


const images = [
  {
    original: "https://upload.cc/i1/2020/11/30/mCo1pe.jpg",
    thumbnail: "https://upload.cc/i1/2020/11/30/mCo1pe.jpg",
  },

];

const PostImageGallery = () => {
  return (
    <ImageGalleryWrapper>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        showIndex={true}
        lazyLoad={true}
        slideDuration={550}
      />
    </ImageGalleryWrapper>
  );
};

export default PostImageGallery;
