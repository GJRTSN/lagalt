import { getAccessToken } from "@/utils/sessionTokenAccessor";

export async function getUserId() {
    let accessToken = await getAccessToken();
    let decodedToken = jwtDecode(accessToken);
    return decodedToken.sub;
  }