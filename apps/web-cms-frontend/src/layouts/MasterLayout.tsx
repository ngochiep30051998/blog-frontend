


import { Outlet } from "react-router-dom";


export function MasterLayout() {
  return (
    <div>
      <h1>Welcome to MasterLayout!</h1>
      <Outlet />
      <footer>hihi</footer>
    </div>
  );
}

export default MasterLayout;



