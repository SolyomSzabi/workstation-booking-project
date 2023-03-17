export default request => {
  const token = localStorage.getItem("auth_token");
  // eslint-disable-next-line dot-notation
  request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};