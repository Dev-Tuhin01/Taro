import { X } from 'lucide-react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
 
export default function MyToaster() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-right'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#353b3c',
            color: '#F6EFEB',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className='flex items-center gap-3 w-full'>
                {icon}
                <span className="flex-1">
                  {message}
                </span>
                {t.type !== 'loading' && (
            <button onClick={() => toast.dismiss(t.id)} className=' border-l ml-2 p-1 border-BG-Primary hover:bg-BG-Primary transition' aria-label='close'> <X className="text-UI-7 h-4 w-4" /> </button>
          )}
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}