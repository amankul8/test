import React from "react";

type CardType = {
    title: string,
    text: string,
    logo: string,
    rating: number,
    reviews: number,
    isLock: boolean
    price: number|null
}

export default function Card({title, text, logo, rating, isLock, reviews, price}: CardType) {
    return (
        <div className="
            border rounded-[10px] border-[var(--light-blue)] 
            bg-[var(--ghost-white)] 
            w-[365px] px-[15px] py-[20px]
            flex flex-col gap-[16px]    
            md:w-[450px]
            lg:w-[550px] lg:p-[20px]
            xl:w-[650px]
            2xl:w-[760px]
        ">

            <div className="flex gap-[15px] lg:gap[20px] justify-between">
                <div className="w-[60px] h-[60px] bg-white rounded-[5px] flex items-center justify-center flex-none
                    lg:w-[90px] lg:h-[90px]
                ">
                    <img className="h-[33px] lg:h-[60px]" src={logo} alt="" />
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[15px] w-full">
                    <div>
                        <h2 className="inline font-[manrope] text-[var(--dark)] text-[20px]/1.5 font-semibold">
                            {title}
                        </h2>
                        <img className="w-[14px] h-[14px] inline ml-[8px]" src="/images/icons/arrow.svg" alt="" />
                    
                        <div className="hidden items-center gap-[10px] mt-[8px] lg:flex">
                            <img className="w-[16px] h-[16px]" src="/images/icons/circle_check.svg" alt="" /> 
                            <p className="text-[14px]/1.5 text-[var(--dark)] font-normal font-[manrope]"> 
                                This software is designed to work with any site
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-[14px]">
                        <div className="flex items-center gap-[14px] hidden 
                            lg:flex
                        ">
                            <div className="flex items-center gap-[4px] bg-[var(--light-blue)] w-fit h-[24px] px-[8px] rounded-[12px]">
                                <span className="text-[14px] font-semibold">
                                    4.6
                                </span>
                                <img className="h-[14px] w-[14px]" src="/images/icons/star.svg" alt="" />
                            </div>
                            <span className="font-normal text-[14px] font-[manrope] text-[var(--slate-blue)]">
                                456 Reviews
                            </span>
                        </div>

                        {
                            isLock 
                            ?  <button className="w-fit h-[24px] bg-[var(--cyan)] rounded-[15px] flex gap-[7px] items-center px-[10px] 
                                    text-[14px]/[24px] text-white font-normal
                                ">
                                    <img className="w-[11px] h-[14px]" src="/images/icons/mini_lock.svg" alt="" />
                                    Official software
                                </button>
                            : null    
                        }
                    </div>
                </div>
                <span className="text-[var(--cyan)] text-[20px] font-semibold hidden 
                
                    lg:block
                ">
                    {price? `$${price}`: 'Free'}
                </span>
            </div>
            <div className="flex items-center gap-[10px] lg:hidden">
                <img className="w-[16px] h-[16px]" src="/images/icons/circle_check.svg" alt="" /> 
                <p className="text-[14px]/[24px] text-[var(--dark)] font-normal font-[manrope]"> 
                    This software is designed to work with any site
                </p>
            </div>
            <div className="flex items-center justify-between
                lg:hidden
            ">
                <div className="flex items-center gap-[14px]">
                    <div className="flex items-center gap-[4px] bg-[var(--light-blue)] w-fit h-[24px] px-[8px] rounded-[12px]">
                        <span className="text-[14px]/[24px] font-semibold">
                            {rating}
                        </span>
                        <img className="h-[14px] w-[14px]" src="/images/icons/star.svg" alt="" />
                    </div>
                    <span className="font-normal text-[14px]/[24px] font-[manrope] text-[var(--slate-blue)]">
                        {reviews} Reviews
                    </span>
                </div>
                <span className="text-[var(--cyan)] text-[20px] font-semibold
                    lg:hidden
                ">
                    {price? `$${price}`: 'Free'}
                </span>
            </div>

            <p className="text-[var(--slate-blue)] text-[14px]/[24px] font-normal font-[manrope] hidden
                lg:block
            ">
                {text}
            </p>

        </div>
    )
}