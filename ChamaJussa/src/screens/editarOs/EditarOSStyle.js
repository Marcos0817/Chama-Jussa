import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({

    // =====================================================
    // CONTAINER
    // =====================================================

    keyboardAvoiding: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },

    scrollContent: {
        paddingHorizontal: 22,
        paddingTop: 25,
        paddingBottom: 40,
    },


    // =====================================================
    // CABEÇALHO
    // =====================================================

    header: {
        marginBottom: 20,
    },

    voltar: {
        fontSize: 13,
        color: "#087FF5",
        fontWeight: "600",
        marginBottom: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111111",
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 12,
        color: "#777777",
    },


    // =====================================================
    // FORMULÁRIO
    // =====================================================

    form: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 20,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 3,

        elevation: 3,
    },


    // =====================================================
    // LABELS
    // =====================================================

    label: {
        fontSize: 12,
        color: "#333333",
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 10,
    },


    // =====================================================
    // INPUTS
    // =====================================================

    input: {
        height: 42,

        borderWidth: 1,
        borderColor: "#D9D9D9",

        borderRadius: 5,

        paddingHorizontal: 12,

        fontSize: 12,
        color: "#111111",

        backgroundColor: "#FFFFFF",
    },

    inputDisabled: {
        height: 42,

        borderWidth: 1,
        borderColor: "#D9D9D9",

        borderRadius: 5,

        paddingHorizontal: 12,

        fontSize: 12,

        backgroundColor: "#EEEEEE",
        color: "#666666",
    },

    textArea: {
        height: 100,

        textAlignVertical: "top",

        paddingTop: 10,
    },


    // =====================================================
    // STATUS
    // =====================================================

    statusContainer: {
        flexDirection: "row",
        flexWrap: "wrap",

        gap: 8,

        marginBottom: 10,
    },

    statusButton: {
        borderWidth: 1,
        borderColor: "#D9D9D9",

        borderRadius: 5,

        paddingHorizontal: 12,
        paddingVertical: 8,

        backgroundColor: "#FFFFFF",
    },

    statusButtonAtivo: {
        borderWidth: 1,
        borderColor: "#087FF5",

        borderRadius: 5,

        paddingHorizontal: 12,
        paddingVertical: 8,

        backgroundColor: "#EAF4FF",
    },

    statusText: {
        fontSize: 11,
        color: "#555555",
    },

    statusTextAtivo: {
        fontSize: 11,
        color: "#087FF5",
        fontWeight: "600",
    },


    // =====================================================
    // FOTO
    // =====================================================

    imageContainer: {
        width: "100%",
    },

    preview: {
        width: "100%",
        height: 180,

        borderRadius: 5,

        marginTop: 5,

        backgroundColor: "#EEEEEE",
    },

    imageHint: {
        textAlign: "center",

        marginTop: 8,
        marginBottom: 5,

        color: "#666666",

        fontSize: 13,
    },

    semFoto: {
        fontSize: 11,

        color: "#777777",

        marginTop: 5,
        marginBottom: 5,
    },


    // =====================================================
    // BOTÃO DE FOTO
    // =====================================================

    photoButton: {
        height: 40,

        borderWidth: 1,
        borderColor: "#087FF5",

        borderRadius: 5,

        alignItems: "center",
        justifyContent: "center",

        marginTop: 10,
    },

    photoButtonText: {
        color: "#087FF5",

        fontSize: 12,

        fontWeight: "600",
    },


    // =====================================================
    // BOTÕES
    // =====================================================

    buttonsContainer: {
        flexDirection: "column",

        marginTop: 20,
        marginBottom: 30,
    },

    button: {
        height: 43,

        backgroundColor: "#087FF5",

        borderRadius: 5,

        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "#FFFFFF",

        fontSize: 13,

        fontWeight: "600",
    },

    cancelButton: {
        height: 43,

        borderWidth: 1,
        borderColor: "#E53935",

        borderRadius: 5,

        alignItems: "center",
        justifyContent: "center",

        marginTop: 10,
    },

    cancelButtonText: {
        color: "#E53935",

        fontSize: 13,

        fontWeight: "600",
    },


    // =====================================================
    // MODAL DA IMAGEM
    // =====================================================

    modalContainer: {
        flex: 1,

        backgroundColor: "rgba(0, 0, 0, 0.95)",

        justifyContent: "center",
        alignItems: "center",
    },

    expandedImage: {
        width: "100%",
        height: "100%",
    },


    // =====================================================
    // BOTÃO FECHAR DO MODAL
    // =====================================================

    closeButton: {
        position: "absolute",

        top: 50,
        right: 20,

        width: 45,
        height: 45,

        borderRadius: 25,

        backgroundColor: "rgba(255,255,255,0.2)",

        justifyContent: "center",
        alignItems: "center",

        zIndex: 10,
    },

    closeButtonText: {
        color: "#FFFFFF",

        fontSize: 28,

        fontWeight: "bold",
    },

});