import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-multi-carousel/lib/styles.css';
import '@glidejs/glide/dist/css/glide.core.min.css';
import 'antd/lib/date-picker/style/index.css';

import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import theme from 'themes/default.theme';
import GlobalStyles from 'assets/style/Global.style';
import Layout from 'container/Layout/Layout';
import AuthProvider from 'context/AuthProvider';
import { SearchProvider } from 'context/SearchProvider';
import withApollo from 'lib/withApollo';
import 'antd/dist/antd.css';


function App({ Component, router, pageProps, user, apollo }) {
  const { query } = router;

  return (
      <AuthProvider>
      <SearchProvider query={query}>
        <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>

            <Layout>
              <GlobalStyles />
              <Component {...pageProps} />
            </Layout>

          </ApolloProvider>
        </ThemeProvider>
      </SearchProvider>
      </AuthProvider>

  );
}

export default withApollo(App);
