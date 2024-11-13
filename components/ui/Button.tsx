import { ReactNode, useState } from 'react'
import { Pressable, PressableProps, ActivityIndicator } from 'react-native'
import clsx from 'clsx';

type Variant = "normal" | "alternate" | "reverse" | "icon";

interface Props extends Omit<PressableProps, 'onPress'> {
    children: ReactNode;
    variant?: Variant;
    onPress?: (() => void) | (() => Promise<void>);
    loadingColor?: string;
}

const Button = ({ children, variant = "normal", onPress, loadingColor, ...others }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = async () => {
        if (onPress) {
            setIsLoading(true);
            try {
                await onPress();
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Pressable
            className={clsx('w-full rounded-[8px] px-8 py-4 items-center', {
                'bg-red-300': variant === "normal",
                "border rounded-[8px] border-gray-200": variant === "alternate",
                "border border-orange rounded-[8px]": variant === "reverse",
                "bg-[#F3F5F7] rounded-[8px] p-8": variant === "icon",
            })}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1.0 }
            ]}
            onPress={handlePress}
            disabled={isLoading}
            {...others}
        >
            {isLoading ? (
                <ActivityIndicator color={loadingColor || (variant === "normal" ? "white" : "orange")} />
            ) : (
                children
            )}
        </Pressable>
    )
}

export default Button;