import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageType} from "@/shared/localStoregate/enums";
import {AuthResponse} from "@/models/auth";

export const setStorage = async (
    key: string,
    value: string,
) => AsyncStorage.setItem(key, value);
export const getStorage = async (key: string, secured: boolean = false) =>
    AsyncStorage.getItem(key);

export const removeStorage = async (key: string, secured: boolean = false) =>
    AsyncStorage.removeItem(key);

export const saveAuthenticate = async (isAuthenticated: string) =>
    setStorage(StorageType.KEY_AUTHENTICATED, isAuthenticated);

export const getAuthenticate = async () =>
    await getStorage(StorageType.KEY_AUTHENTICATED);

export const saveToken = async (data: AuthResponse) =>
    setStorage(StorageType.KEY_TOKEN, JSON.stringify(data));

export const getToken = async () => {
    const _data = await getStorage(StorageType.KEY_TOKEN);
    return _data ? JSON.parse(_data) : null;
};

export const removeToken = async () =>
    await removeStorage(StorageType.KEY_TOKEN);
