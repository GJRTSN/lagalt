// hoc/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import keycloak from '../keycloak/keycloak-config';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    useEffect(() => {
      if (!keycloak.authenticated) {
        router.push('/');
      }
    }, []);
    
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
