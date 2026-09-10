import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 20,
            height: 13,
            borderRadius: 2.5,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: 1,
              borderTop: "3.5px solid transparent",
              borderBottom: "3.5px solid transparent",
              borderLeft: "6px solid #171717",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
