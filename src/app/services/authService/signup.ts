import { httpClient } from "../httpClient";


interface SignUpParams {
  name: string,
  password: string,
  email: string
}

interface SignUpResponse {
  accessToken: string
}
async function signUp(body: SignUpParams) {
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', body)

  return data;
}

export default signUp
