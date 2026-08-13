import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F1F2F4",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    logo: {
        width: 180,
        height: 150,
        resizeMode: "contain",
        marginBottom: 10,
    },

    loginBox: {
        width: "100%",
        maxWidth: 350,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 20,

        elevation: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#222222",
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 12,
        textAlign: "center",
        color: "#888888",
        marginBottom: 25,
    },

    label: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 5,
    },

    input: {
        height: 40,
        backgroundColor: "#F0F1F3",
        borderRadius: 4,
        paddingHorizontal: 12,
        marginBottom: 15,
        fontSize: 12,
    },

    button: {
        height: 40,
        backgroundColor: "#00B878",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },

});