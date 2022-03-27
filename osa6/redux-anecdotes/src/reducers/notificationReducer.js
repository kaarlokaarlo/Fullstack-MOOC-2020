const notificationReducer = (state = 'Welcome', action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return `created new anecdote: "${action.notification}"`
        case 'VOTE_NOTIFICATION':
            return `you voted: "${action.notification}"`
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const newNotification = notification => {
    return {
        type: 'NEW_NOTIFICATION',
        notification
    }
}

export const voteNotification = notification => {
    return {
        type: 'VOTE_NOTIFICATION',
        notification
    }
}

export const clearNotification = notification => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer