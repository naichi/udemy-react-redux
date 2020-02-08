import _ from 'lodash'
import {
    CREATE_EVENT,
    READ_EVENTS,
    READ_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../actions'

export default (events = {}, action) => {
    switch (action.type) {
        // CREATE, READ, UPDATEで処理内容が似ているのでこのままでいいとかなんとか
        case CREATE_EVENT:
        case READ_EVENT:
        case UPDATE_EVENT:
            const data = action.response.data
            // {id: 10, title: "Let's have an event 10!", body: "This is the body for event 10."}
            // 編集画面のところに初期状態のデータとして元の情報を入力するようにした感じ？
            return { ...events, [data.id]: data }
        case READ_EVENTS:
            return _.mapKeys(action.response.data, 'id')
        case DELETE_EVENT:
            delete events[action.id]
            // spread演算子 こう書くことで、新しいメモリ空間上に更新後のアップデトされたイベントのオブジェクトをReducerが返してくれる
            return {...events}
        default:
            return events 
    }
}