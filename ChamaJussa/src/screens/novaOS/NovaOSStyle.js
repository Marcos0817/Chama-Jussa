import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({

    imageButton: {
    backgroundColor: "#E8F0FE",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 15,
},

imageButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
},

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
    fontWeight: "600",
},

    container: {
        flex: 1,
        backgroundColor: "#F5F7FA"
    },

    scrollContent: {
        padding: 25,
        paddingBottom: 40
    },

    header: {
        marginBottom: 25
    },

    voltar: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 5
    },

    subtitle: {
        fontSize: 15,
        color: "#666"
    },

    form: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 15
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: "#FFFFFF"
    },

    textArea: {
        height: 120,
        paddingTop: 15,
        textAlignVertical: "top"
    },

    button: {
        height: 52,
        borderRadius: 8,
        backgroundColor: "#10B981",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700"
    }

});