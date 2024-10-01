import { Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div>THIS IS NAVBAR</div>
            <Outlet />
        </>
    );
}

export default Navbar;
