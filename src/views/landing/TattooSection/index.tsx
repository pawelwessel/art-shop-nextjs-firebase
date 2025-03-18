"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  MemberCardWrapper,
  MemberImgWrapper,
  MemberInfo,
  MemberSection,
  TeamsIntroSection,
  TeamsTitles,
  TeamsWrapper,
} from "./teams.styled";
import Image from "next/image";
import Link from "next/link";

const MemberCard = (props: any) => {
  return (
    <MemberCardWrapper id={props.id} dir={props.dir} className="select-none">
      <MemberImgWrapper align={props.align}>
        <Image
          src={props.img}
          width={300}
          height={500}
          alt={`${props.alt} ${props.name}`}
          className="h-[90%] w-auto -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] hover:scale-[2] duration-1000 delay-200 ease-in"
        />
      </MemberImgWrapper>
      <MemberInfo>
        <p className="mem-name">{props.name}</p>
        <p className="mem-role opacity-50">{props.role}</p>
      </MemberInfo>
    </MemberCardWrapper>
  );
};

const TeamsPart = () => {
  const [y, setY] = useState(0);
  const [mobile, setMobile] = useState(false);

  const handleScroll = useCallback(
    (e: any) => {
      const currentTarget = e.currentTarget;
      const rmXY: any = [];
      for (let i = 1; i <= 6; i++) {
        rmXY.push(document.getElementById("mem" + i)?.getBoundingClientRect());
      }

      if (y > currentTarget.scrollY) {
        for (let j = 0; j < 6; j++) {
          if (rmXY[j].top > window.innerHeight) {
            const activeDiv: any = document.getElementById("mem" + (j + 1));
            activeDiv.style.transform = "translateY(100px)";
            activeDiv.style.opacity = "0";
          }
        }
      } else if (y < currentTarget.scrollY) {
        for (let j = 0; j < 6; j++) {
          if (rmXY[j].top <= window.innerHeight) {
            const activeDiv: any = document.getElementById("mem" + (j + 1));
            activeDiv.style.transform = "translateY(0)";
            activeDiv.style.opacity = "1";
          }
        }
      }
      setY(currentTarget.scrollY);
    },
    [y]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () =>
      setMobile(window.innerWidth >= 768 ? false : true)
    );
    setMobile(window.innerWidth >= 768 ? false : true);

    setY(window.scrollY);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <TeamsWrapper className="relative">
      <div id="tattoo" className="absolute -top-24 left-0 w-full"></div>
      <TeamsIntroSection className=" px-6 md:px-0">
        <div className="flex flex-col text-left sm:text-center mx-auto ">
          <h3 className="text-[#8f26f3] font-bold text-3xl sm:text-5xl md:text-6xl mb-6">
            WYKONUJĘ TATUAŻE
          </h3>
          <h4 className="text-white font-coco text-left sm:text-center ">
            Jestem elastycznym artystą, który wychodzi naprzeciw oczekiwaniom
            klientów, tworząc wzory na bieżąco, zgodnie z ich pomysłami i
            wyobrażeniami. Moja praca opiera się na współpracy i zrozumieniu
            waszych potrzeb, dzięki czemu mogę stworzyć tatuaż, który idealnie
            oddaje waszą osobowość i historię.
            <strong>
              <Link href="/blog/tatuaz-grudziadz-blackbell-tattoo-studio">
                Tatuaż Grudziądz - Blackbell Tattoo Studio
              </Link>
            </strong>
            . Zapraszam do kontaktu.
          </h4>
        </div>
      </TeamsIntroSection>
      <MemberSection>
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz1.webp"
          id="mem1"
          dir={1}
          name="Faun"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz2.webp"
          dir={0}
          id="mem2"
          name="Ostrze Wikinga"
          align="right"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz3.webp"
          id="mem3"
          dir={1}
          name="Oko opatrznosci"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz4.webp"
          dir={mobile ? 0 : 1}
          id="mem4"
          align="left"
          name="Trójoki pajak"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz5.webp"
          id="mem5"
          dir={mobile ? 1 : 0}
          name="Grecka Bogini"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
        <MemberCard
          img="/images/image/team/tatuaz-blackbellart-grudziadz6.webp"
          id="mem6"
          dir={mobile ? 0 : 1}
          name="Tom z Blantem"
          role="&copy;Blackbell Tattoo"
          alt="BlackbellArt Grudziądz Tatuaże - "
        />
      </MemberSection>
      <TeamsTitles>
        <div className="flex items-center lg:items-end justify-center lg:justify-center h-full mt-12">
          <Link
            href="studio-tatuazu-grudziadz-wzory"
            className="!text-3xl sm:!text-4xl lg:!text-5xl mt-12 lg:mt-0 teams-title font-coco font-bold text-transparent hover:text-white hover:bg-white hover:bg-opacity-10 stroke duration-200 flex flex-row items-center  p-6 sm:p-10 border-2 border-[#8f26f3]"
          >
            Zobacz tatuaże
          </Link>
        </div>
      </TeamsTitles>
    </TeamsWrapper>
  );
};

export default TeamsPart;
