import Tippy from '@tippyjs/react';
import { useState } from 'react';
import GifIcon from '../icons/GifIcon';
import { GifPicker } from './GifPicker';

export const GifInput = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={visible && <GifPicker setVisible={setVisible} visible={visible} />}
            placement="top"
            interactive={true}
            animation="fade"
            theme="giphy"
        >
            <div onClick={() => setVisible((prev) => !prev)}>
                <GifIcon className=" hover:bg-[#1c1e21] rounded-full" />
            </div>
        </Tippy>
    );
};
