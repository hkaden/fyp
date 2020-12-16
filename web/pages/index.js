import Head from 'next/head';
import Link from 'next/link';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import SearchArea from 'container/Home/Search/Search';
import LocationGrid from 'container/Home/Location/Location';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { Query } from 'react-apollo';
import Loader from 'components/Loader/Loader';
import gql from 'graphql-tag';
import GetAPIData from 'library/helpers/get_api_data';
import { getDeviceType } from 'library/helpers/get_device_type';
import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constant';
import {
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE,
  HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE,
  HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH,
} from 'settings/config';

export default function HomePage({
  deviceType,
  locationData,
  topHotelData,
  luxaryHotelData,
}) {
  let limit;

  // const { loading, error, data } = useQuery(TRIP);
  if (deviceType === 'mobile') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_MOBILE_DEVICE;
  }
  if (deviceType === 'tablet') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_TABLET_DEVICE;
  }

  if (deviceType === 'desktop') {
    limit = HOME_PAGE_SECTIONS_ITEM_LIMIT_FOR_DESKTOP_DEVICE;
  }
  const DataList = ({ data, loading, error }) => {
    if (loading && !data) {
      return <Loader />;
    }
  
    if (error) {
      return <h1>Error</h1>;
    }
    console.log(data)
    return (
      <Container fluid={true}>
      <SectionTitle
        title={<Heading content="旅者之選 - 為你推薦" />}
        link={
          <Link href={LISTING_POSTS_PAGE}>
            <a>顯示所有</a>
          </Link>
        }
      />
          
      <SectionGrid
        link={SINGLE_POST_PAGE}
        columnWidth={HOME_PAGE_SECTIONS_COLUMNS_RESPONSIVE_WIDTH}
        data={data.trips}
        limit={limit}
        deviceType={deviceType}
        loading={loading}
      />

    </Container>
    )
  };


  return (
    <>
      <Head>
        <title>深度旅遊</title>
      </Head>
      <SearchArea />
      <Query query={TRIP}>
      {DataList}
      </Query>
    </>
  );

}

const TRIP = gql`
  query {
    trips {
      id
      title
      price
      gallery
    }
  }
`;


