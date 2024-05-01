import Faucets from "@/pages/Faucets.tsx";
import Daily from "@/pages/Daily.tsx";
import Reflinks from "@/pages/Reflinks.tsx";

export const Dashboard = () => {
    return (
        <div className="flex justify-between">
            <div className="left flex flex-col w-1/"></div>
            <div className="right w-1/4 "><Faucets/>
                <Daily/>
                <Reflinks/></div>

        </div>
    )
};
