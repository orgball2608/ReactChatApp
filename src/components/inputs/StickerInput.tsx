import Tippy from '@tippyjs/react';
import { useState } from 'react';
import StickerIcon from '../icons/StickerIcon';
import StickerPicker from './StickerPicker';

export const StickerInput = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Tippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            content={visible && <StickerPicker setVisible={setVisible} />}
            placement="top-start"
            interactive={true}
            animation="fade"
            theme="giphy"
            arrow={false}
        >
            <div
                className="p-[6px] hover:bg-[#1c1e21] rounded-full cursor-pointer"
                onClick={() => setVisible((prev) => !prev)}
            >
                <StickerIcon className=" hover:bg-[#1c1e21] rounded-full" color="#0084ff" />
            </div>
        </Tippy>
    );
};
