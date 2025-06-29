import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function AuthScreen() {
    const [brands, serBrands] = useState([]);

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const { signUp, signIn } = useAuth();
    const theme = useTheme();

    // 用 async/await 包 fetch
    const fetchBrands = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/test');  // ⚠️ 真機要改成 IP
            const data = await response.json();
            serBrands(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    //
    useEffect(() => {
        fetchBrands();
    }, []);


    const handleAuth = async () => {
        // router.replace("/test");
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError(null)

        if (isSignUp) {
            const error = await signUp(email, password);
            if (error) {
                setError(error);
                return
            }
        } else {
            const error = await signIn(email, password);
            if (error) {
                setError(error);
                return
            }
        }

        router.replace('/');
    }

    const handleSwitchMode = () => {
        setIsSignUp(prev => !prev);
        setError(null);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}
                    variant="headlineMedium"
                >{isSignUp ? "Create Account" : "Welcome back!"}</Text>

                <TextInput style={styles.input} label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                    onChangeText={setEmail}
                />

                <TextInput style={styles.input} label="Password"
                    autoCapitalize="none"
                    mode="outlined"
                    onChangeText={setPassword}
                />
                {error &&
                    <Text style={{ color: theme.colors.error }}>{error}</Text>
                }
                <Button style={styles.button}
                    mode="contained"
                    onPress={handleAuth}>
                    {
                        isSignUp ? "Sign Up" : "Sign In"
                    }</Button>
                <Button style={styles.button} mode="text" onPress={handleSwitchMode}>
                    {isSignUp ?
                        "Already have an account? Sign In" :
                        "Don't have an account! Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: 24
    },
    input: {
        marginBottom: 24,
    },
    button: {
        textAlign: "center",
        marginBottom: 24
    },
    error: {
        textAlign: "center",
        marginBottom: 24,
    }

})