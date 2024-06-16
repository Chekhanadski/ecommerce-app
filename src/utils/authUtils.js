const logout = (setStore, setIsOpen) => {
  localStorage.removeItem('customerId');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('anonymousId');
  localStorage.removeItem('anonymousAccessToken');
  setStore((prevStore) => ({ ...prevStore, isAuthorized: false, cartItemCount: 0 }));
  setIsOpen(false);
};

export default logout;