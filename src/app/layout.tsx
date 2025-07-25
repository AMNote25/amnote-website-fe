import "./globals.css";

export const metadata = {
  title: 'AMnote - Phần mềm kế toán',
  description: 'Made by AMnote',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
