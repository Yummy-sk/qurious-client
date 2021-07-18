import './index.scss';

// next js에서 서버 사이드 랜더링을 하기 위한 컴포넌트 -> 기본 공식처럼 사용하자.

const App = ({Component, pageProps}) => <Component {...pageProps}/>;

App.getInitialProps = async ({ctx, Component}) => {
    const pageProps = await Component.getInitialProps?.(ctx);
    return {pageProps}
}

export default App;
