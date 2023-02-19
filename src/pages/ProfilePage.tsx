import { Header } from '../components/Header';
import { User } from '../types/User';

interface Props {
  user: User;
  onUserChange: (user: User) => void;
  userIsLogged: boolean;
  onUserIsLogged: (userIsLogged: boolean) => void;
}

export const ProfilePage: React.FC<Props> = ({
  user,
  onUserChange,
  userIsLogged,
  onUserIsLogged
}) => {
  return (
    <>
      <Header
        user={user}
        onUserChange={onUserChange}
        userIsLogged={userIsLogged}
        onUserIsLogged={onUserIsLogged}
      />
      <div className="profile">slake</div>
    </>
  );
};
