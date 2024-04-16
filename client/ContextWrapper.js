import { NotiContextProvider } from "./context/notiContext";
import { AuthContextProvider } from "./context/roleContext";
import { UserInfoProvider } from "./context/userInfoContext";

function ContextWrapper({ children }) {
  return (
    <AuthContextProvider>
      <NotiContextProvider>
        <UserInfoProvider>{children}</UserInfoProvider>
      </NotiContextProvider>
    </AuthContextProvider>
  );
}

export default ContextWrapper;
