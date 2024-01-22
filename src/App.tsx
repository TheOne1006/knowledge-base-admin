
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { LoginPage } from './pages/LoginPage';
import kbs from './kbs';

export const App = () => (
    <Admin
        loginPage={LoginPage}
        dataProvider={dataProvider}
		authProvider={authProvider}
        title="Kowledge Base Admin"
	>
        
        <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="kbs" {...kbs} />
		<Resource name="kb-site" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
		<Resource name="kb-file" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    </Admin>
);

    