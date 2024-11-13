import { TextInput, TextInputProps, View, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
// import { Eye, EyeClosed } from 'iconoir-react-native'
import { Controller, useFormContext } from 'react-hook-form'

interface Props extends TextInputProps {
    label: string;
    containerStyles?: string;
    name: string;
    labelStyles?: string;
    disabled?: boolean;
    inputContainerStyles?: string;
}

const Input = ({ placeholder, label, containerStyles, labelStyles, inputContainerStyles, name, disabled = false, ...others }: Props) => {
    const { control, clearErrors } = useFormContext();
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handlePress = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                useEffect(() => {
                    if (value) {
                        clearErrors(name);
                    }
                }, [value]);

                return (
                    <>
                        <View className={clsx(
                            "w-full bg-[#F6F7F9] rounded-lg",
                            disabled && "opacity-50",
                            containerStyles
                        )}>
                            <Text className={clsx(
                                'font-sbold text-md text-neutral-700 px-3 pt-3 pb-1',
                                disabled && "text-gray-500",
                                labelStyles
                            )}>
                                {label}
                            </Text>
                            <View className={clsx('w-full flex-row justify-between', inputContainerStyles)}>
                                <TextInput
                                    placeholder={placeholder}
                                    className={clsx(
                                        'px-3 pb-3 flex-1 placeholder:font-smedium',
                                        disabled && "text-gray-500"
                                    )}
                                    secureTextEntry={label.includes("Password") && !showPassword}
                                    onChangeText={disabled ? undefined : onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    editable={!disabled}
                                    placeholderTextColor="#a9a9a9"
                                    {...others}
                                />
                                {/* incase you need password, just use your own icon */}
                                {/* {label.includes("Password") && !disabled &&
                                    <Pressable
                                        onPress={handlePress}
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.5 : 1.0 }
                                        ]}
                                    >
                                        {!showPassword ?
                                            <EyeClosed
                                                color="#a9a9a9"
                                                width="16px"
                                                height="16px"
                                                className='mx-3 mt-2'
                                            />
                                            :
                                            <Eye
                                                color="#a9a9a9"
                                                width="16px"
                                                height="16px"
                                                className='mx-3 mt-2'
                                            />
                                        }
                                    </Pressable>
                                } */}
                            </View>
                        </View>
                        {error && (
                            <Text className="text-red-200 font-smedium px-3 text-sm pb-1">{error.message}</Text>
                        )}
                    </>
                )
            }}
        />
    )
}

export default Input;