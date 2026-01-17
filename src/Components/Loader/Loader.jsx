import Lottie from "lottie-react";
import LoaderJSON from "@/assets/Loader.json";

export default function Loader() {
  return (
    <div
      style={{
        width: 240,
        margin: "auto",
      }}
    >
      <Lottie animationData={LoaderJSON} loop autoplay />
      <p style={{ textAlign: "center", color: "#555" }}>Loading...</p>
    </div>
  );
}
