import { useCallback, useEffect, useState } from 'react';

export const useModalState = (defaultVal = false) => {
  const [isOpen, setIsOpen] = useState(defaultVal);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, open, close];
};

export const useMediaQuery = query => {
  const [matched, setMatched] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    const listener = evt => setMatched(evt.matches);
    queryList.addEventListener('change', listener);

    return () => {
      queryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matched;
};
