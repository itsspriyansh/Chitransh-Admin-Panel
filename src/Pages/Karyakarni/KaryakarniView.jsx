import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { removeKaryakarni } from "../../Api/karyakarniApi";
import { Link, useNavigate } from "react-router-dom";
import { sendImageNotification } from "../../Api/notificationApi";

const KaryakarniView = ({ setKaryakarniVariant, displayKaryakarni }) => {
  const navigate = useNavigate();
  const { id, name, landmark, city, state, logo, designations, members } = displayKaryakarni;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    setSelectedMembers(members || []);
  }, [members]);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const clickHandler = () => {
    setKaryakarniVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this karyakarni?")) {
      await removeKaryakarni(id);
      setKaryakarniVariant((prev) => !prev);
      window.location.reload();
      navigate("/karyakarni");
    }
  };

  const notifyHandler = async () => {
    if (window.confirm("Are you sure you want to send notification for this karyakarni?")) {
      setIsLoading(true);
      await sendImageNotification({ name, logo });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{name}</p>
      <div className="m-5 flex flex-wrap">
        <div className="w-64 h-64 overflow-hidden rounded-xl mr-6">
          <img src={logo} alt={name} className="object-cover w-full h-full" />
        </div>
      </div>
      <p className="pr-20 pl-5 my-5">Formed at {`${landmark} ${city} ${state}`}</p>

      <div className="flex flex-wrap pl-5">
        <p className="font-bold w-full">Members:</p>
        <div className="flex flex-wrap">
          {selectedMembers.map((member, index) => (
            <div 
              key={index} 
              className="m-5 p-5 border-black  border-2 rounded hover:shadow-2xl duration-200"
            >
              <img src={member.profilePic} alt={member.name} className="w-16 h-16 object-cover rounded-full" />
              <h2 className="font-bold">{member.name}</h2>
              <ul>
                {member.designations.map((designation, i) => (
                  <li key={i}>{designation}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex">
        <button
          onClick={isLoading ? () => {} : notifyHandler}
          className={`mx-1 mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Notify" : <div id="lds-dual-ring" />}
        </button>
        <Link
          to="/updateKaryakarni"
          state={{
            id,
            name,
            landmark,
            state,
            city,
            logo,
            designations,
            members,
          }}
        >
          <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Edit
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className="mx-1 mt-8 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default KaryakarniView;
