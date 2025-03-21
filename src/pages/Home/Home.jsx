import { UserButton } from '@/components/atoms/UserButton/UserButton';

export const Home = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-slack">
      <h1 className="text-3xl">Home</h1>
      <UserButton />
    </div>
  );
};
