import { ChevronDown, ChevronRight } from "akar-icons";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LeaveGroupAPI } from "../../services/api";
import LeaveGroupIcon from "../icons/LeaveGroupIcon";

export const PrivacyAndSupport = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate();
    const [showPrivacyAndSupport, setShowPrivacyAndSupport] = useState<boolean>(false);
    const handleShowPrivacyAndSupport = () => {
        if (showPrivacyAndSupport) setShowPrivacyAndSupport(false);
        else setShowPrivacyAndSupport(true);
    };

    const handleLeaveGroup = () => {
        LeaveGroupAPI(parseInt(id!)).then((res) => {
            toast.success("Left Group Successfully");
            navigate("/groups");
        }).catch((err) => {
            toast.error("Error Leaving Group");
        })
    };

    return <div className="flex flex-col justify-center ml-2 cursor-pointer">
    <div
    onClick={handleShowPrivacyAndSupport}
        className=" flex items-center justify-between py-2 px-2 hover:bg-[#1c1e21] rounded-md"
    >
        <span className="font-normal text-base text-white">Privacy And Support</span>
        <div className="px-1 py-1">
            {showPrivacyAndSupport ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
    </div>
    {showPrivacyAndSupport && (
        <div className="flex flex-col justify-center overflow-y-scroll scrollbar-hide overflow-auto cursor-pointer">
            <div
                onClick={handleLeaveGroup}
                className="flex justify-start gap-2 items-center rounded-md py-2 px-2 hover:bg-[#1c1e21] "
            >
                <div className="p-1 rounded-full text-white bg-[#373434]">
                    <LeaveGroupIcon className="w-6 h-6 text-white" />
                </div> 
                <span className="text-base">Leave Group</span>
            </div>
        </div>
    )}
</div>
}