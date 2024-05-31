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
          background: 'linear-gradient(to right, #e0b3ff, #b388ff)', // Warna gradasi ungu terang
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          position: 'relative', // Tambahkan ini untuk positioning absolut
          padding: '20px', // Menambahkan padding
          boxSizing: 'border-box' // Memastikan padding dihitung dengan benar
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Warna latar belakang kotak
            borderRadius: '10px',
            color: 'lightgreen', // Warna teks hijau muda
            fontSize: 48, // Mengurangi ukuran font
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '20px', // Menambahkan padding dalam kotak
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
            color: 'darkblue', // Mengubah warna teks menjadi biru tua
            fontSize: 18, // Mengurangi ukuran font
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

  // Menggunakan data jumlah channel jika ada, atau default
  const joinedChannels = 10; // Contoh jumlah channel yang sudah bergabung, ganti dengan data sebenarnya jika tersedia

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #e0b3ff, #b388ff)', // Warna gradasi ungu terang
          backgroundSize: '100% 100%',
          color: 'yellow',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 16, // Mengurangi jarak antar elemen
          fontSize: 36, // Mengurangi ukuran font
          height: '100%',
          width: '100%',
          position: 'relative', // Tambahkan ini untuk positioning absolut
          padding: '20px', // Menambahkan padding
          boxSizing: 'border-box' // Memastikan padding dihitung dengan benar
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Warna latar belakang kotak
            borderRadius: '10px',
            padding: '10px', // Mengurangi padding
            textAlign: 'center',
            width: '70%', // Mengurangi lebar kotak
            maxWidth: '350px', // Mengurangi lebar maksimum
            marginBottom: '10px', // Mengurangi margin bawah
            display: 'flex', // Menambahkan display flex
            flexDirection: 'column', // Menambahkan flex direction column
            alignItems: 'center' // Menambahkan align items center
          }}
        >
          <span style={{ color: 'cyan' }}>FID: {fid}</span>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Warna latar belakang kotak
            borderRadius: '10px',
            padding: '10px', // Mengurangi padding
            textAlign: 'center',
            width: '70%', // Mengurangi lebar kotak
            maxWidth: '350px', // Mengurangi lebar maksimum
            marginBottom: '10px', // Mengurangi margin bawah
            display: 'flex', // Menambahkan display flex
            flexDirection: 'column', // Menambahkan flex direction column
            alignItems: 'center' // Menambahkan align items center
          }}
        >
          <span style={{ color: 'cyan' }}>Followers: {followerCount}</span>
        </div>
        <img
          style={{
            width: 150, // Mengurangi ukuran gambar
            height: 150, // Mengurangi ukuran gambar
            borderRadius: '50%',
            marginBottom: '10px', // Mengurangi margin bawah
          }}
          src={pfpUrl}
        />
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: 36 }}>Channel Stats:</span>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Warna latar belakang kotak
              borderRadius: '10px',
              padding: '10px', // Mengurangi padding
              textAlign: 'center',
              width: '70%', // Mengurangi lebar kotak
              maxWidth: '350px', // Mengurangi lebar maksimum
              display: 'flex', // Menambahkan display flex
              flexDirection: 'column', // Menambahkan flex direction column
              alignItems: 'center' // Menambahkan align items center
            }}
          >
            <div style={{ color: 'white', fontSize: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span>High Casts: {channelStats.highCasts !== 'N/A' ? channelStats.highCasts : 'No data available'}</span>
              <span>Total Casts: {channelStats.totalCasts !== 'N/A' ? channelStats.totalCasts : joinedChannels}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute', // Tambahkan ini untuk positioning absolut
            bottom: 10, // Posisikan di bawah (atau 'top' untuk atas)
            right: 10, // Posisikan di kanan
            color: 'darkblue', // Mengubah warna teks menjadi biru tua
            fontSize: 18, // Mengurangi ukuran font
          }}
        >
          By @0xhen
        </div>
      </div>
    ),
    intents: [
      <Button action="/">🔙Back</Button>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
