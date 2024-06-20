import { selectors } from "@/redux/authentication";

import useAppSelector from "./useAppSelector";

const useIsLoggedIn = (): boolean => {
  const userDetails = useAppSelector(selectors.userDetails);
  return !!userDetails.email;
};

export default useIsLoggedIn;
