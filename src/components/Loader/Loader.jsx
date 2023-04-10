import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Dna
      height="280"
      width="280"
      wrapperStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
