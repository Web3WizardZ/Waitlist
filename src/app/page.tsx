import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Join Our Waitlist</h1>
      <WaitlistForm />
    </div>
  );
}
