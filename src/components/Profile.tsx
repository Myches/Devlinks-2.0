import { useAuth } from "../context/authContext";

export default function Profile() {
    const { profileInfo, setProfileInfo } = useAuth();

    const handleProfileChange = (field: keyof typeof profileInfo, value: string) => {
        setProfileInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileInfo((prev) => ({ ...prev, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-violet-100 via-white to-violet-50 p-4 lg:ml-2">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl text-gray-800 font-bold mb-2">Profile Details</h1>
                <p className="text-base text-gray-500 mb-6">Add details to add a personal touch to your profile</p>

                <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <label htmlFor="profileImage" className="cursor-pointer">
                                <div
                                    className="w-28 h-28 rounded-full bg-violet-200 border-4 border-violet-400 shadow-lg flex items-center justify-center overflow-hidden transition-all group-hover:ring-4 group-hover:ring-violet-300"
                                    style={{
                                        backgroundImage: profileInfo.profileImage
                                            ? `url(${profileInfo.profileImage})`
                                            : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    {!profileInfo.profileImage && (
                                        <span className="text-4xl text-violet-500 font-bold">+</span>
                                    )}
                                </div>
                                <div className="absolute bottom-2 right-2 bg-violet-600 text-white rounded-full p-1 shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 16a4 4 0 100-8 4 4 0 000 8zm8-4a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a6 6 0 100 12A6 6 0 0012 6z"/>
                                    </svg>
                                </div>
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <p className="text-sm text-violet-600 mt-3 font-medium cursor-pointer hover:underline">
                            + Upload Image
                        </p>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Image must be 1024x1024px. Use PNG or JPG format.
                        </p>
                    </div>
                </div>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-violet-400 transition">
                            <img src="/images/ph_envelope-simple-fill.svg" width={18} height={18} alt="address logo" className="mr-2 opacity-60" />
                            <input
                                type="text"
                                id="firstName"
                                value={profileInfo.firstName}
                                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                                placeholder=" Michael "
                                className="bg-transparent outline-none text-gray-700 w-full text-base"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-violet-400 transition">
                            <img src="/images/ph_lock-key-fill.svg" width={18} height={18} alt="address logo" className="mr-2 opacity-60" />
                            <input
                                type="text"
                                id="lastName"
                                value={profileInfo.lastName}
                                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                                placeholder="Blackson"
                                className="bg-transparent outline-none text-gray-700 w-full text-base"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-violet-400 transition">
                            <img src="/images/ph_envelope-simple-fill.svg" width={18} height={18} alt="address logo" className="mr-2 opacity-60" />
                            <input
                                type="email"
                                id="email"
                                value={profileInfo.email}
                                onChange={(e) => handleProfileChange('email', e.target.value)}
                                placeholder=" michael@gmail.com "
                                className="bg-transparent outline-none text-gray-700 w-full text-base"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}