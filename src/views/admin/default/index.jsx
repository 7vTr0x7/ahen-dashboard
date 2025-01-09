import { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "components/widget/Widget";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCustomers: 0,
    vendorCustomers: 0,
    totalSubadmins: 0,
    vendorSubadmins: 0,
    averageDailyCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          vendorCustomersRes,
          vendorSubadminsRes,
          totalCustomersRes,
          totalSubadminsRes,
          dailyCountRes,
        ] = await Promise.all([
          fetch(
            "https://driving.shellcode.cloud/api/vendors/2/customers/count"
          ),
          fetch(
            "https://driving.shellcode.cloud/api/vendors/2/subadmins/count"
          ),
          fetch("https://driving.shellcode.cloud/api/customers/count"),
          fetch("https://driving.shellcode.cloud/api/subadmins/count"),
          fetch("https://driving.shellcode.cloud/api/average-daily-count"),
        ]);

        const vendorCustomersData = await vendorCustomersRes.json();
        const vendorSubadminsData = await vendorSubadminsRes.json();
        const totalCustomersData = await totalCustomersRes.json();
        const totalSubadminsData = await totalSubadminsRes.json();
        const dailyCountData = await dailyCountRes.json();

        setData({
          totalCustomers: totalCustomersData.totalCustomers,
          vendorCustomers: vendorCustomersData.totalCustomers,
          totalSubadmins: totalSubadminsData.totalSubadmins,
          vendorSubadmins: vendorSubadminsData.totalSubadmins,
          averageDailyCount: parseFloat(dailyCountData.averageDailyCount),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Customers"}
          subtitle={data.totalCustomers}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Vendor Customers"}
          subtitle={data.vendorCustomers}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Total Subadmins"}
          subtitle={data.totalSubadmins}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Vendor Subadmins"}
          subtitle={data.vendorSubadmins}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Average Daily Count"}
          subtitle={data.averageDailyCount.toFixed(2)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
