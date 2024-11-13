import { User, UserLoginResponseI } from '@/types/user';
import { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem, removeItem } from '@/utils/AsyncStorage';
import { useRouter } from 'expo-router';
import api, { endpoints } from '@/utils/api';
import ToastMessage from '@/components/ui/CustomToast';

export interface AuthContextData {
    user: User | null;
    signIn: (data: { email: string, password: string }, save: boolean) => Promise<void>;
    signOut: (sendRequest?: boolean) => Promise<void>;
    editUser: (data: User) => Promise<void>;
    loading: boolean;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const user = await getItem('user');

            if (!user || user === '') {
                setUser(null);
            } else {
                setUser(JSON.parse(user));
            }

            setLoading(false);
        })();
    }, []);

    const signIn = async (user: { email: string, password: string }, save: boolean) => {
        setLoading(true);
        try {
            const { data } = await api.post<UserLoginResponseI>(endpoints.auth.login, user);

            const userData = {
                ...data.data,
                token: data.token
            };

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            if (save) {
                await setItem('user', JSON.stringify(userData));
            }

            setUser(userData);
            ToastMessage("Successfully Logged In", "success");
            router.replace("/(app)/")
        } catch (err: any) {
            const { response } = err;

            // backend error
            if (response && response.data) {
                ToastMessage(response?.data.message, "fail");
                return;
            }

            // email doesnt exist
            if (err.toJSON().status === 404) {
                ToastMessage("User doesn't exist", "fail");
                return;
            }

            // password didnt match
            if (err.toJSON().status === 401) {
                ToastMessage("Invalid Email or Password", "fail");
                return;
            }

            // generic error
            ToastMessage("Something went wrong", "fail");
        } finally {
            setLoading(false);
        }
    }

    const editUser = async (data: User) => {
        setLoading(true);
        try {
            setUser(data);
            const user = await getItem('user');

            // this is for when user obj is saved
            if (user && user !== '') {
                await setItem('user', JSON.stringify(data));
            }

            ToastMessage("Profile Updated Successfully", "success");
            router.replace("/");
        } catch (err: any) {
            console.log(err.toJSON())
            ToastMessage("Something went wrong while updating profile", "fail");
        } finally {
            setLoading(false);
        }
    }

    const signOut = async (sendRequest: boolean = true) => {
        setLoading(true);
        try {
            if (sendRequest) {
                await api.get(endpoints.auth.logout);
            }
        } catch (err: any) {
            const { response } = err;
            if (response && response.data) {
                ToastMessage(response?.data.message, "fail");
            }
            console.log(err.toJSON());
            ToastMessage("Something went wrong while logging out", "fail");
        } finally {
            api.defaults.headers.common['Authorization'] = '';
            await removeItem('user');
            setUser(null);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: user,
                signIn,
                signOut,
                loading,
                editUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
