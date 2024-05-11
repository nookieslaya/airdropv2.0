import Faucets from "@/pages/Faucets.tsx";
import Daily from "@/pages/Daily.tsx";
import Reflinks from "@/pages/Reflinks.tsx";
import Reminder from "@/pages/Reminder.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export const Dashboard = () => {
    return (
        <div className="flex justify-between">
            <div className="left flex flex-col">  <Reminder/></div>
            <div className="right flex-colflex w-2/4 ">


            <Tabs defaultValue="faucets" className="">
                <TabsList>
                    <TabsTrigger value="faucets">Faucets</TabsTrigger>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="reflinks">Reflinks</TabsTrigger>
                </TabsList>
                <TabsContent value="faucets"> <Faucets/></TabsContent>
                <TabsContent value="daily"><Daily/></TabsContent>
                <TabsContent value="reflinks"><Reflinks/></TabsContent>
            </Tabs>
            </div>
        </div>
    )
};
