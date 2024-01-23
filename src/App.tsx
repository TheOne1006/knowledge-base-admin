
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { LoginPage } from './pages/LoginPage';
import { CustomLayout } from './pages/Layout';;
import kbs from './kbs';
import kbSites from './kb-sites';


export const App = () => (
    <Admin
        loginPage={LoginPage}
        dataProvider={dataProvider}
		authProvider={authProvider}
        layout={CustomLayout}
        title="Kowledge Base Admin"
	>
        <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="kbs" {...kbs} />

        <Resource name="kb-sites" {...kbSites} />

        <Resource name="push-configs" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />

        <Resource name="push-maps" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="push-logs" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        
    </Admin>
);

    