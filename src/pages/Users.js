import { Container } from '@material-ui/core';
import Page from 'components/Page';
import UsersContainer from '../components/_control/Users/UsersContainer';
// ----------------------------------------------------------------------

function Users() {
  return (
    <Page title="Пользователи">
      <Container maxWidth="xl">
        <UsersContainer />
      </Container>
    </Page>
  );
}

export default Users;
