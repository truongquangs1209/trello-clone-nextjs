import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <h1>Loading...</h1>
      <Spin />
    </div>
  );
}
