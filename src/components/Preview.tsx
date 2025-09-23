import { useAuth } from "../context/authContext";
import { toast } from "react-toastify"; // Optional for notifications

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface ProfileInfo {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

interface PlatformConfig {
  [key: string]: { color: string; icon: string };
}

export default function Preview() {
  const { savedLinks, profileInfo } = useAuth();

  // Generate a shareable link for the entire profile
  const username = `${profileInfo?.firstName?.toLowerCase()}_${profileInfo?.lastName?.toLowerCase()}`;
  const shareableLink = `https://linksters.netlify.app/profile/${username}`; 

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("Profile link copied to clipboard!", { autoClose: 2000 });
  };

  const previewStyle = {
    backgroundImage: 'url(/images/Subtract.png)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '290px',
    height: '550px',
  };

  const iconStyle = {
    filter: 'brightness(0) invert(1)',
  };

  const platformConfig: PlatformConfig = {
    Github: { color: '#181717', icon: '/images/teenyicons_github-solid.svg' },
    Youtube: { color: '#FF0000', icon: '/images/ri_youtube-fill.svg' },
    Twitter: { color: '#1DA1F2', icon: '/images/mdi_twitter.svg' },
    Linkedin: { color: '#0077B5', icon: '/images/mdi_linkedin.svg' },
    Facebook: { color: '#4267B2', icon: '/images/bi_facebook.svg' },
    Hashnode: { color: '#00B9F2', icon: '/images/fa6-brands_hashnode.svg' },
    Stackoverflow: { color: '#F48024', icon: '/images/cib_stackoverflow.svg' },
    Codewars: { color: '#B13734', icon: '/images/cib_codewars.svg' },
    Twitch: { color: '#9146FF', icon: '/images/mdi_twitch.svg' },
    Freecodecamp: { color: '#303030', icon: '/images/simple-icons_freecodecamp.svg' },
  };

  return (
    <div className="h-full bg-gradient-to-br from-violet-100 via-white to-violet-50 p-8 lg:ml-2">
      <div className="flex flex-col w-full max-w-2xl mx-auto rounded-2xl shadow-lg p-8" style={previewStyle}>
        <div className="flex-1 flex flex-col justify-center items-center pt-4 px-4">
          {profileInfo?.profileImage && (
            <div className="w-24 h-24 rounded-full border-[4px] border-violet-400 overflow-hidden mb-2">
              <img src={profileInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-xl font-semibold text-gray-500 truncate w-full text-center">
            {`${profileInfo?.firstName} ${profileInfo?.lastName}`}
          </p>
          <p className="text-sm text-gray-600 truncate w-full text-center">{profileInfo?.email}</p>
        </div>

        <div className="flex-1 text-white overflow-y-auto px-4 py-2">
          {savedLinks.map((link: Link) => (
            <div
              key={link.id}
              className="mb-2 h-[44px] flex justify-between items-center px-2 rounded"
              style={{ backgroundColor: platformConfig[link.platform]?.color || '#000000' }}
            >
              <div className="flex items-center">
                <img
                  src={platformConfig[link.platform]?.icon || ''}
                  width={16}
                  height={16}
                  alt={`${link.platform} icon`}
                  style={iconStyle}
                />
                <span className="ml-2">{link.platform}</span>
              </div>
              <a
                href={link.url.replace(/^(?:https?:\/\/)?localhost(?::\d+)?/, '')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/mdi_arrow-right.svg"
                  width={16}
                  height={16}
                  alt="arrow"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Share Section */}
        <div className="mt-4 px-4">
        
        
        </div>
      </div>
    </div>
  );
}