const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_FILTER':
            console.log(action.filter)
            return `${action.filter}`
        default:
            return state
    }
}

export const newFilter = filter => {
    return {
        type: 'NEW_FILTER',
        filter
    }
}


export default filterReducer