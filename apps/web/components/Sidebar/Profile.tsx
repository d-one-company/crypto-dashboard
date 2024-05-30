import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateFakeImage } from '@/lib/fakeData';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex items-center gap-4 rounded-xl  border border-baltic-sea bg-gradient-to-b from-baltic-sea to-baltic-sea/20 px-6 py-4">
      <Avatar className="size-10">
        <AvatarImage src={generateFakeImage({ width: 300, height: 300 })} width={300} height={300} alt="Avatar" className="overflow-hidden rounded-full" />
        <AvatarFallback className="bg-muted/60 text-gray-500">
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start gap-0.5">
        <p className="text-base">MansonObasi</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-200/50">@manson_87</p>
          <p className="flex rounded-lg bg-white px-1.5 text-xs font-bold text-black">Pro</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
