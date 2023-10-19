import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'https://lemur-10.cloud-iam.com/auth/',
  realm: 'lagaltcase2023',
  clientId: 'my-app',
});

export default keycloak;
