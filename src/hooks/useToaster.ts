import { toast } from 'react-toastify';

export const useToaster = () => {
    return ({ message, type = 'success', time_ms = 2500 }: ToastProps) => {

        // Creates a lazy ToastContainer without directly returning it in an element
        toast.configure({ autoClose: time_ms });

        return new Promise((resolve) => {
            if (type === 'error') {
                resolve(toast.error('👨‍💻 Error! (Andrew probably broke something.) 👨‍💻 ' + message, {
                    style: { backgroundColor: "#e30b5d", fontWeight: "bold", color: "#dadfdf" },
                    className: 'text-shadow'
                }));
            } else if (type === 'warning') {
                resolve(toast.error('⚠️ Warning! ⚠️ ' + message, {
                    style: { backgroundColor: "#ffff99", fontWeight: "bold", color: "#151e1e" }
                }));
            } else /* if (type === 'success')*/ { // default all to success
                resolve(toast.success('Success! ✅ ' + message, {
                    style: { backgroundColor: "#223636", fontWeight: "bold", color: "#dadfdf" }
                }));
            }
        })
    }
}

interface ToastProps {
    message: string;
    type?: 'info' | 'warning' | 'success' | 'error' | 'default' | 'dark';
    time_ms?: number;
}