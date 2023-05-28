const initalState = {
    data: [],
};

const dataReduser = (state = initalState, action) => {
    switch (action.type) {
        case "setData":
            return { data: action.payload };
        case "clearData":
            return { data: [] };
        default:
            return state;
    }
};

const newItemAction = (payload) => ({
    type: "setData",
    payload,
});
const ClearItemAction = () => ({
    type: "clearData",
});

export { dataReduser, newItemAction, ClearItemAction };