import instance from "./settings";

export const getData = () => {
    return instance.get('user')
}

