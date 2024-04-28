import Faucets from "@/pages/Faucets.tsx";
import Daily from "@/pages/Daily.tsx";

export const Dashboard = () => {
    return (
        <div className="flex flex-col md:flex-row">
        <Faucets/>
            <Daily/>
        </div>
    )
};
