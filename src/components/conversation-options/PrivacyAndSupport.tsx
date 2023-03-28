import { ChevronDown, ChevronRight } from 'akar-icons';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LeaveGroupAPI } from '../../services/api';
import LeaveGroupIcon from '../icons/LeaveGroupIcon';

export const PrivacyAndSupport = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate();
    const [showPrivacyAndSupport, setShowPrivacyAndSupport] = useState<boolean>(false);
    const handleShowPrivacyAndSupport = () => {
        if (showPrivacyAndSupport) setShowPrivacyAndSupport(false);
        else setShowPrivacyAndSupport(true);
    };

    const handleLeaveGroup = () => {
        LeaveGroupAPI(parseInt(id!)).then(() => {
            toast.success("Left Group Successfully");
            navigate("/groups");
        }).catch(() => {
            toast.error("Error Leaving Group");
        })
    };

    return <div className="flex flex-col justify-center ml-2 cursor-pointer">
    <div
    onClick={handleShowPrivacyAndSupport}
        className=" flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md"
    >
        <span className="text-lg text-white text-[#fcfcfc]">Privacy And Support</span>
        <div className="px-1 py-1">
            {showPrivacyAndSupport ?  <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
    </div>
    {showPrivacyAndSupport && (
        <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto cursor-pointer">
            <div
                onClick={handleLeaveGroup}
                className="flex justify-start gap-2 items-center rounded-md py-2 px-2 hover:bg-[#1c1e21] "
            >
                <div className="p-[2px] rounded-full text-white bg-[#373434]">
                    <LeaveGroupIcon className="w-6 h-6 text-white" />
                </div> 
                <span className="text-lg font-medium">Leave Group</span>
            </div>
        </div>
    )}
</div>
}