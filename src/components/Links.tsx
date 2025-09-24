import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function Links({ onClose }: { onClose: () => void }) {
  const {
    linkForms,
    saveAllLinks,
    updateLinkForm,
    removeLinkForm,
    addNewLinkForm,
  } = useAuth();

  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const validateUrl = (url: string, platform: string): boolean => {
    // First check if it's a valid URL format
    try {
      // Add https:// if missing
      let testUrl = url;
      if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
        testUrl = 'https://' + testUrl;
      }
      
      new URL(testUrl);
    } catch (e) {
      return false;
    }

    // Now check if it matches the expected platform domain
    const platformDomains: { [key: string]: string[] } = {
      Github: ['github.com', 'github.io'],
      Youtube: ['youtube.com', 'youtu.be'],
      Twitter: ['twitter.com', 'x.com'],
      Linkedin: ['linkedin.com', 'linked.in'],
      Twitch: ['twitch.tv'],
      Facebook: ['facebook.com', 'fb.com'],
      Stackoverflow: ['stackoverflow.com', 'stackexchange.com'],
      Codewars: ['codewars.com'],
      Hashnode: ['hashnode.com', 'hashnode.dev'],
      Freecodecamp: ['freecodecamp.org', 'freecodecamp.dev'],
    };

    const domains = platformDomains[platform] || [platform.toLowerCase() + '.com'];
    const cleanUrl = url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    
    return domains.some(domain => cleanUrl.startsWith(domain.toLowerCase()));
  };

  const handleSaveAll = () => {
    let hasErrors = false;
    const newErrors: { [key: number]: string } = {};

    linkForms.forEach((form) => {
      if (!form.url.trim()) {
        newErrors[form.id] = "URL cannot be empty";
        hasErrors = true;
      } else if (!validateUrl(form.url, form.platform)) {
        newErrors[form.id] = `Please enter a valid ${form.platform} URL`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      saveAllLinks();
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto relative bg-white rounded-xl shadow-lg w-full max-w-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customize your links</h1>
          <p className="text-gray-500 mt-1">
            Add/edit/remove links below and then share all your profiles with the world
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Add New Link Button */}
      <button
        className="w-full py-3 px-4 border-2 border-indigo-500 text-indigo-500 font-medium rounded-lg transition-all 
                   hover:bg-indigo-50 active:scale-[0.98] mb-6 cursor-pointer"
        onClick={addNewLinkForm}
      >
        + Add new link
      </button>

      {/* Links List */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {linkForms.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-700 mb-1">No links added yet</h3>
            <p className="text-gray-500 text-sm">Start adding links to share your profiles with the world</p>
          </div>
        ) : (
          linkForms.map((linkForm) => (
            <div
              key={linkForm.id}
              className="p-5 bg-gray-50 rounded-xl border border-gray-200 transition-all hover:border-indigo-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">Link #{linkForm.id}</span>
                </div>
                <button
                  onClick={() => removeLinkForm(linkForm.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor={`platform-${linkForm.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Platform
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <select
                      id={`platform-${linkForm.id}`}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                      value={linkForm.platform}
                      onChange={(e) => {
                        updateLinkForm(linkForm.id, 'platform', e.target.value);
                        // Clear error when platform changes
                        if (errors[linkForm.id]) {
                          const newErrors = {...errors};
                          delete newErrors[linkForm.id];
                          setErrors(newErrors);
                        }
                      }}
                    >
                      <option value="Github">GitHub</option>
                      <option value="Youtube">YouTube</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Linkedin">LinkedIn</option>
                      <option value="Twitch">Twitch</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Stackoverflow">Stack Overflow</option>
                      <option value="Codewars">Codewars</option>
                      <option value="Hashnode">Hashnode</option>
                      <option value="Freecodecamp">freeCodeCamp</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor={`link-${linkForm.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id={`link-${linkForm.id}`}
                      placeholder={`e.g., https://${linkForm.platform.toLowerCase()}.com/yourusername`}
                      value={linkForm.url}
                      onChange={(e) => {
                        updateLinkForm(linkForm.id, 'url', e.target.value);
                        // Clear error when user starts typing
                        if (errors[linkForm.id]) {
                          const newErrors = {...errors};
                          delete newErrors[linkForm.id];
                          setErrors(newErrors);
                        }
                      }}
                      className={`w-full pl-10 pr-4 py-3 border ${errors[linkForm.id] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                  </div>
                  {errors[linkForm.id] && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors[linkForm.id]}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Example: https://{linkForm.platform.toLowerCase()}.com/username
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
        <button
          className="px-6 py-3 bg-indigo-600 cursor-pointer text-white font-medium rounded-lg transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSaveAll}
          disabled={linkForms.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
}