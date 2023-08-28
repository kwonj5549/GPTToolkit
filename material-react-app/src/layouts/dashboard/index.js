/**
=========================================================
* GPT Toolkit React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// GPT Toolkit React components
import MDBox from "components/MDBox";
import  { useContext, useEffect,useState } from 'react';
// GPT Toolkit React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { AuthContext } from 'context/index.js';
// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { ApiUsageContext } from 'context/index.js';
function Dashboard() {
  const { apiUsage, setApiUsage,apiUsageisLoading  } = useContext(ApiUsageContext);
  const [userApiUsage, setuserApiUsage] =useState(0)
  const { sales, tasks } = reportsLineChartData;
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    setuserApiUsage(apiUsage)
  },[apiUsage]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title={"Hello, "}
                count={user ? user.name:null}
                percentage={{
                 
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
    <ComplexStatisticsCard
        icon="leaderboard"
        title="API Usage"
        count={user ? `$${Number(userApiUsage).toFixed(3)}` : null}
        percentage={{      
        }}
    />
</MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>

        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            
            
          </Grid>
        </MDBox>
        
      </MDBox>

    </DashboardLayout>
  );
}

export default Dashboard;
