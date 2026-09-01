import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({

    // =====================================================
    // KEYBOARD
    // =====================================================

    keyboardContainer: {
        flex: 1,
    },


    // =====================================================
    // SCROLL
    // =====================================================

    scroll: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
    },


    // =====================================================
    // CONTAINER PRINCIPAL
    // =====================================================

    container: {
        flex: 1,

        backgroundColor: "#f1f1f1",

        alignItems: "center",

        justifyContent: "center",

        padding: 20,
    },


    // =====================================================
    // LOGO
    // =====================================================

    logo: {
        width: 249,

        height: 249,

        resizeMode: "contain",

        marginBottom: 12,
    },


    // =====================================================
    // CAIXA DE LOGIN
    // =====================================================

    loginBox: {
        width: 320,

        height: 388,

        backgroundColor: "#FFFFFF",

        borderRadius: 8,

        paddingHorizontal: 24,

        paddingTop: 26,

        paddingBottom: 26,

        elevation: 3,

        shadowColor: "#000",

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.15,

        shadowRadius: 3,
    },


    // =====================================================
    // TÍTULO
    // =====================================================

    title: {
        fontFamily: "Montserrat",

        fontSize: 24,

        fontWeight: "bold",

        textAlign: "center",

        color: "#222222",

        marginBottom: 6,
    },


    // =====================================================
    // SUBTÍTULO
    // =====================================================

    subtitle: {
        fontSize: 14,

        textAlign: "center",

        color: "#888888",

        marginBottom: 32,
    },


    // =====================================================
    // LABEL
    // =====================================================

    label: {
        fontSize: 14,

        fontWeight: "600",

        color: "#333333",

        marginBottom: 6,
    },


    // =====================================================
    // INPUT
    // =====================================================

    input: {
        height: 40,

        backgroundColor: "#F0F1F3",

        borderRadius: 4,

        paddingHorizontal: 13,

        marginBottom: 20,

        fontSize: 13,
    },


    // =====================================================
    // BOTÃO
    // =====================================================

    button: {
        height: 40,

        backgroundColor: "#00B878",

        borderRadius: 4,

        alignItems: "center",

        justifyContent: "center",

        marginTop: 10,
    },


    // =====================================================
    // BOTÃO DURANTE CARREGAMENTO
    // =====================================================

    buttonLoading: {
        opacity: 0.7,
    },


    // =====================================================
    // TEXTO DO BOTÃO
    // =====================================================

    buttonText: {
        color: "#FFFFFF",

        fontSize: 14,

        fontWeight: "bold",
    },


    // =====================================================
    // CONTAINER DO CARREGAMENTO
    // =====================================================

    loadingContainer: {
        flexDirection: "row",

        alignItems: "center",

        justifyContent: "center",
    },


    // =====================================================
    // TEXTO "ENTRANDO..."
    // =====================================================

    loadingText: {
        color: "#FFFFFF",

        fontSize: 14,

        fontWeight: "bold",

        marginLeft: 10,
    },

});