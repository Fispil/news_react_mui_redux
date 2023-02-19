import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { User } from '../types/User';

interface Props {
  user: User;
  onUserChange: (user: User) => void;
  userIsLogged: boolean;
  onUserIsLogged: (userIsLogged: boolean) => void;
}

export const NewsPage: React.FC<Props> = ({ user, onUserChange, userIsLogged, onUserIsLogged }) => {
  return (
    <>
      <Header
        user={user}
        onUserChange={onUserChange}
        userIsLogged={userIsLogged}
        onUserIsLogged={onUserIsLogged}
      />
      <main>
        <div className="slay">s</div>
      </main>
      <Footer />
    </>
  );
};
