import { AuthContextProvider } from "./context/roleContext";
import { UserInfoProvider } from "./context/userInfoContext";

function ContextWrapper({ children }) {
  return (
    <AuthContextProvider>
      <UserInfoProvider>{children}</UserInfoProvider>
    </AuthContextProvider>
  );
}

export default ContextWrapper;
