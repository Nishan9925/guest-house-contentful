import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#b91c1c', // red background
          color: '#ffffff',
          fontSize: 64,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: -1,
        }}
      >
        Arevik B&B
      </div>
    ),
    { ...size }
  );
}


