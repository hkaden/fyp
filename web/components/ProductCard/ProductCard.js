import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import Carousel from 'react-multi-carousel';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';

import GridCard from '../GridCard/GridCard';

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};
export default function ProductCard({
  title,
  rating,
  location,
  price,
  ratingCount,
  gallery,
  slug,
  link,
  deviceType,
}) {

  return (
    <GridCard
      favorite={
        <Favourite
          onClick={(event) => {
            console.log(event);
          }}
        />
      }
      // location={location.formattedAddress}
      title={title}
      price={`$${price} - 免費取消`}
      rating={<Rating rating={5} ratingCount={5} type="bulk" />}
      viewDetailsBtn={
        <Link href={`/post/${link}`} as={`/post/${link}`} prefetch={false}>
          <a>
            <FiExternalLink /> 查看詳情
          </a>
        </Link>
      }
    >
      <Carousel
        ssr
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        deviceType={deviceType}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
      >
        {/* {gallery.map(({ gallery, title }, index) => ( */}
          <img
            src={gallery}
            // alt={title}
            // key={index}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
        {/* ))} */}
      </Carousel>
    </GridCard>
  );
}
