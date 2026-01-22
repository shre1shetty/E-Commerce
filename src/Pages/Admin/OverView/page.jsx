import CustomHeader from "@/Components/CustomHeader";
import React, { useEffect, useState } from "react";
import growIcon from "@/assets/Grow.png";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./index.css";
import {
  BadgeIndianRupee,
  BadgePercent,
  Banknote,
  Eye,
  ShoppingCart,
  User,
} from "lucide-react";
import { Carousel, Rate } from "antd";
import {
  getMonthlySales,
  getOverAllStats,
  getRecentRatings,
  getTopProducts,
  getViewdata,
  salesByCategory,
} from "./service";
import { formatNumber, getFileUrl } from "@/lib/utils";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { LS } from "@/lib/SecureLocalStorage";
const OverView = () => {
  const userName = LS.get("username");
  const [monthlySales, setmonthlySales] = useState({
    sales: 0,
    salesByDay: [],
    percentage: 0,
    orders: 0,
    ordersPercentage: 0,
  });
  const [topProducts, settopProducts] = useState([]);
  const [comments, setcomments] = useState([]);
  const [views, setviews] = useState([]);
  const [TotalViews, setTotalViews] = useState([]);
  const [salesDataByCateg, setsalesDataByCateg] = useState([]);
  const [overAllData, setoverAllData] = useState({
    userCount: 0,
    productCount: 0,
    totalSales: 0,
    productsPercentage: 0,
    usersPercentage: 0,
    avgViews: 0,
    statusCode: 0,
  });
  const Colors = [
    "#0088FE", // blue
    "#00C49F", // teal
    "#FFBB28", // yellow
    "#FF8042", // orange
    "#A28BFF", // purple
    "#FF6FB5", // pink
    "#34D399", // green
    "#F87171", // red
    "#60A5FA", // light blue
    "#FBBF24", // amber
    "#10B981", // emerald
    "#6366F1", // indigo
    "#EC4899", // fuchsia
    "#F59E0B", // gold
    "#3B82F6", // sky blue
  ];

  const combinedData = [
    { day: 1, views: 10, orders: 12, sales: 2200 },
    { day: 2, views: 150, orders: 10, sales: 1800 },
    { day: 3, views: 90, orders: 50, sales: 2500 },
    { day: 4, views: 200, orders: 20, sales: 3000 },
    { day: 5, views: 170, orders: 14, sales: 2800 },
    { day: 6, views: 130, orders: 18, sales: 2600 },
    { day: 7, views: 180, orders: 25, sales: 3100 },
    { day: 8, views: 95, orders: 30, sales: 2900 },
    { day: 9, views: 160, orders: 22, sales: 2700 },
    { day: 10, views: 140, orders: 16, sales: 3200 },
    { day: 11, views: 175, orders: 28, sales: 3300 },
    { day: 12, views: 120, orders: 35, sales: 3000 },
    { day: 13, views: 200, orders: 40, sales: 3400 },
    { day: 14, views: 155, orders: 38, sales: 3600 },
    { day: 15, views: 190, orders: 45, sales: 3100 },
    { day: 16, views: 110, orders: 20, sales: 2800 },
    { day: 17, views: 145, orders: 27, sales: 3500 },
    { day: 18, views: 170, orders: 33, sales: 3700 },
    { day: 19, views: 130, orders: 24, sales: 3600 },
    { day: 20, views: 180, orders: 30, sales: 3800 },
    { day: 21, views: 160, orders: 36, sales: 4000 },
    { day: 22, views: 150, orders: 28, sales: 3900 },
    { day: 23, views: 140, orders: 31, sales: 4200 },
    { day: 24, views: 190, orders: 40, sales: 4100 },
    { day: 25, views: 175, orders: 42, sales: 4300 },
    { day: 26, views: 155, orders: 38, sales: 4400 },
    { day: 27, views: 165, orders: 26, sales: 4200 },
    { day: 28, views: 180, orders: 34, sales: 4500 },
    { day: 29, views: 135, orders: 29, sales: 4700 },
    { day: 30, views: 200, orders: 50, sales: 4800 },
  ];

  const salesByCategory1 = [
    { name: "Mens", value: 400 },
    { name: "Womens", value: 10 },
    { name: "Shoes", value: 300 },
    { name: "Traditional", value: 10 },
    { name: "Casual", value: 200 },
    { name: "SportsWear", value: 400 },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { category, totalSales, totalOrders } = payload[0].payload;
      return (
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px 10px",
            fontSize: "14px",
          }}
        >
          <strong>{category}</strong>
          <br />
          💰 Total Sales: {totalSales}
          <br />
          🛒 Total Orders: {totalOrders}
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    getMonthlySales().then((data) => {
      console.log(data);
      setmonthlySales({
        sales: data.data.totalSales,
        salesByDay: data.salesByDays,
        percentage: data.percentage,
        ordersPercentage: data.ordersPercentage,
        orders: data.data.totalOrders,
      });
    });
    getTopProducts().then(settopProducts);
    getOverAllStats().then(setoverAllData);
    salesByCategory().then(setsalesDataByCateg);
    getRecentRatings().then(setcomments);
    getViewdata().then((resp) => {
      let totalViews = 0;
      let lastDay = 1;
      const formatedViews = resp.map((row) => {
        const dateString = row.dimensionValues[0].value; // "20251123"
        const day = parseInt(dateString.slice(6, 8)); // 23
        totalViews += Number(row.metricValues[0].value);
        lastDay = day;
        return {
          day,
          views: Number(row.metricValues[0].value),
        };
      });
      setTotalViews(totalViews);
      setviews(orderBy(formatedViews, "day"));
      setoverAllData((prev) => ({
        ...prev,
        avgViews: Math.round(totalViews / lastDay),
      }));
    });
  }, []);

  return (
    <div>
      <CustomHeader
        title={
          <div>
            <h2 className="font-bold text-2xl">Overview</h2>
            <p className="text-xs text-md text-gray-400">
              Welcome to your admin dashboard
            </p>
          </div>
        }
        children={
          <>
            <img
              className="max-sm:hidden absolute top-0 right-2 h-[90px]"
              src="/Representative.png"
            />
            <div className="max-sm:hidden chat-bubble">
              Hi {userName.slice(0, 1).toUpperCase() + userName.slice(1)}{" "}
              Welcome Back !
            </div>
          </>
        }
      />
      <div className="dashboard-container">
        <div className="graph-container">
          <div className="graph-card">
            <div className="flex justify-between items-center p-2.5 md:pb-0">
              <div className="">
                <p className="graph-label">
                  <Banknote size={10} />
                  Monthly Sales
                </p>
                <h2 className="graph-value">
                  ₹{monthlySales.sales}{" "}
                  <span className="text-[10px] text-slate-500">sales</span>
                </h2>
              </div>
              <div className="graph-icon-container">
                <img src={growIcon} alt="Grow Icon" className="graph-icon" />
                <span className="">{monthlySales.percentage}%</span>
              </div>
            </div>
            <ResponsiveContainer
              className={"max-sm:hidden"}
              width={"100%"}
              height={100}
            >
              <AreaChart data={monthlySales.salesByDay}>
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#007bff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#007bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  formatter={(value) => [`${value} sales`]}
                  labelFormatter={(label, payload) =>
                    `Day ${payload[0]?.payload.day}`
                  }
                  contentStyle={{
                    backgroundColor: "#1e1e2f",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#00bfff" }} // style the value
                  labelStyle={{ color: "#aaa", fontWeight: "bold" }} // style the label
                />
                <Area
                  type="monotone"
                  stroke="#007bff"
                  fill="url(#colorGradient)"
                  dataKey="sales"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="graph-card">
            <div className="flex justify-between items-center p-2.5 md:pb-0">
              <div className="">
                <p className="graph-label">
                  <ShoppingCart size={10} />
                  Monthly Orders
                </p>
                <h2 className="graph-value">
                  {monthlySales.orders}{" "}
                  <span className="text-[10px] text-slate-500">orders</span>
                </h2>
              </div>
              <div className="graph-icon-container">
                <img src={growIcon} alt="Grow Icon" className="graph-icon" />
                <span className="">{monthlySales.ordersPercentage}%</span>
              </div>
            </div>
            <ResponsiveContainer
              className={"max-sm:hidden"}
              width={"100%"}
              height={100}
            >
              <BarChart data={monthlySales.salesByDay}>
                <Tooltip
                  formatter={(value) => [`${value} orders`]}
                  labelFormatter={(label, payload) =>
                    `Day ${payload[0]?.payload.day}`
                  }
                  contentStyle={{
                    backgroundColor: "#1e1e2f",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#00bfff" }} // style the value
                  labelStyle={{ color: "#aaa", fontWeight: "bold" }} // style the label
                />
                <Bar
                  type="monotone"
                  fill="#61cff1"
                  dataKey="orders"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="graph-card">
            <div className="flex justify-between items-center p-2.5 md:pb-0">
              <div className="">
                <p className="graph-label">
                  <Eye size={10} />
                  Monthly Visitor
                </p>
                <h2 className="graph-value">
                  {TotalViews}{" "}
                  <span className="text-[10px] text-slate-500">views</span>
                </h2>
              </div>
              <div className="graph-icon-container">
                <img src={growIcon} alt="Grow Icon" className="graph-icon" />
                <span className="">12.87%</span>
              </div>
            </div>
            <ResponsiveContainer
              className={"max-sm:hidden"}
              width={"100%"}
              height={100}
            >
              <LineChart data={views}>
                <Tooltip
                  formatter={(value) => [`${value} views`]}
                  labelFormatter={(label, payload) =>
                    `Day ${payload[0].payload.day}`
                  }
                  contentStyle={{
                    backgroundColor: "#1e1e2f",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#00bfff" }} // style the value
                  labelStyle={{ color: "#aaa", fontWeight: "bold" }} // style the label
                />
                <Line
                  type={"monotone"}
                  stroke="#f161e5"
                  fill="#f161e5"
                  dataKey="views"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="revenue-analysis-card">
            <div className="revenue-analytics-label-container">
              <h1 htmlFor="" className="font-bold text-xl">
                Revenue Analytics
              </h1>
            </div>
            <ResponsiveContainer width={"100%"} height={400}>
              <LineChart
                data={monthlySales.salesByDay}
                margin={{ top: 5, right: 10, bottom: 20, left: 0 }}
              >
                <Legend
                  verticalAlign="top"
                  align="left"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ top: -10, left: 20, fontSize: 12 }}
                />
                <XAxis
                  label={{
                    value: "Day",
                    position: "bottom",
                    offset: 0,
                    fill: "#969596",
                    fontSize: 12,
                  }}
                  dataKey="day"
                  stroke="#aaa"
                  tick={{ fill: "#969596", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#888", strokeWidth: 1 }}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d9d7d8"
                  vertical={false}
                  yAxisId={"left"}
                  horizontal={true}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "sales") return [`₹${value}`, "Sales"];
                    if (name === "orders") return [`${value} orders`, "Orders"];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Day ${label}`}
                  contentStyle={{
                    backgroundColor: "white ",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 10px",
                    color: "#fff",
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "orange", fontSize: 12 }} // style the value
                  labelStyle={{ color: "#686868", fontWeight: "bold" }} // style the label
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "#969596", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ strokeWidth: 0 }}
                  label={{
                    value: "Orders",
                    angle: -90,
                    position: "insideLeft",
                    offset: 20,
                    fill: "#969596",
                    fontSize: 12,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#969596", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ strokeWidth: 0 }}
                  label={{
                    value: "Sales",
                    angle: -90,
                    position: "insideRight",
                    fill: "#969596",
                    fontSize: 12,
                  }}
                />{" "}
                {/* for sales */}
                <Line
                  type={"monotone"}
                  yAxisId="left"
                  dataKey="orders"
                  stroke="#ff8a15"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type={"monotone"}
                  yAxisId="right"
                  dataKey="sales"
                  stroke="#ffc107"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 max-sm:col-span-3">
            <div className="top-selling">
              <h2 className="top-selling-header">Top Selling Products</h2>
              <div className="top-products-list-container">
                <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={2000}>
                  {topProducts.map(({ name, price, img }, index) => (
                    <>
                      <div className="top-product-1" key={index}>
                        <img src={getFileUrl(img)} alt="" className="" />
                        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                          <span className="">#{index + 1} </span>
                          {name}
                        </p>
                        <p className="text-[10px] text-slate-500">₹{price}</p>
                      </div>
                    </>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="new-comments">
              <div className="label-container">
                <h1 className="font-bold text-base">New Comments</h1>
              </div>
              <div className="new-comments-list">
                {comments.map(
                  ({ comment, createdAt, rating, username }, index) => (
                    <div className="comment" key={index}>
                      <span className="user-profile">
                        <User size={16} color="#916d00" />
                      </span>
                      <div className="comment-details">
                        <p className="user-name">
                          {username}
                          <Rate
                            allowHalf
                            value={rating}
                            disabled
                            style={{
                              fontSize: 14,
                              marginLeft: 5,
                            }}
                          />
                        </p>
                        <p className="comment-text">{comment}</p>
                        <p className="comment-date">
                          {dayjs(createdAt).format("YYYY-MM-DD")}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 max-sm:col-span-3">
          <div className="overall-container">
            <div className="overall-card sales">
              <div className="flex justify-center items-center mb-2.5">
                <div className="total-sales-icon">
                  <BadgeIndianRupee color="white" size={30} />
                </div>
              </div>
              <p className="text-lg text-[#000d50]">Total Sales</p>
              <p className="text-[10px] text-slate-500">
                +{monthlySales.percentage}% Income by last month
              </p>
              <p className="text-2xl font-bold pt-3">
                ₹{formatNumber(overAllData.totalSales)}
              </p>
            </div>
            <div className="overall-card products">
              <div className="flex justify-center items-center mb-2.5">
                <div className="total-sales-icon">
                  <ShoppingCart color="white" size={30} />
                </div>
              </div>
              <p className="text-lg text-[#000d50]">Total Products</p>
              <p className="text-[10px] text-slate-500">
                +{overAllData.productsPercentage}% New products than last month
              </p>
              <p className="text-2xl font-bold pt-3">
                {overAllData.productCount}
              </p>
            </div>
            <div className="overall-card customers">
              <div className="flex justify-center items-center mb-2.5">
                <div className="total-sales-icon">
                  <BadgePercent color="white" size={30} />
                </div>
              </div>
              <p className="text-lg text-[#000d50]">Total Customers</p>
              <p className="text-[10px] text-slate-500">
                +{overAllData.usersPercentage}% New Customers
              </p>
              <p className="text-2xl font-bold pt-3">{overAllData.userCount}</p>
            </div>
            <div className="overall-card visit">
              <div className="flex justify-center items-center mb-2.5">
                <div className="total-sales-icon">
                  <Eye color="white" size={30} />
                </div>
              </div>
              <p className="text-lg text-[#000d50]">Avg Views</p>
              <p className="text-[10px] text-slate-500">
                +1.1% Daily Avg Viewers
              </p>
              <p className="text-2xl font-bold pt-3">{overAllData.avgViews}</p>
            </div>
          </div>
          <div className="top-seller-container" onMouseLeave={handleMouseLeave}>
            <div className="label-container">
              <h1 htmlFor="" className="font-bold text-lg">
                Sales by category
              </h1>
            </div>
            <ResponsiveContainer width={"100%"} height={170}>
              <PieChart onMouseLeave={handleMouseLeave}>
                <Pie
                  data={salesDataByCateg}
                  dataKey="totalSales"
                  nameKey="category"
                  innerRadius="60%"
                  outerRadius="100%"
                  minAngle={10}
                  paddingAngle={5}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  cornerRadius={"10%"}
                >
                  {salesDataByCateg.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      outerRadius={
                        activeIndex === null
                          ? 80 // normal
                          : activeIndex === index
                            ? 80 // slightly bigger
                            : 40 // smaller
                      }
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.5
                      }
                      fill={Colors[index % Colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
