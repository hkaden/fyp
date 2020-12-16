import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Sticky from 'react-stickynode';
import Toolbar from 'components/UI/Toolbar/Toolbar';
import CategorySearch from 'container/Listing/Search/CategorySearch/CategorySearch';
import { Checkbox } from 'antd';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import ListingMap from 'container/Listing/ListingMap';
import { SearchContext } from 'context/SearchProvider';
import gql from 'graphql-tag';
import Loader from 'components/Loader/Loader';
import GetAPIData, {
  Paginator,
  SearchedData,
  SearchStateKeyCheck,
  ProcessAPIData,
} from 'library/helpers/get_api_data';
import { getDeviceType } from 'library/helpers/get_device_type';
import { SINGLE_POST_PAGE } from 'settings/constant';
import {
  LISTING_PAGE_POST_LIMIT,
  LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP,
  LISTING_PAGE_COLUMN_WIDTH_WITH_MAP,
} from 'settings/config';
import ListingWrapper, {
  PostsWrapper,
  ShowMapCheckbox,
} from 'container/Listing/Listing.style';
import { Query } from 'react-apollo';

const FilterDrawer = dynamic(() =>
  import('container/Listing/Search/MobileSearchView')
);

export default function ListingPage({ deviceType }) {
  const { state, dispatch } = useContext(SearchContext);
  const statekey = SearchStateKeyCheck(state);

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);



  const handleMapToggle = () => {
    setShowMap((showMap) => !showMap);
  };



  const DataList = ({ data, loading, error }) => {
    if (loading && !data) {
      return <Loader />;
    }
  
    if (error) {
      return <h1>Error</h1>;
    }
    console.log(data)
    return (
      <PostsWrapper className={columnCount}>
        <SectionGrid
          link={SINGLE_POST_PAGE}
          columnWidth={columnWidth}
          deviceType={deviceType}
          data={data.trips}
          totalItem={data.trips.length}
          limit={LISTING_PAGE_POST_LIMIT}
          loading={loading}

          placeholder={<PostPlaceholder />}
        />
      </PostsWrapper>
    )
  };


  let columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITHOUT_MAP;
  if (showMap) {
    columnWidth = LISTING_PAGE_COLUMN_WIDTH_WITH_MAP;
  }

  let columnCount = 'col-24';
  if (deviceType === 'desktop' && showMap === true) {
    columnCount = 'col-12';
  }

  return (
    <ListingWrapper>
      <Head>
        <title>深度旅遊 | 搜尋</title>
      </Head>

      <Sticky top={82} innerZ={999} activeClass="isHeaderSticky">

      </Sticky>

      <Query query={TRIP}>
      {DataList}
      </Query>
      {showMap && <ListingMap loading={loading} mapData={posts} />}
    </ListingWrapper>
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