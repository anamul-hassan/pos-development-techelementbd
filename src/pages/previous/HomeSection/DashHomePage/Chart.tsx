// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data: any = [
//   {
//     name: "31 jan 2024",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "01 feb 2024",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "02 feb 2024",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "02 feb 2024",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "02 feb 2024",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "02 feb 2024",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "02 feb 2024",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// const Chart = () => {
//   return (
//     <div className="mt-16 p-5 bg-white shadow-lg border-t-4 rounded-md border-brand3">
//       <h1 className="text-xl pt-3 pb-10">Sales Last 30 Days</h1>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 30,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" angle={-40} textAnchor="end" interval={0} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="pv"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//           {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Chart;
