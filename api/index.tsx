import { Button, Frog } from 'frog'
import { devtools } from 'frog/dev'
import { pinata } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { serveStatic } from 'frog/serve-static'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
)

app.frame('/', (c) => {
  const { status, frameData, verified } = c

  const { fid } = frameData || {}

  const { displayName, followerCount, pfpUrl } = c.var.interactor || {}

  console.log('verified', verified)
  console.log('displayName', displayName)
  console.log('followerCount', followerCount)
  console.log('pfpUrl', pfpUrl)
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #432889, #17101F)', // Samakan dengan frame kedua
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          position: 'relative' // Tambahkan ini untuk positioning absolut
        }}
      >
        <div
          style={{
            color: 'red',
            fontSize: 65,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' ? `Hello ${displayName}` : ' Welcome Brother!!   '}
        </div>
        <div
          style={{
            position: 'absolute', // Tambahkan ini untuk positioning absolut
            bottom: 10, // Posisikan di bawah (atau 'top' untuk atas)
            right: 10, // Posisikan di kanan
            color: 'lime', // Mengubah warna teks menjadi hijau cerah
            fontSize: 24, // Memperbesar ukuran teks sedikit
          }}
        >
          By @0xhen
        </div>
      </div>
    ),
    intents: [
      <Button value="neynar">📍Home</Button>,
      <Button action="/neynar">🎩Stats</Button>,
      <Button.Link href="https://warpcast.com/0xhen/0xf3bcfcda">🎁Daily</Button.Link>,
      <Button.Link href="https://warpcast.com/~/compose?text=Frame%20By%20@0xhen%20https://0xhen-frame-user.vercel.app/api">🔍Share</Button.Link>,
    ],
  })
})

app.frame('/neynar', async (c) => {
  const { fid, followerCount, pfpUrl } = c.var.interactor || {}
  const frameData = c.var.frameData || {}
  const channelStats = frameData.channelStats || {
    highCasts: 'N/A',
    totalCasts: 'N/A'
  }

  console.log('interactor: ', c.var.interactor)
  console.log('channelStats: ', channelStats)

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #432889, #17101F)', // Warna latar belakang sama
          backgroundSize: '100% 100%',
          color: 'yellow',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 28,
          fontSize: 45,
          height: '100%',
          width: '100%',
          position: 'relative' // Tambahkan ini untuk positioning absolut
        }}
      >
        <span style={{ color: 'cyan' }}>FID: {fid}</span>
        <span style={{ color: 'cyan' }}>Followers: {followerCount}</span>
        <img
          style={{
            width: 200,
            height: 200,
          }}
          src={pfpUrl}
        />
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: 48 }}>Channel Stats:</span>
          <div style={{ color: 'white', fontSize: 43, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>High Casts: {channelStats.highCasts}</span>
            <span>Total Casts: {channelStats.totalCasts}</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute', // Tambahkan ini untuk positioning absolut
            bottom: 10, // Posisikan di bawah (atau 'top' untuk atas)
            right: 10, // Posisikan di kanan
            color: 'lime', // Mengubah warna teks menjadi hijau cerah
            fontSize: 24, // Memperbesar ukuran teks sedikit
          }}
        >
          By @0xhen
        </div>
      </div>
    ),
    intents: [
      <Button action="/">🔙Back</Button>
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
