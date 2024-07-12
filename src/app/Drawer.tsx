import { FC } from "react";

type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
};

const Drawer: FC<DrawerProps> = ({ children, open }) => {
  return (
    <div className="flex md:hidden">
      <div
        className={`fixed top-0 left-0 z-20 w-[calc(100vw-40px)] h-full transition-all duration-500 transform -translate-x-full bg-gray-900 shadow-lg ${
          open ? "translate-x-0" : ""
        } z-[90]`}
      >
        <div className="px-6 py-4 relative h-full">{children}</div>
      </div>
    </div>
  );
};

export { Drawer };
