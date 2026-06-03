import { useEffect } from 'react';
import { initDatabase } from './src/database/database';
import { AppRoutes } from './src/routes/AppRoutes';

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);
  return <AppRoutes />;
}
