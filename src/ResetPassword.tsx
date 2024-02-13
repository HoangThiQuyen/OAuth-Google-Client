import React from "react";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  console.log(location.state);
  return <div>Form Reset password</div>;
}
