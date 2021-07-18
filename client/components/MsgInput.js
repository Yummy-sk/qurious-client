import {useRef} from "react";

const MsgInput = ({ mutate }) => {
    const textRef = useRef(null);

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        const text = textRef.current.value; // ref에 입력된 텍스트를 받는다.
        textRef.current.value = ''; // 기존 텍스트는 삭제
        mutate(text); // 입력받는 변수에 저장
    }

    return (
        <form className="messages__input" onSubmit={onSubmit}>
            <textarea ref={textRef} placeholder="내용을 입력하세요" />
            <button type="submit">완료</button>
        </form>
    )
}

export default MsgInput;
