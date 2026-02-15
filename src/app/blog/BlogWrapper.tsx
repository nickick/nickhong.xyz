"use client";

import { FC } from "react";

type BlogWrapperProps = {
  children: React.ReactNode;
};

export const BlogWrapper: FC<BlogWrapperProps> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
