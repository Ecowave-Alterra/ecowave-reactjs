import { Outlet } from "react-router-dom";

export default function AdminRoot() {
    return (
        <>
            <div>Sidebar</div>
            <main>
                <Outlet />
            </main>
        </>
    );
}
