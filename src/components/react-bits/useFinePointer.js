// GMI adaptation: apply decorative pointer effects only to hover-capable fine pointers.
import { useEffect, useState } from 'react';

export default function useFinePointer() {
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return finePointer;
}
