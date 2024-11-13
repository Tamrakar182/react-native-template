import { toast } from 'sonner-native';

type Variant = "success" | "fail" | "default"

const commonStyles = {
    backgroundColor: "#424242",
    borderRadius: 8,
    padding: 12,
};

const textStyles = {
    color: '#fff',
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
};

const ToastMessage = (message: string, variant: Variant = "default") => {
    if (variant === "success") {
        return toast.success(message, {
            duration: 1000,
            style: {
                ...commonStyles,
                backgroundColor: "#1fcc75",
            },
            styles: {
                description: {
                    ...textStyles,
                },
                title: {
                    ...textStyles,
                },
            }
        });
    } else if (variant === "fail") {
        return toast.error(message, {
            duration: 1000,
            style: {
                ...commonStyles,
                backgroundColor: "#FF5959",
            },
            styles: {
                description: {
                    ...textStyles,
                },
                title: {
                    ...textStyles,
                },
            },
        });
    }

    return toast(message, {
        style: commonStyles,
        styles: {
            description: {
                ...textStyles,
            },
            title: {
                ...textStyles,
            },
        },
    });
};

export default ToastMessage;