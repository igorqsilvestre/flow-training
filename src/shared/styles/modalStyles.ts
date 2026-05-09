import { StyleSheet } from "react-native";
import { theme } from "../themes/theme";

export const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
    modal: {
        borderRadius: 10,
        width: '95%',
        backgroundColor: "#fff",
        alignItems: 'center',
        overflow: 'hidden',
        gap: 30
      },
    header: {
        backgroundColor: theme.colors.header,
        width: '100%',
        padding: 10
      },
    headerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.bold,
        fontSize: theme.fonts.sizes.medium
    },
    content: {
        marginVertical: 8,
        width: '90%',
    },
    input: {
        marginVertical: 2,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
    },
    label: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
    },
     error: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.small,
        color: theme.colors.wrong
    },
      message: {
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.body,
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    footerTitle: {
        textAlign: 'center',
        fontFamily: theme.fonts.family.regular,
        fontSize: theme.fonts.sizes.medium
    },
    footerAction: {
        paddingVertical: 8,
        width: '35%',
        marginBottom: 4,
        borderRadius: 10,
        backgroundColor: theme.colors.header
    },
   
});