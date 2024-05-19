import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Nav from "../../components/common/Nav";
import { useRouter } from "next/router";
import {
  Icon_bell,
  Icon_calmness,
  Icon_hardness,
  Icon_normal,
  Icon_person,
  Icon_persona_ness,
  Icon_radio,
  Icon_right_arrow,
  Icon_spoit,
  Icon_unselected_radio,
} from "@/module/icons";
import urls from "@/module/urls";
import { useEffect, useState } from "react";
import { getProfile, updatePersona } from "../apis/mypage";

export default function Persona() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [selectedNess, setSelectedNess] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setSelectedNess(data.persona);
      }
    };

    fetchProfile();
  }, []);

  const handlePersonaChange = async (persona: string) => {
    const response = await updatePersona(persona);
    if (response) {
      setSelectedNess(persona);
    } else {
      alert(
        "페르소나를 업데이트하는 데에 실패하였습니다. 문제가 계속될 경우, maxcse01@gmail.com 으로 연락 부탁드립니다."
      );
    }
  };
  return (
    <>
      <div className="p-[15px] mt-[30px]">
        <div className="text-[20px] py-[11px] ml-[10px]">페르소나 설정</div>
        <div className="flex flex-col w-full">
          {[
            {
              key: "NESS",
              label: "기본 페르소나, NESS",
              description: "일반적인 일정 관리 비서입니다.",
              icon: <Icon_normal />,
            },
            {
              key: "HARDNESS",
              label: "하드 페르소나, HARD-NESS",
              description: "일정관리를 빡세게 도와주는 비서입니다.",
              icon: <Icon_hardness />,
            },
            {
              key: "CALMNESS",
              label: "이지 페르소나, CALM-NESS",
              description: "일정관리를 평온히 도와주는 비서입니다.",
              icon: <Icon_calmness />,
            },
          ].map((persona) => (
            <div
              className="rounded-[10px] w-full h-[43px] flex items-center justify-between border-[#ECECEC] my-[18px]"
              key={persona.key}
            >
              <div className="flex gap-[15px] items-center">
                <div className="w-[50px] flex justify-center">
                  {persona.icon}
                </div>
                <div className="text-[16px] font-[500] text-center flex flex-col items-start">
                  <div>{persona.label}</div>
                  <div className="text-[#454545]">{persona.description}</div>
                </div>
              </div>
              <div onClick={() => handlePersonaChange(persona.key)}>
                {selectedNess === persona.key ? (
                  <Icon_radio />
                ) : (
                  <Icon_unselected_radio />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Nav />
    </>
  );
}