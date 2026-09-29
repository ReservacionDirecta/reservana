export const metadata = {
  title: 'Reservana — Beach Club PMS',
  description: 'Gestión de áreas, reservas y consumo para clubes de playa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#0b0b0b', color: '#f4f4f4', margin: 0 }}>{children}</body>
    </html>
  );
}
