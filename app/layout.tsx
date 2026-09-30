import './globals.css';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

export const metadata = {
  title: 'Reservana — Beach Club PMS',
  description: 'Gestión de áreas, reservas y consumo para clubes de playa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--bg)', color: 'var(--fg)', margin: 0, minHeight: '100vh', paddingBottom: '72px' }}>
        <Sidebar />
        <div style={{ marginLeft: '72px', minHeight: 'calc(100vh - 72px)' }}>{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
