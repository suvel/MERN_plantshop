import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        contactMessages: [],
        error: null,
        isMessageSent: false,
        isMessageDeleted: false,
    },
    reducers: {
        createContactRequest(state) {
            return {
                ...state,
                loading: true,
                isMessageSent: false,
            };
        },
        createContactSuccess(state) {
            return {
                ...state,
                loading: false,
                isMessageSent: true,
            };
        },
        createContactFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        adminContactMessageRequest(state) {
            return {
                ...state,
                loading: true,
            };
        },
        adminContactMessageSuccess(state, action) {
            return {
                ...state,
                loading: false,
                contactMessages: action.payload.contactMessages || action.payload,
            };
        },
        adminContactMessageFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        deleteContactMessageRequest(state) {
            return {
                ...state,
                loading: true,
                isMessageDeleted: false,
            };
        },
        deleteContactMessageSuccess(state) {
            return {
                ...state,
                loading: false,
                isMessageDeleted: true,
            };
        },
        deleteContactMessageFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        clearError(state) {
            return {
                ...state,
                error: null,
            };
        },
        clearMessageSent(state) {
            return {
                ...state,
                isMessageSent: false,
            };
        },
    },
});

export const {
    createContactRequest,
    createContactSuccess,
    createContactFail,
    adminContactMessageRequest,
    adminContactMessageSuccess,
    adminContactMessageFail,
    deleteContactMessageRequest,
    deleteContactMessageSuccess,
    deleteContactMessageFail,
    clearError,
    clearMessageSent,
} = contactSlice.actions;

export default contactSlice.reducer;
