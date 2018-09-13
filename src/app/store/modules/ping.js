import delay from 'rxjs/operator/delay'
import mapTo from 'rxjs/operator/mapTo'
import { ofType } from 'redux-observable'

export const pingEpic = action$ => action$.pipe(
    ofType('PING'),
    delay(1000),
    mapTo({ type: 'PONG' }),
)

const reducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'PING':
            return { isPinging: true }

        case 'PONG':
            return { isPinging: false }

        default:
            return state
    }
}

export default reducer
