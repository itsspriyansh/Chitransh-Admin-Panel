import React, { useEffect, useState } from "react";
import KaryakarniItemContent from "./KaryakarniItemContent";
import { getKaryakarnis } from "../../Api/karyakarniApi";
import KaryakarniView from "./KaryakarniView";
import { Link } from "react-router-dom";

const KaryakarniList = () => {
  const [karyakarni, setKaryakarni] = useState([]);
  const [karyakarniVariant, setKaryakarniVariant] = useState(true);
  const [displayKaryakarni, setDisplayKaryakarni] = useState({});

  const fetchKaryakarni = async () => {
    const karyakarnis = await getKaryakarnis();
    setKaryakarni(karyakarnis.karyakarni);
  };

  useEffect(() => {
    fetchKaryakarni();
  }, []);

  if (!karyakarni || karyakarni.length === 0) {
    return <div>Loading...</div>;
  }

  const clickHandler = (item) => {
    setKaryakarniVariant((prev) => !prev);
    setDisplayKaryakarni(item);
  };

  if (karyakarniVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
          <div className=" flex justify-between">
            <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
              Karyakarni
            </p>
            <Link to="/createKaryakarni">
              <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                Create Karyakarni
              </button>
            </Link>
          </div>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>Name</li>
            <li>Location</li>
          </ul>
          {karyakarni.map((item, idx) => (
            <div
              key={idx}
              onClick={() => clickHandler(item)}
              className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
            >
              <KaryakarniItemContent key={idx} item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <KaryakarniView setKaryakarniVariant={setKaryakarniVariant} displayKaryakarni={displayKaryakarni} />;
};

export default KaryakarniList;