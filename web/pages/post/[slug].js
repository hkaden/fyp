import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import isEmpty from 'lodash/isEmpty';
import Sticky from 'react-stickynode';
import { Row, Col, Modal, Button } from 'antd';
import Container from 'components/UI/Container/Container';
import Loader from 'components/Loader/Loader';
import { getDeviceType } from 'library/helpers/get_device_type';
import GetAPIData, { ProcessAPIData } from 'library/helpers/get_api_data';
import Description from 'container/SinglePage/Description/Description';
import Amenities from 'container/SinglePage/Amenities/Amenities';
import Location from 'container/SinglePage/Location/Location';
import Review from 'container/SinglePage/Review/Review';
import Reservation from 'container/SinglePage/Reservation/Reservation';
import BottomReservation from 'container/SinglePage/Reservation/BottomReservation';
import TopBar from 'container/SinglePage/TopBar/TopBar';
import SinglePageWrapper, {
  PostImage,
} from 'container/SinglePage/SinglePageView.style';
import PostImageGallery from 'container/SinglePage/ImageGallery/ImageGallery';
// import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

export default function SinglePostPage({ processedData, deviceType, query }) {
  const router = useRouter()
  const { slug } = router.query
  console.log(slug)
  const [href, setHref] = useState('');
  const [isModalShowing, setIsModalShowing] = useState(false);



  useEffect(() => {
    const path = window.location.href;
    setHref(path);
  }, [setHref]);
  
  const { loading, error, data } = useQuery(GET_TRIP, {
    variables: { id :  slug},
  });

  if (loading) return <Loader />;
  if (error) return `Error! ${error}`;

  return (
    <>
      <Head>
        <title>.</title>
      </Head>
      <SinglePageWrapper>
        <PostImage>
          <Button
            type="primary"
            onClick={() => setIsModalShowing(true)}
            className="image_gallery_button"
          >
            查看圖片
          </Button>
          <Modal
            visible={isModalShowing}
            onCancel={() => setIsModalShowing(false)}
            footer={null}
            width="100%"
            maskStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
            wrapClassName="image_gallery_modal"
            closable={false}
          >
            <>
              <PostImageGallery />
              <Button
                onClick={() => setIsModalShowing(false)}
                className="image_gallery_close"
              >
                <svg width="16.004" height="16" viewBox="0 0 16.004 16">
                  <path
                    id="_ionicons_svg_ios-close_2_"
                    d="M170.4,168.55l5.716-5.716a1.339,1.339,0,1,0-1.894-1.894l-5.716,5.716-5.716-5.716a1.339,1.339,0,1,0-1.894,1.894l5.716,5.716-5.716,5.716a1.339,1.339,0,0,0,1.894,1.894l5.716-5.716,5.716,5.716a1.339,1.339,0,0,0,1.894-1.894Z"
                    transform="translate(-160.5 -160.55)"
                    fill="#909090"
                  />
                </svg>
              </Button>
            </>
          </Modal>
        </PostImage>

        <TopBar title={data.trip.title}  media={data.trip.gallery} />

        <Container>
          <Row gutter={30} id="reviewSection" style={{ marginTop: 30 }}>
            <Col xl={24}>
              <Description
                content={data.trip.content}
                title={data.trip.title}
                location={data.trip.location}

              />

              <Location location={data.trip} />
            </Col>
            <Col xl={8}>
              {deviceType === 'desktop' ? (
                <Sticky
                  innerZ={999}
                  activeClass="isSticky"
                  top={202}
                  bottomBoundary="#reviewSection"
                >
                  <Reservation />
                </Sticky>
              ) : (
                <BottomReservation
                  title={data.trip.title}
                  price={data.trip.price}
                  rating={5.0}
                  ratingCount={100}
                />
              )}
            </Col>
          </Row>

        </Container>
      </SinglePageWrapper>
    </>
  );
}

const GET_TRIP = gql`
  query TRIP($id: ID!){
    trip(id: $id) {
      id
      title
      price
      gallery
      content
      location
      locationContent
      lat
      lng
    }
  }
`;

