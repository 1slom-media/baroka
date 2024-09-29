import AdminLayout from "components/app/AppLayout/AdminLayout";

import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "redux-store/user/user.slice";

import EditProfile from "components/app/User-profile/EditProfile";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user?.data?.user);
  const tkn = useSelector((state) => state.user?.token);

  React.useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    } else {
      router.push("/auth");
    }
  }, [token, tkn]);
  return (
    <AdminLayout>
      {user ? (
        <EditProfile
          initialValues={{
            name: user.name,
            surname: user.surname,
            telegramID: user.telegramID,
            region: user.region,
            nickname: user.nickname,
            email: user.email,
          }}
        />
      ) : null}
    </AdminLayout>
  );
};

export default Page;
