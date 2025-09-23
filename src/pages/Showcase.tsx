import Preview from '../components/Preview';

type ShowcaseProps = {
  onClose: () => void;
};

export default function Showcase({ onClose }: ShowcaseProps) {
  return (
    <div className="relative w-full p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg transition-all duration-500 hover:shadow-xl">
      <div className="flex justify-end  mt-12">
        <button
          onClick={onClose}
          className="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Preview />
      </div>
    </div>
  );
}