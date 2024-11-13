import { View, Text } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import Checkbox from '@/components/ui/Checkbox';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Container from '@/components/ui/Container'
import { Link } from 'expo-router';
import { useState } from 'react';

const formSchema = z.object({
    email: z.string()
        .email("Please enter a valid email address")
        .min(1, "Please enter your email address"),
    password: z.string()
        .min(8, 'Password must be at least 8 characters'),
});

type FormType = z.infer<typeof formSchema>;

const LoginForm = () => {
    const { signIn } = useAuth();
    const [remember, setRemember] = useState(false);

    const defaultValue = {
        email: "",
        password: ""
    }

    const methods = useForm<FormType>({
        defaultValues: defaultValue,
        resolver: zodResolver(formSchema),
    });

    const handleRememberPress = () => {
        setRemember(!remember);
    }

    const handlePress = methods.handleSubmit(async (data) => {
        await signIn(data, remember);
    })

    return (
        <FormProvider {...methods}>
            <Container className="flex-1 bg-white items-center">
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Input
                        placeholder='test@example.com'
                        label="Email"
                        containerStyles='mt-8'
                        name="email"
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder='●●●●●●●●'
                        label="Password"
                        containerStyles='mt-4'
                        name="password"
                        autoCapitalize='none'
                    />
                    <View className='flex-row w-full justify-between py-2 pl-2 mb-4'>
                        <View className='flex-row gap-x-2 items-center'>
                            <Checkbox onPress={handleRememberPress} checked={remember} />
                            <Text className='font-smedium text-md text-gray-700'>Remember Me</Text>
                        </View>

                        {/* <Link href="/forgotPassword">
                            <Text className='font-smedium text-md text-orange'>Forgot Password?</Text>
                        </Link> */}
                    </View>

                    <View className='mt-4'>
                        <Button onPress={handlePress}>
                            <Text className='font-sbold text-lg text-neutralWhite'>
                                Log In
                            </Text>
                        </Button>
                    </View>
                </View>
            </Container>
        </FormProvider>
    )
}

export default LoginForm;