import ResetPasswordForm from "@/modules/auth/resetPassword";
import React from "react";

const page = ({ searchParams }: { searchParams: { token?: string } }) => {
  return <ResetPasswordForm initialToken={searchParams.token || ""} />;
};

export default page;
