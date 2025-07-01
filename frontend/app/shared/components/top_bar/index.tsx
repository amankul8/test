import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "~/modules/auth/hooks/auth";
import { BaseBtn } from "~/shared/ui";

export default function TopBar() {

    const {logout} = useAuth();
    
        const handleLogout = () => {
            logout()
            toast.info('Logout is  successful');
        }
    
    return (
        <div className="w-full flex items-center justify-between h-[60px]">
            <div className=""> Logo </div>
            <BaseBtn
                text="Logout"
                handler={handleLogout}
            />
        </div>
    )
}