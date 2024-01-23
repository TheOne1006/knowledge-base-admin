import { ReactQueryDevtools } from 'react-query/devtools';
import { AppBar, Layout, InspectorButton, TitlePortal } from 'react-admin';

const CustomAppBar = () => (
    <AppBar>
        <TitlePortal />
        <InspectorButton placeholder={"loading"} />
    </AppBar>
);


export const CustomLayout = (props: any) => (
    <>
        <Layout {...props} appBar={CustomAppBar} />
        <ReactQueryDevtools
            initialIsOpen={false}
            toggleButtonProps={{ style: { width: 20, height: 30 } }}
        />
    </>
);


export default CustomLayout;
