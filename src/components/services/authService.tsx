import Cookies from 'js-cookie';

interface User {
  name: string;
  username: string;
}

const setUserSession = (user: User) => {
  Cookies.set('user_session', JSON.stringify(user), { expires: 1, path: '/' });
};


export const login = (username: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '111' && password === '111') {
        const user: User = { name: 'Francisco Vargas', username: 'francisco' };
        
        setUserSession(user);

        resolve(user);
      } else {
        reject(new Error('El usuario o la contraseña son incorrectos.'));
      }
    }, 500);
  });
};

export const logout = () => {
  Cookies.remove('user_session', { path: '/' });
};

export const getUserSession = (): User | null => {
  const userSession = Cookies.get('user_session');
  if (userSession) {
    return JSON.parse(userSession) as User;
  }
  return null;
};