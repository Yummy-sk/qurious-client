import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";
import {useState} from "react";
const UserIds = ['roy', 'jay'];
const getRandomUserId = () => UserIds[Math.round(Math.random())];

const originalMsgs = Array(50).fill(0).map((_, i) => ({
    id: i + 1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + i * 1000 * 60,
    text: `${i + 1} mock text`
}))

const MsgList = () => {
    const [msgs, setMsgs] = useState(originalMsgs);

    const onCreate = text => {
        const newMsg = {
            id: msgs.length,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length + 1} ${text}`
        }
        setMsgs(msgs => ([newMsg, ...msgs]));
        // 기존의 msgs 배열에 새로운 리스트 객체를 스프레드 연산자로 추가하게 된다.
    }

    return (
        <div>
            <MsgInput mutate={onCreate}/>
            {
                <ul className="messages">{
                    msgs.map(x => <MsgItem key={x.id} {...x}/>)}
                </ul>
            }
        </div>
    )
}



export default MsgList;
