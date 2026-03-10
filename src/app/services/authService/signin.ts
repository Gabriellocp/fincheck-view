import { httpClient } from "../httpClient";


export interface SignInParams {
  password: string,
  email: string
}

interface SignInResponse {
  accessToken: string
}
async function signIn(body: SignInParams) {
  const { data } = await httpClient.post<SignInResponse>('/auth/signin', body)

  return data;
}

export default signIn
