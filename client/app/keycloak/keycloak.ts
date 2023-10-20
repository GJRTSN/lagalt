import Keycloak, { KeycloakInstance } from 'keycloak-js';

const keycloakConfig = {
  url: "https://lemur-10.cloud-iam.com/auth/",
  realm: "lagaltcase2023",
  clientId: "my-app",
};

let keycloak: KeycloakInstance | undefined;

if (typeof window !== 'undefined') {
  // We're in the browser
  keycloak = new Keycloak(keycloakConfig);
}

export default keycloak;
