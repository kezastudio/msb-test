import React from "react";

type Props = {
  children: React.ReactNode;
};

const MessageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default MessageLayout;
