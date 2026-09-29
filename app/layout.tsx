import './globals.css';
import ThemeToggle from './components/ThemeToggle';

export const metadata = {
  title: 'Reservana — Beach Club PMS',
  description: 'Gestión de áreas, reservas y consumo para clubes de playa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--bg)', color: 'var(--fg)', margin: 0, minHeight: '100vh' }}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
