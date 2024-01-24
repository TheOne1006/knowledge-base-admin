
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { LoginPage } from './pages/LoginPage';
import { CustomLayout } from './pages/Layout';;
import kbs from './kbs';
import kbSites from './kb-sites';
import kbFiles from './kb-files';
import pushConfigs from './push-configs';
import pushLogs from './push-logs';
import pushMaps from './push-maps';


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
        <Resource name="kb-files" {...kbFiles} />
        <Resource name="push-configs" {...pushConfigs} />
        <Resource name="push-maps" {...pushMaps} />
        <Resource name="push-logs" {...pushLogs} />

        
    </Admin>
);

    