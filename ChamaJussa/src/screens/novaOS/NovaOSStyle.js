import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({

    // ==============================
    // CONTAINER
    // ==============================

    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
    },

    scrollContent: {
        padding: 25,
        paddingBottom: 40,
    },


    // ==============================
    // CABEÇALHO
    // ==============================

    header: {
        marginBottom: 25,
    },

    voltar: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222222",
        marginBottom: 5,
        marginLeft: 27,
    },



    // ==============================
    // FORMULÁRIO
    // ==============================

    form: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0d0d0d",
        marginBottom: 8,
        marginTop: 15,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#222222",
        backgroundColor: "#f4f4f4",
    },

    textArea: {
        height: 120,
        paddingTop: 15,
        textAlignVertical: "top",
    },


    // ==============================
    // SELECIONAR IMAGEM
    // ==============================

    imageButton: {
        height: 48,
        backgroundColor: "#f4f4f4",
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 8,

        alignItems: "center",
        flexDirection: "row",

        marginBottom: 15,
    },

    imageButtonIcon: {
        fontSize: 22,
        color: "#555555",
        fontWeight: "400",
        marginRight: 8,
    },

    imageButtonText: {
        color: "#a4a4a4",
        marginLeft: 15,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "600",
    },


    // ==============================
    // PRÉVIA DA IMAGEM
    // ==============================

    imagePreviewContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    imagePreview: {
        width: "100%",
        height: 220,
        borderRadius: 10,
        resizeMode: "cover",
    },

    removeImage: {
        marginTop: 8,
        color: "#DC2626",
        fontSize: 14,
        fontWeight: "600",
    },


    // ==============================
    // BOTÃO CADASTRAR
    // ==============================

    button: {
        height: 52,
        borderRadius: 8,
        backgroundColor: "#10B981",

        alignItems: "center",
        justifyContent: "center",

        marginTop: 30,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});
